// src/middlewares/uploadMiddleware.ts
import multer from "multer";
import path from "path";
import fs from "fs";

// Determinar el directorio de uploads según el entorno
const getUploadDir = () => {
  // En producción (Render), usar /tmp que es temporal pero escribible
  if (process.env.NODE_ENV === "production") {
    return "/tmp/uploads";
  }
  // En desarrollo, usar directorio local
  return path.join(__dirname, "../../uploads");
};

// Asegurar que el directorio existe
const ensureUploadDir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created upload directory: ${dir}`);
  }
};

const uploadDir = getUploadDir();
ensureUploadDir(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generar nombre único con timestamp y extensión original
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    // Sanitizar el nombre del archivo
    const safeName = name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const uniqueName = `${safeName}-${uniqueSuffix}${ext}`;
    cb(null, uniqueName);
  },
});

// Configuración de límites y filtros
const fileFilter = (req: any, file: any, cb: any) => {
  // Aceptar solo imágenes
  const allowedMimes = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/gif',
    'image/webp'
  ];
  
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type. Only images are allowed. Received: ${file.mimetype}`), false);
  }
};

export const upload = multer({ 
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB máximo
    files: 1 // Solo un archivo a la vez
  }
});

// Nota importante para producción:
// En Render, los archivos en /tmp son temporales y se pierden en cada deploy.
// Para una solución permanente, considera usar servicios como:
// - Cloudinary
// - AWS S3
// - Firebase Storage
// - Supabase Storage