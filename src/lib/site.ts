const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

export function getSiteUrl() {
  const configured =
    typeof import.meta !== "undefined" && import.meta.env?.VITE_SITE_URL
      ? trimTrailingSlash(import.meta.env.VITE_SITE_URL)
      : "";

  if (configured) {
    return configured;
  }

  if (typeof window !== "undefined" && window.location.origin) {
    return trimTrailingSlash(window.location.origin);
  }

  return "";
}

export function resolveImageUrl(path?: string) {
  if (!path) {
    return "";
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const siteUrl = getSiteUrl();
  if (!siteUrl) {
    return path;
  }

  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
