import { env } from 'node:process'

const {
  PORT = 5001,
  SECRET_KEY = 'defaultSecret',
  DB_USER = "admin",
  DB_PASSWORD= "dix1bolt",
  DB_NAME = "mini-erp",
  DB_DIALECT = 'mysql',
  DB_HOST = "localhost",
  DB_PORT = "3316",
  HASH_ALGORITHM = 'SHA-512'
} = env

if (
  !DB_USER ||
  !DB_PASSWORD ||
  !DB_NAME ||
  !DB_DIALECT ||
  !DB_HOST ||
  !DB_PORT
) {
  throw new Error('Missing required environment variables.')
}

const config = {
  PORT,
  SECRET_KEY,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_DIALECT,
  DB_HOST,
  DB_PORT,
  HASH_ALGORITHM
}

export default config
