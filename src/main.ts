import * as httpServer from "./http/server.http.ts";
import * as queueService from "./queue/queue.service.ts";
import * as redis from "./db/redis.db.ts";
import * as mongoose from "./db/mongoose.db.ts";

httpServer.start();
queueService.start();

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

async function shutdown() {
  await queueService.stop();
  httpServer.stop();
  redis.stop();
  mongoose.stop();
}
