import { mkdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const vendor = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "tcx-wasm");
const version = "0.9.1";
const files = ["package.json", "tcx_wasm.js", "tcx_wasm.d.ts", "tcx_wasm_bg.wasm", "tcx_wasm_bg.wasm.d.ts"];

async function main() {
  mkdirSync(vendor, { recursive: true });
  for (const f of files) {
    const url = `https://cdn.jsdelivr.net/npm/@consenlabs/tcx-wasm@${version}/${f}`;
    process.stdout.write(`${f} ... `);
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.statusText);
    writeFileSync(join(vendor, f), Buffer.from(await res.arrayBuffer()));
    console.log("ok");
  }
}
main().catch((e) => { console.error(e); process.exit(1); });
