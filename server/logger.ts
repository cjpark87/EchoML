import * as config from "config";
import { mkdirp } from "fs-extra";
import * as path from "path";
import * as winston from "winston";

export class Logger {
  public static get logger(): winston.LoggerInstance {
    if (!Logger._logger) {
      if (config.has("log")) {
        if (config.has("log.console")) {
          const console = config.get("log.console");
          Logger.transports.push(new winston.transports.Console(console));
        }

        if (config.has("log.file.filename")) {
          const filename: string = config.get("log.file.filename");
          const logdir = path.dirname(filename);
          mkdirp(logdir).then(() => {
            // winston-daily-rotate-file has no typings
            Logger.transports.push(
              new (require("winston-daily-rotate-file"))(config.get("log.file")),
            );
          });
        }
      }
      Logger._logger = new winston.Logger({ transports: Logger.transports });
    }

    return Logger._logger;
  }

  private static transports: winston.TransportInstance[] = [];
  private static _logger: winston.LoggerInstance | null = null;
}
