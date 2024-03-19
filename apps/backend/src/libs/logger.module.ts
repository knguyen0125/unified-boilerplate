import { Global, Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import pino from 'pino';

@Global()
@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.LOG_LEVEL || 'info',
        redact: {
          remove: true,
          paths: [
            'req.headers.authorization',
            'req.headers.cookie',
            'req.headers["set-cookie"]',
            'res.headers.authorization',
            'res.headers.cookie',
            'res.headers["set-cookie"]',

            'req.body.password',

            'req.headers["sec-fetch-dest"]',
            'req.headers["sec-fetch-mode"]',
            'req.headers["sec-fetch-site"]',
            'req.headers["sec-fetch-user"]',

            'req.query',
            'req.params',
            'req.remotePort',
          ],
        },
        formatters: {
          level: (label) => ({ level: label }),
        },
        timestamp: pino.stdTimeFunctions.isoTime,
        genReqId: function (req, res) {
          const existingID = req.id ?? req.headers['x-request-id'];
          if (existingID) return existingID;
          const id = crypto.randomUUID();
          res.setHeader('X-Request-Id', id);
          return id;
        },
      },
    }),
  ],
  exports: [LoggerModule],
})
export class NestLoggerModule {}
