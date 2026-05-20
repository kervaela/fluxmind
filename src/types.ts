export interface WalletSession {
  address: string;
  keystoreJson: string;
  derivationPath: string;
  label: string;
}

export interface DemoBalance {
  eth: string;
  usd: string;
  stables: string;
  generatedAt: number;
}
