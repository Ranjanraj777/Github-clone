const express = require("express");
const issueControllers = require("../controllers/issueControllers");

const issueRouter = express.Router();

issueRouter.post("/issue/create", issueControllers.createIssue);
issueRouter.put("/issue/update/:id", issueControllers.updateIssueById);
issueRouter.delete("/issue/delete/:id", issueControllers.deleteIssueById);
issueRouter.get("/issue/all", issueControllers.getAllIssues);
issueRouter.get("/issue/:id", issueControllers.getIssueById);

module.exports = issueRouter;