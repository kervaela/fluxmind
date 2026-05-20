import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Toast } from "./components/Toast";
import { BridgePage } from "./pages/BridgePage";
import { CopilotPage } from "./pages/CopilotPage";
import { GatePage } from "./pages/GatePage";
import { SendPage } from "./pages/SendPage";
import { useWalletStore } from "./store/walletStore";

export default function App() {
  const hydrate = useWalletStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
    document.getElementById("boot-hint")?.remove();
  }, [hydrate]);

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "") || undefined}>
      <Toast />
      <Routes>
        <Route path="/" element={<GatePage />} />
        <Route element={<Layout />}>
          <Route path="/bridge" element={<BridgePage />} />
          <Route path="/copilot" element={<CopilotPage />} />
          <Route path="/send" element={<SendPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
