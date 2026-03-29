import { promises as fs } from "fs";

/** Retries writes that fail with transient locks (common with OneDrive / Windows). */
export async function writeFileWithRetry(path: string, data: string | Buffer): Promise<void> {
  const max = 5;
  const delays = [50, 100, 200, 400, 800];
  let last: unknown;
  for (let i = 0; i < max; i++) {
    try {
      await fs.writeFile(path, data);
      return;
    } catch (e) {
      last = e;
      await new Promise((r) => setTimeout(r, delays[i] ?? 800));
    }
  }
  throw last;
}
