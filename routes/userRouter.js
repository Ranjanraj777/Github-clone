const express = require("express");
const userControllers = require("../controllers/userControllers");

console.log(userControllers); // Check if controllers are imported correctly

const userRouter = express.Router();

userRouter.get("/allUsers", userControllers.getAllUsers);
userRouter.post("/signup", userControllers.signup);
userRouter.post("/login", userControllers.login);
userRouter.get("/userProfile/:id", userControllers.getUserProfile);
userRouter.put("/updateProfile/:id", userControllers.updateUserProfile);
userRouter.delete("/deleteProfile/:id", userControllers.deleteUserProfile);

module.exports = userRouter;
