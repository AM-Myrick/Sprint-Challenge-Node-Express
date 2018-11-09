const express = require('express');
const cors = require("cors");
const projectRouter = require("../projects/projectRouter.js");
const actionRouter = require("../actions/actionRouter.js");
const server = express();

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
    res.status(200).json({api: "running"})
})

// project endpoints
server.use('/api/projects', projectRouter);


// action endpoints
// server.use('/api/actions', actionRouter);

module.exports = server;