import { Pool } from "../deps.js";
import { config } from "../config/config.js";

const CONCURRENT_CONNECTIONS = 2;
const connectionPool = new Pool({
hostname: config.database.hostname,
database: config.database.database,
user: config.database.user,
password: config.database.password,
port: config.database.port,
}, CONCURRENT_CONNECTIONS);

const executeQuery = async (query, ...args) => {
  const response = {};
  let client;

  try {
    client = await connectionPool.connect();
    const result = await client.queryObject(query, ...args);
    if (result.rows) {
      response.rows = result.rows;
    }
  } catch (e) {
    console.log(e);
    response.error = e;
  } finally {
    try {
      await client.release();
    } catch (e) {
      console.log(e);
    }
  }

  return response;
};

export { executeQuery };
