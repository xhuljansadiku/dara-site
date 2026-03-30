const mediaBaseUrl = (process.env.NEXT_PUBLIC_MEDIA_BASE_URL ?? "").replace(/\/+$/, "");

export function getMediaUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return mediaBaseUrl ? `${mediaBaseUrl}${normalizedPath}` : normalizedPath;
}
