// THIS IS WHERE WE WILL WRITE OUT ALL OF THE DB FUNCTIONS (SQL CODE)

const pg = require("pg");
const bcrypt = require("bcrypt");

const client = new pg.Client("postgres://localhost/DAT_music");

// example of a DB function
async function getAllUsers() {
  try {
    const { rows } = await client.query(`
      SELECT * FROM users;
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}

// Ensure all DB functions are exported once completed
module.exports = {
  client,
};
