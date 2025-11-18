import { logger } from "@/utils/logger.js";

const statusEmoji = (status: number) => {
  if (status >= 500) return "💥";
  if (status >= 400) return "⚠️";
  if (status >= 300) return "🔹";
  return "✅";
};

export const morganStream = {
  write: (message: string) => {
    const statusMatch = message.match(/ (\d{3}) /);
    const status = statusMatch ? parseInt(statusMatch[1] as string) : 0;
    logger.info(`${statusEmoji(status)} ${message.trim()}`);
  },
};

export const morganFormat = ":method :url :status :res[content-length] - :response-time ms";