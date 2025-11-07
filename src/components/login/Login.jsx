import portadaLogin from './imagen/portadaLogin.jpg';

const Login = () => {
  return (
    <div className="min-h-screen max-w-[60%] flex mx-auto bg-[#a8e6cf]">
      {/* Imagen a la izquierda (solo en pantallas grandes) */}
      <div className="hidden lg:flex lg:w-[50%] items-center justify-center p-12">
        <img
          src={portadaLogin}
          alt="Login visual"
          className="max-w-full max-h-125 object-contain rounded-2xl shadow-2xl"
        />
      </div>

      {/* Formulario a la derecha */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">Iniciar Sesión</h2>

            <form
              className="space-y-6 space-x-2"
              onSubmit={(e) => {
                e.preventDefault();
                console.log('Formulario enviado');
              }}
            >
              <div>
                <input
                  type="text"
                  placeholder="Nombre de usuario"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none ring-offset-2 focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none ring-offset-2 focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Contraseña"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none ring-offset-2 focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#a8e6cf] text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-200"
              >
                Entrar
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
