const { client } = require("./index");

async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    // have to make sure to drop in correct order
    await client.query(`
        DROP TABLE IF EXISTS order_items;
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS users;
      `);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");

    await client.query(`
    CREATE TABLE users (
        user_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        first_name text NOT NULL,
        last_name text NOT NULL,
        address text NOT NULL,
        username text NOT NULL UNIQUE,
        password text NOT NULL
    );
  
    CREATE TABLE products (
        product_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        product_name text NOT NULL,
        product_description text NOT NULL,
        product_category text NOT NULL,
        price integer NOT NULL,
        image_url text
    );
  
    CREATE TABLE orders (
        order_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        total_order_revenue integer NOT NULL,
        is_purchased boolean DEFAULT false,
        user_id integer REFERENCES users(user_id)
    );
  
    CREATE TABLE order_items (
        order_items_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        order_items_quantity integer NOT NULL,
        order_id integer REFERENCES orders(order_id),
        product_id integer REFERENCES products(product_id)
    );
      `);

    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

// async function createInitialUsers() {
//   try {
//     console.log("Starting to create users...");

//     await createUser({
//       name: "albert",
//       location: "Sidney, Australia",
//       username: "AlBert",
//       password: "password",
//     });
//     await createUser({
//       name: "sandra",
//       location: "Tokyo, Japan",
//       username: "SandyJ",
//       password: "password",
//     });

//     console.log("Finished creating users!");
//   } catch (error) {
//     console.error("Error creating users!");
//     throw error;
//   }
// }

// async function createInitialProducts() {
//   try {
//     const [albert, sandra] = await getAllUsers();

//     console.log("Starting to create posts...");
//     await createProduct({
//       authorId: albert.id,
//       title: "First Post",
//       content:
//         "This is my first post. I hope I love writing blogs as much as I love writing them.",
//       tags: ["#happy", "#youcandoanything"],
//     });

//     await createProduct({
//       authorId: sandra.id,
//       title: "How does this work?",
//       content: "Seriously, does this even do anything?",
//       tags: ["#happy", "#worst-day-ever"],
//     });

//     console.log("Finished creating posts!");
//   } catch (error) {
//     console.log("Error creating posts!");
//     throw error;
//   }
// }

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    // await createInitialUsers();
    // await createInitialProducts();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

// async function testDB() {
//   try {
//     console.log("Starting to test database...");

//     console.log("Calling getAllUsers");
//     const users = await getAllUsers();
//     console.log("Result:", users);

//     console.log("Calling updateUser on users[0]");
//     const updateUserResult = await updateUser(users[0].id, {
//       name: "Newname Sogood",
//       location: "Lesterville, KY",
//     });
//     console.log("Result:", updateUserResult);

//     console.log("Calling getAllPosts");
//     const posts = await getAllPosts();
//     console.log("Result:", posts);

//     console.log("Calling updatePost on posts[0]");
//     const updatePostResult = await updatePost(posts[0].id, {
//       title: "New Title",
//       content: "Updated Content",
//     });
//     console.log("Result:", updatePostResult);

//     console.log("Calling updatePost on posts[1], only updating tags");
//     const updatePostTagsResult = await updatePost(posts[1].id, {
//       tags: ["#youcandoanything", "#redfish", "#bluefish"],
//     });
//     console.log("Result:", updatePostTagsResult);

//     console.log("Calling getUserById with 1");
//     const albert = await getUserById(1);
//     console.log("Result:", albert);

//     console.log("Calling getAllTags");
//     const allTags = await getAllTags();
//     console.log("Result:", allTags);

//     console.log("Calling getPostsByTagName with #happy");
//     const postsWithHappy = await getPostsByTagName("#happy");
//     console.log("Result:", postsWithHappy);

//     console.log("Finished database tests!");
//   } catch (error) {
//     console.log("Error during testDB");
//     throw error;
//   }
// }

rebuildDB()
  //.then(testDB)
  .catch(console.error)
  .finally(() => client.end());
