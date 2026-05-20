import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FluxOrb } from "../components/FluxOrb";
import { DEFAULT_CHAIN, getChain } from "../lib/chains";
import { createFromMnemonic, generateMnemonicPhrase, verifyWalletPassword } from "../lib/walletCore";
import { useWalletStore } from "../store/walletStore";

export function GatePage() {
  const nav = useNavigate();
  const [params] = useSearchParams();
  const session = useWalletStore((s) => s.session);
  const setSession = useWalletStore((s) => s.setSession);
  const setUnlocked = useWalletStore((s) => s.setUnlocked);
  const setWalletPassword = useWalletStore((s) => s.setWalletPassword);
  const toastOk = useWalletStore((s) => s.toastOk);
  const toastErr = useWalletStore((s) => s.toastErr);

  const wantLogin = params.get("login") === "1";
  const [phase, setPhase] = useState<"form" | "login">(session || wantLogin ? "login" : "form");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [mnemonic, setMnemonic] = useState("");
  const [busy, setBusy] = useState(false);
  const [loginPassword, setLoginPassword] = useState("");
  const chain = getChain(DEFAULT_CHAIN);

  useEffect(() => {
    if (session && !wantLogin) {
      setUnlocked(true);
      nav("/bridge", { replace: true });
    }
  }, [session, wantLogin, setUnlocked, nav]);

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) return toastErr("密码至少 8 位");
    if (password !== confirm) return toastErr("两次密码不一致");
    if (!mnemonic.trim()) return toastErr("请填写助记词");
    setBusy(true);
    try {
      const s = await createFromMnemonic(password, mnemonic, chain);
      setSession(s);
      setWalletPassword(password);
      setUnlocked(true);
      toastOk("流思舱已启航");
      nav("/bridge");
    } catch (err) {
      toastErr(err instanceof Error ? err.message : "创建失败");
    } finally {
      setBusy(false);
    }
  }

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!session) return;
    setBusy(true);
    try {
      if (!(await verifyWalletPassword(session, loginPassword, chain))) throw new Error("密码错误");
      setWalletPassword(loginPassword);
      setUnlocked(true);
      nav("/bridge");
    } catch (err) {
      toastErr(err instanceof Error ? err.message : "解锁失败");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-flux-bg px-4 py-10">
      <FluxOrb size={88} />
      <h1 className="mt-6 text-2xl font-semibold text-white">FluxMind 流思舱</h1>
      <p className="mt-2 text-center text-sm text-gray-400">AI 智伴 · 本地签名 · 演示随机余额</p>

      {phase === "login" && session ? (
        <form onSubmit={onLogin} className="mt-8 w-full max-w-md space-y-4 rounded-2xl border border-flux-line bg-flux-panel p-6">
          <input
            type="password"
            placeholder="舱门密码"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            className="w-full rounded-lg border border-flux-line bg-flux-bg px-4 py-3 text-gray-100"
          />
          <button type="submit" disabled={busy} className="w-full rounded-lg bg-gradient-to-r from-violet-deep to-mint-glow py-3 font-medium text-white disabled:opacity-60">
            {busy ? "连接中…" : "进入舰桥"}
          </button>
          <button type="button" className="text-sm text-violet-glow" onClick={() => setPhase("form")}>
            新建流思舱
          </button>
        </form>
      ) : (
        <form onSubmit={onCreate} className="mt-8 w-full max-w-md space-y-3 rounded-2xl border border-flux-line bg-flux-panel p-6">
          <button
            type="button"
            onClick={async () => {
              try {
                setMnemonic(await generateMnemonicPhrase());
                toastOk("已生成助记词");
              } catch (e) {
                toastErr(e instanceof Error ? e.message : "失败");
              }
            }}
            className="w-full rounded-lg border border-dashed border-mint-glow/40 py-2 text-sm text-mint-glow"
          >
            生成助记词
          </button>
          <textarea
            placeholder="助记词"
            value={mnemonic}
            onChange={(e) => setMnemonic(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-flux-line bg-flux-bg px-3 py-2 text-sm text-gray-100"
          />
          <input
            type="password"
            placeholder="设置密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-flux-line bg-flux-bg px-4 py-3 text-gray-100"
          />
          <input
            type="password"
            placeholder="确认密码"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full rounded-lg border border-flux-line bg-flux-bg px-4 py-3 text-gray-100"
          />
          <button type="submit" disabled={busy} className="w-full rounded-lg bg-gradient-to-r from-violet-deep to-mint-glow py-3 font-medium text-white disabled:opacity-60">
            {busy ? "启航中…" : "启航建舱"}
          </button>
          {session && (
            <button type="button" className="text-sm text-violet-glow" onClick={() => setPhase("login")}>
              已有舱门，去解锁
            </button>
          )}
        </form>
      )}
    </div>
  );
}
