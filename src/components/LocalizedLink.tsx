import { Link, type LinkProps } from "react-router-dom";
import { useI18n } from "../hooks/useI18n";
import { localizedPath } from "../lib/locale";

export default function LocalizedLink({ to, ...props }: LinkProps) {
  const { locale } = useI18n();
  if (locale !== "ja") return <Link to={to} {...props} />;
  if (typeof to === "string") return <Link to={localizedPath(to, locale)} {...props} />;
  if (!to.pathname) return <Link to={to} {...props} />;
  const href = `${to.pathname}${to.search ?? ""}${to.hash ?? ""}`;
  const url = new URL(localizedPath(href, locale), "https://playxeld.com");
  return <Link to={{ ...to, pathname: url.pathname, search: url.search, hash: url.hash }} {...props} />;
}
