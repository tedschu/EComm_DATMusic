const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET= "secretcode";

const {
    getAllUsers, 
    getSingleUser,
    createUser,
    loginUser, 
    getUserByUsername,
} = require('../db/users')

// verify the token for the "/me" endpoint 

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send({ error: 'No token provided' });
    }

    jwt.verify(token.split(' ')[1], JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send({ error: 'Failed to authenticate token' });
        }
        req.user = {
            id: decoded.id,
            username: decoded.username
        };
        next();
    });
}

// get all users 
router.get("/", async (req, res, next) => {
    try {
      res.send(await getAllUsers());
    } catch (err) {
      next(err);
    }
  });


  // establish /me endpoint for Account Page functionality 

  router.get("/me", verifyToken, async (req, res, next) => {
    try {
        const user = await getUserByUsername(req.user.username); // Assuming username is stored in req.user from verifyToken middleware
        if (user) {
            res.send(user);
        } else {
            res.status(404).send({ error: "User not found" });
        }
    } catch (err) {
        next(err);
    }
});



// create a new user
router.post("/register", async (req, res, next) => {
    console.log(req.body)

    try {
        const newUser = await createUser(req.body);
        if (newUser) {
            const token = jwt.sign(
                { id: newUser.id, username: newUser.username },
                JWT_SECRET,
                { expiresIn: '1h' }
            );
            res.send({newUser, token})

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
            const token = jwt.sign(
                { id: user.id, username: user.username },
                JWT_SECRET,
                { expiresIn: '1h' }
            );
            res.send({
                message: "User successfully logged in!",
                user,
                token
            });
        } else {
            res.status(401).send({ error: "Invalid username or password" });
        }
    } catch (err) {
        next(err);
    }
});



module.exports = router;
