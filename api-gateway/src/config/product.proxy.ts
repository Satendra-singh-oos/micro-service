import { createProxyMiddleware } from "http-proxy-middleware";
import env from "../utils/env";

export const productProxy = createProxyMiddleware({
  target: env.PRODUCT_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    "^/api/product": "",
  },
});
