import { useRef, useState } from "react";
import api from "./services/api";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!inputRef.current?.value) return;

    try {
      const response = await api.post("/generateQR", {
        input: inputRef.current.value,
      });

      setQrCodeUrl(response.data.qrCodeUrl);
    } catch (error) {
      console.error("Erro ao gerar QR Code:", error);
    }
  };

  const handleDownload = () => {
    if (!qrCodeUrl) return;

    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = "qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="bg-gradient-to-br from-gray-900 via-black to-gray-800 min-h-screen flex justify-center items-center px-4">
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl rounded-2xl p-8 w-full max-w-md flex flex-col items-center gap-6 text-white">
        <h1 className="text-2xl font-bold text-center">Gerador de QR Code</h1>

        <input
          type="text"
          placeholder="Digite a URL"
          ref={inputRef}
          className="w-full px-4 py-2 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
        >
          Gerar QR Code
        </button>

        {qrCodeUrl && (
          <>
            <img
              src={qrCodeUrl}
              alt="QR Code"
              className="mt-4 w-40 h-40 rounded-md shadow-md"
            />

            <button
              onClick={handleDownload}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition"
            >
              Baixar QR Code
            </button>
          </>
        )}
      </div>
    </main>
  );
}

export default App;
