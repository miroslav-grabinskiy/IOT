import * as http from "http";
import { router } from "./router.http";
import { HTTP_PORT } from "../configs/config";

export const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/rssi") {
    router(req, res);
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
});

export function start() {
  server.listen(HTTP_PORT, () => {
    console.log(`Server is running on http://localhost:${HTTP_PORT}`);
  });
}

export function stop() {
  server.close();
}
