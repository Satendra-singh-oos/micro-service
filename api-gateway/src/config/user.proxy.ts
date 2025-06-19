import { createProxyMiddleware } from "http-proxy-middleware";
import env from "../utils/env";

export const userProxy = createProxyMiddleware({
  target: env.USER_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    "^/api/users": "",
  },
  cookieDomainRewrite: "",
  // @ts-expect-error: onProxyRes is a valid option at runtime but not in the current type definition
  onProxyRes: (proxyRes: { headers: { [x: string]: any } }) => {
    const cookies = proxyRes.headers["set-cookie"];
    if (cookies) {
      proxyRes.headers["set-cookie"] = cookies.map((cookie: string) =>
        cookie.replace(/; secure/gi, "")
      );
    }
  },
});
