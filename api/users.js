const express = require("express");
const router = express.Router();

const {
    getAllUsers, 
    getSingleUser,
    createUser,
    loginUser, 
} = require('../db/users')

// get all users 
router.get("/", async (req, res, next) => {
    try {
      res.send(await getAllUsers());
    } catch (err) {
      next(err);
    }
  });

  // get user by user_id 

router.get("/:user_id", async (req, res, next) => {
    try {
      res.send(await getSingleUser(req.params.user_id));
    } catch (err) {
      next(err);
    }
  });


// create a new user
router.post("/register", async (req, res, next) => {
    try {
        const newUser = await createUser(req.body);
        if (newUser) {
            res.send(newUser);
        } else {
            res.status(409).send({ error: "Sorry, this username already exists" });
        }
    } catch (err) {
        next(err);
    }
});

// login user
router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await loginUser(username, password);
        if (user) {
            res.send({
                message: "User successfully Logged In!",
                user
            });
        } else {
            res.send({ error: "Invalid username or password" });
        }
    } catch (err) {
        next(err);
    }
});



module.exports = router;
