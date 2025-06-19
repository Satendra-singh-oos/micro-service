import { createProxyMiddleware } from "http-proxy-middleware";
import env from "../utils/env";

export const orderProxy = createProxyMiddleware({
  target: env.ORDER_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    "^/api/order": "",
  },
});
