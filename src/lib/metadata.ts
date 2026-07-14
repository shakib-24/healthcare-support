import { siteConfig } from "@/config/site";

/**
 * Returns an `alternates` value with a canonical URL for `path`, or
 * `undefined` when no production `siteUrl` is configured yet — avoids
 * emitting a canonical URL that points at a local dev fallback.
 */
export function canonicalFor(path: string) {
  return siteConfig.siteUrl ? { canonical: path } : undefined;
}
