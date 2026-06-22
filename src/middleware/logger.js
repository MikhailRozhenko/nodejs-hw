import pinoHttp from 'pino-http';

export const logger =
  process.env.NODE_ENV === 'production'
    ? pinoHttp({ level: 'info' })
    : pinoHttp({
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'HH:MM:ss',
            ignore: 'pid,hostname',
          },
        },
      });
