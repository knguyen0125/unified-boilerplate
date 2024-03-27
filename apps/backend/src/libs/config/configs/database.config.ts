import { registerAs } from '@nestjs/config';

export const database = registerAs('database', () => ({
  dialect: 'postgres',
  replication: {
    read: process.env.DATABASE_READ_REPLICA_HOST
      ? [
          {
            host: process.env.DATABASE_READ_REPLICA_HOST,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            port: process.env.DATABASE_READ_REPLICA_PORT
              ? parseInt(process.env.DATABASE_READ_REPLICA_PORT)
              : parseInt(process.env.DATABASE_PORT),
            database: process.env.DATABASE_NAME,
          },
        ]
      : [
          {
            host: process.env.DATABASE_HOST,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            port: parseInt(process.env.DATABASE_PORT),
            database: process.env.DATABASE_NAME,
          },
        ],
    write: {
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      port: parseInt(process.env.DATABASE_PORT),
      database: process.env.DATABASE_NAME,
    },
  },
  define: {
    underscored: true,
  },
}));
