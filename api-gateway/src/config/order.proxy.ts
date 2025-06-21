import { createProxyMiddleware } from "http-proxy-middleware";
import env from "../utils/env";

export const orderProxy = createProxyMiddleware({
  target: env.ORDER_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    "^/order-service": "api/v1/order/",
  },
  cookieDomainRewrite: "",
  // @ts-expect-error
  onProxyReq: (proxyReq, req) => {
    const cookieHeader = req.headers.cookie;
    if (cookieHeader) {
      proxyReq.setHeader("Cookie", cookieHeader);
    }
  },
});
