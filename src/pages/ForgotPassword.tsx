import { useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { HiOutlineChartBar } from "react-icons/hi2";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulação de envio de email - substituir com sua lógica de recuperação
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Validação básica
      if (email && email.includes("@")) {
        setEmailSent(true);
        toast.success("Email de recuperação enviado com sucesso!");
      } else {
        toast.error("Email inválido!");
      }
    } catch (error) {
      toast.error("Erro ao enviar email. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Toaster position="top-center" />

      {/* Forgot Password Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-7">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-900 rounded-lg mb-4">
            <HiOutlineChartBar className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Esqueceu sua senha?
          </h1>
          <p className="text-gray-500 text-sm">
            {emailSent
              ? "Verifique sua caixa de entrada"
              : "Não se preocupe, nós ajudamos você"}
          </p>
        </div>

        {!emailSent ? (
          <>
            {/* Instructions */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 leading-relaxed">
                Digite seu email abaixo e enviaremos um link para redefinir sua
                senha.
              </p>
            </div>

            {/* Forgot Password Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all text-sm"
                  placeholder="exemplo@seudomínio.com"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full cursor-pointer bg-gray-900 text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  "Enviar link de recuperação"
                )}
              </button>
            </form>
          </>
        ) : (
          <>
            {/* Success Message */}
            <div className="mb-6">
              <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-600 mt-0.5 mr-3 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-green-800 mb-1">
                      Email enviado com sucesso!
                    </p>
                    <p className="text-sm text-green-700">
                      Enviamos um link de recuperação para{" "}
                      <strong>{email}</strong>. Verifique sua caixa de entrada e
                      spam.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-gray-600">Não recebeu o email?</p>
                <button
                  onClick={() => {
                    setEmailSent(false);
                    setEmail("");
                  }}
                  className="w-full cursor-pointer bg-white text-gray-900 py-2.5 rounded-lg font-medium border-2 border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors text-sm"
                >
                  Tentar novamente
                </button>
              </div>
            </div>
          </>
        )}

        {/* Back to Login */}
        <div className="mt-6">
          <Link
            to="/login"
            className="flex items-center justify-center text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Voltar para o login
          </Link>
        </div>

        {/* Footer - Help */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-center text-gray-500 leading-relaxed">
            Precisa de ajuda?{" "}
            <Link
              to="/support"
              className="text-gray-900 hover:text-gray-700 font-medium underline"
            >
              Entre em contato
            </Link>{" "}
            com nosso suporte.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
