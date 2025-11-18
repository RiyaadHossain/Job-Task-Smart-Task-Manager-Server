import app from "./app.js";
import http, { Server } from "http";
import { connectDB } from "@/configs/db.js";
import configs from "@/configs/index.js";
import { regProcessHandlers } from "@/infra/uncaughtHandler.js";
import { logger } from "@/utils/logger.js";
const PORT = configs.PORT || 5000;

let server: Server = http.createServer(app);
 
async function bootstrap() {
  try {
    await connectDB();
    server.listen(PORT, () =>
      logger.info(`✅ Server listening on PORT:${PORT}`)
    );

    regProcessHandlers(server);
  } catch (err) {
    logger.error("❌ Server startup failed:", err);
    process.exit(1);
  }
}

bootstrap();
