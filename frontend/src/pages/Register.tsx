import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const isFormValid =
    email.trim() !== "" &&
    password.trim() !== "" &&
    confirmPassword.trim() !== "" &&
    password === confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      setError("Por favor, completa todos los campos correctamente.");
      return;
    }

    setError("");
    // Aquí puedes manejar el registro con fetch o axios
    console.log("Registrando:", { email, password });
  };

  return (
    <>
      <div className="flex min-h-full flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                alt="logo inkverso"
                src="/images/logoInkversoSinDecoracion.png"
                className="h-25 w-auto sm:h-40"
              />
              <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">
                Crea tu cuenta
              </h2>
            </div>

            <div className="mt-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm/6 font-medium text-gray-900">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>

                <div>
                  <label className="block text-sm/6 font-medium text-gray-900">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>

                <div>
                  <label className="block text-sm/6 font-medium text-gray-900">
                    Confirmar contraseña
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>

                {error && (
                  <p className="text-red-600 text-sm font-medium">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition ${
                  isFormValid
                    ? "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                >
                  Registrarme
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            alt="Imagen de una biblioteca"
            src="/images/login.png"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </div>
    </>
  );
}
