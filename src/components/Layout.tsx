import { NavLink, Outlet, Navigate } from "react-router-dom";
import { useWalletStore } from "../store/walletStore";
import { shorten } from "../lib/utils";

const nav = [
  { to: "/bridge", label: "舰桥" },
  { to: "/copilot", label: "智伴" },
  { to: "/send", label: "转出" },
];

export function Layout() {
  const session = useWalletStore((s) => s.session);
  const unlocked = useWalletStore((s) => s.unlocked);
  const lock = useWalletStore((s) => s.lock);

  if (!session) return <Navigate to="/" replace />;
  if (!unlocked) return <Navigate to="/?login=1" replace />;

  return (
    <div className="min-h-screen bg-flux-bg text-gray-100">
      <header className="border-b border-flux-line bg-flux-panel/90 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <div>
            <p className="bg-gradient-to-r from-violet-glow to-mint-glow bg-clip-text font-mono text-sm font-semibold text-transparent">
              FLUXMIND
            </p>
            <p className="text-xs text-gray-400">{shorten(session.address)}</p>
          </div>
          <button
            type="button"
            onClick={lock}
            className="rounded-lg border border-violet-glow/40 px-3 py-1 text-xs text-violet-glow"
          >
            上锁
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-lg px-4 py-5 pb-24">
        <Outlet />
      </main>
      <nav className="fixed bottom-0 left-0 right-0 border-t border-flux-line bg-flux-panel/95 backdrop-blur">
        <div className="mx-auto flex max-w-lg justify-around py-2">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-lg px-4 py-2 text-sm ${
                  isActive
                    ? "bg-gradient-to-r from-violet-deep to-violet-glow text-white"
                    : "text-gray-400"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
