const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { initRepo } = require("./controllers/init");
const { add } = require("./controllers/add");
const { commitRepo } = require("./controllers/commit");
const { pushRepo } = require("./controllers/push");
const { pullRepo } = require("./controllers/pull");
const { revertRepo } = require("./controllers/revert");
const mainRouter = require('./routes/mainRouter');
// const userModel = require('./models/userModel'); // Adjust the path as necessary



require('dotenv').config();

// Initialize yargs with commands
yargs(hideBin(process.argv))
  .command("start", "start a new server", {}, Startserver)
  .command("init", "Initialize a new repository", {}, initRepo)
  .command("add <file>", "Add a file to the repository", (yargs) => {
    yargs.positional("file", {
      describe: "File to add to the staging area",
      type: "string",
    });
  }, (argv) => {
    add(argv.file);
  })
  .command("commit <message>", "commit a file to the repository", (yargs) => {
    yargs.positional("message", {
      describe: "Commit message",
      type: "string",
    });
  }, (argv) => {
    commitRepo(argv.message);
  })
  .command("push", "Push commits to S3", {}, pushRepo)
  .command("pull", "Pull commits from S3", {}, pullRepo)
  .command("revert <commitID>", "Revert to a specific commit", (yargs) => {
    yargs.positional("commitID", {
      describe: "Commit ID to revert to",
      type: "string",
    });
  }, (argv) => {
    revertRepo(argv.commitID);
  })
  .demandCommand(1, "You need at least one command")
  .help()
  .argv;

// Start Server Function
function Startserver() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Middleware
  app.use(express.json());
  app.use(cors({ origin: "*" }));

  app.use('/', mainRouter);
 

  // Mongoose connection
  const MONGO_URI = process.env.MONGO_URI || "your-default-uri-here";
  mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error("Unable to connect to the database", error);
  });

  // Setup Socket.io
  const httpServer = http.createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinRoom", (userID) => {
      console.log("User joined room:", userID);
      socket.join(userID);
    });
  });
const Db=mongoose.connection;
Db.once("open",async()=>{
  console.log("crud operation")
})
  // Start HTTP server
  httpServer.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });
}

