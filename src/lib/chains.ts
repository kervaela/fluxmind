export interface ChainNode {
  id: string;
  label: string;
  chainId: string;
  tcxChain: "ETHEREUM";
  tcxNetwork: "MAINNET" | "TESTNET";
  rpcUrl: string;
  nativeSymbol: string;
}

export const CHAINS: Record<string, ChainNode> = {
  sepolia: {
    id: "sepolia",
    label: "Sepolia",
    chainId: "11155111",
    tcxChain: "ETHEREUM",
    tcxNetwork: "TESTNET",
    rpcUrl: "https://rpc.sepolia.org",
    nativeSymbol: "ETH",
  },
};

export const DEFAULT_CHAIN = "sepolia";
export function getChain(id: string): ChainNode {
  return CHAINS[id] ?? CHAINS[DEFAULT_CHAIN];
}
