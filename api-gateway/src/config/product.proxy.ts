import { createProxyMiddleware } from "http-proxy-middleware";
import env from "../utils/env";

export const productProxy = createProxyMiddleware({
  target: env.PRODUCT_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    "^/product-service": "/api/v1",
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
