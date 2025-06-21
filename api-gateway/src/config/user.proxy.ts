import { createProxyMiddleware } from "http-proxy-middleware";
import env from "../utils/env";

export const userProxy = createProxyMiddleware({
  target: env.USER_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    "^/user-service": "/api/v1/user",
  },
  cookieDomainRewrite: "",
  // @ts-expect-error
  onProxyRes: (proxyRes: { headers: { [x: string]: any } }) => {
    const cookies = proxyRes.headers["set-cookie"];
    if (cookies) {
      proxyRes.headers["set-cookie"] = cookies.map((cookie: string) =>
        cookie.replace(/; secure/gi, "")
      );
    }
  },
});
