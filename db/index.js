const pg = require("pg");
const bcrypt = require("bcrypt");

const client = new pg.Client("postgres://localhost/DAT_music");

// Ensure all DB functions are exported once completed
module.exports = {
  client,
};
