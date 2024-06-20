const { client } = require("./index");

// fetching All users 

const getAllUsers = async ()=>{
    const response = await client.query(`SELECT * FROM users ORDER BY user_id ASC`);
    return response.rows; 
};


// get single user 

const getSingleUser = async (user_id) => {
    const response = await client.query(`SELECT * FROM users WHERE user_id = $1`, [user_id]);
    return response.rows[0];
  }; 


// making a user 

const createUser = async (body) => {
    await client.query(`INSERT INTO users(first_name, last_name, address, username, password) VALUES($1, $2, $3, $4, $5) ON CONFLICT (username) DO NOTHING RETURNING *`,
      [body.first_name, body.last_name, body.address, body.username, body.password]
    );

    return {
      first_name: body.first_name,
      last_name: body.last_name,
      address: body.address,
      username: body.username, 
      password: body.password, 
    };
  };


// login user
const loginUser = async (username, password) => {
    const response = await client.query(
        `SELECT * FROM users WHERE username = $1 AND password = $2`,
        [username, password]
    );

    return response.rows[0];
};


// find the loggged in user 

const getUserByUsername = async (username) => {
  const response = await client.query(
      `SELECT * FROM users WHERE username = $1`,
      [username]
  );
  return response.rows[0];
};


// // Export all functions here:
module.exports ={
        getAllUsers,
        getSingleUser,  
        createUser,
        loginUser, 
        getUserByUsername,
        client, 
}
