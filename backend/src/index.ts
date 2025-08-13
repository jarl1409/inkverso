// src/server.ts
import express, { Application, Request, Response, NextFunction } from "express";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import path from "path";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";

import { conectarDB } from "./config/db";
import { logMiddleware } from "./middlewares/logMiddleware";

// Rutas
import authRoutes from "./routes/auth";
import libroRoutes from "./routes/libros";
import carritoRoutes from "./routes/carrito";
import adminRoutes from "./routes/admin";
import usuarioRouter from "./routes/usuarios";

dotenv.config();

const app: Application = express();

// 0) Config básica
const isProd = process.env.NODE_ENV === "production";
const PORT = Number(process.env.PORT) || 3000;
app.set("trust proxy", 1); // importante si estás detrás de proxy (Railway/Render/NGINX)
// desactiva cabecera de Express
app.disable("x-powered-by");

// 1) Seguridad y perf
app.use(helmet());
app.use(compression());
app.use(cookieParser());

// 2) CORS dinámico por ENV y con preflight
function parseList(v?: string) {
  return (v ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
const allowList = new Set([
  ...parseList(process.env.CORS_ORIGINS),
  ...parseList(process.env.CORS_ORIGINS_PROD),
]);
const corsOptions: CorsOptions = {
  origin(origin, cb) {
    // Log del origen recibido (solo en desarrollo)
    if (!isProd) {
      console.log(
        `📨 CORS request from origin: ${origin || "undefined (local request)"}`
      );
    }

    // Si no hay origin (Postman, cURL, etc)
    if (!origin) {
      return cb(null, true);
    }

    // Verificar si está en la lista
    const isAllowed = allowList.has(origin);

    if (isAllowed) {
      if (!isProd) console.log("✅ CORS: Origin allowed");
      return cb(null, true);
    } else {
      // IMPORTANTE: NO pasar Error, solo false
      console.warn(`⚠️ CORS blocked request from: ${origin}`);
      return cb(null, false); // ← CAMBIO CRÍTICO: false en lugar de Error
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["Set-Cookie"],
  maxAge: 86400, // 24 horas
};
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

// 3) Está OK servir uploads estáticos
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// 4) Body parsers
app.use(express.json({ limit: "1mb" })); // ajusta si subes payloads grandes

// 5) Logs solo en dev (tu logMiddleware imprime body/headers)
if (!isProd) app.use(logMiddleware);

// 7) Rutas
app.use("/api/auth", authRoutes);
app.use("/api/usuario", usuarioRouter);
app.use("/api/libros", libroRoutes);
app.use("/api/carrito", carritoRoutes);
app.use("/api/admin", adminRoutes);

// 8) Healthcheck (para uptime/monitoreo)
app.get("/api/health", (_req, res) => res.json({ ok: true, ts: Date.now() }));

// 9) 404 y handler de errores controlado
app.use((req, res) => res.status(404).json({ message: "Not found" }));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || 500;
  if (!isProd) console.error(err);
  res.status(status).json({ message: err.message || "Server error" });
});

// 10) Arranque ordenado: conecta DB y luego listen
(async () => {
  try {
    await conectarDB();
    app.listen(PORT, () => {
      console.log(
        `API lista en http://localhost:${PORT} (${
          process.env.NODE_ENV || "dev"
        })`
      );
    });
  } catch (err) {
    console.error("Fallo al conectar DB:", err);
    process.exit(1);
  }
})();
