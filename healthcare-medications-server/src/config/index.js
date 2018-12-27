require('dotenv').config();

const {
  PORT,
  PGHOST,
  PGUSER,
  PGPASSWORD,
  PGDB,
  PGPORT,
} = process.env;

const port = PORT || 3002;

module.exports = {
  port,
  db: {
    host: PGHOST,
    user: PGUSER,
    port: PGPORT,
    password: PGPASSWORD,
    database: PGDB,
  },
};
