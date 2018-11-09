const express = require('express');
const projectDB = require("../data/helpers/projectModel.js");

const router = express.Router();

// middleware

// endpoints

router.get("/", (req, res) => {
    projectDB.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The projects could not be retrieved." },
                console.log(err))
        })
})

router.get("/:id", (req, res) => {
    const {id} = req.params;

    projectDB.getProjectActions(id)
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The actions could not be retrieved." },
                console.log(err))
        })
})

router.post("/", (req, res) => {
    const projectData = req.body;
    const nameLimit = 128;

    try {
        if (projectData.name.length > nameLimit) {
            res.status(400).json({ error: "Please make sure the name is less than 128 characters." })

        }
        else if (projectData.name === "" || projectData.name === undefined || 
        projectData.description === "" || projectData.description === undefined) {
            res.status(400).json({ error: "Please make sure the project name and/or description are indexed." })
        }
        else {
            projectDB.insert(projectData);
            res.status(201).json(projectData);
            }
        }
    catch (error) {
        res.status(500).json({ error: "There was an error while saving the project to the database" })
    }
})

router.put("/:id", (req, res) => {
    const {id} = req.params;
    const projectData = req.body;
    const nameLimit = 128;

    try {
        if (projectData.name.length > nameLimit) {
            res.status(400).json({ error: "Please make sure the name is less than 128 characters." })
        }
        else if (projectData.name === "" || projectData.name === undefined || 
        projectData.description === "" || projectData.description === undefined) {
            res.status(400).json({ error: "Please make sure the project name and/or description are indexed." })
        }
        else {
            projectDB.update(id, projectData)
                .then(update => {
                    if (update === null) {
                        res.status(404).json({ message: "The project with the specified ID does not exist." })
        }
                    else {
                        res.status(201).json(projectData);
                    }})
        }
    }
    catch (error) {
        res.status(500).json({ error: "There was an error while saving the project to the database" })
    }
})

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    projectDB.remove(id)
        .then(count => {
            if(count) {
                res.status(200).json(count);
            }
            else {
                res.status(404).json({ message: "The project with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The project could not be removed" })
        })
})

module.exports = router;