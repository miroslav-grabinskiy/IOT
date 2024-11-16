import { IncomingMessage, ServerResponse } from "http";
import { IRSSIData } from "./controllers/types";
import { collectRSSI } from "./controllers/collectRSSI.controller.http";

export async function router(req: IncomingMessage, res: ServerResponse) {
  if (req.method === "POST" && req.url === "/rssi") {
    try {
      const body = await collectBody(req);
      const parsedBody = JSON.parse(body);

      await collectRSSI(parsedBody as IRSSIData, res);
    } catch (error) {
      console.error("Error collecting body:", error);
      res.statusCode = 500;
      res.end("Internal Server Error");
    }
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
}
