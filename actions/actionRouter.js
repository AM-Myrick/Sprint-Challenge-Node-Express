const express = require('express');
const actionDB = require("../data/helpers/actionModel.js");

const router = express.Router();

// middleware

// endpoints

router.get("/", (req, res) => {
    actionDB.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(err => {
            res.status(500).json({ error: "The actions could not be retrieved." })
        })
})

router.post("/", (req, res) => {
    const actionData = req.body;
    const descLimit = 128;

    try {
        if (actionData.description.length > descLimit) {
            res.status(400).json({ error: "Please make sure the description is less than 128 characters." })
        }
        else if (actionData.notes === "" || actionData.notes === undefined || 
        actionData.description === "" || actionData.description === undefined ||
        actionData.project_id === "" || actionData.project_id === undefined) {
            res.status(400).json({ error: "Please make sure the project ID, notes, and/or description are indexed." })
        }
        else {
            actionDB.insert(actionData)
            res.status(201).json(actionData);
            }
        }
    catch (error) {
        res.status(500).json({ error: "There was an error while saving the project to the database" })
    }
})

router.put("/:id", (req, res) => {
    const {id} = req.params;
    const actionData = req.body;
    const descLimit = 128;

    try {
        if (actionData.description.length > descLimit) {
            res.status(400).json({ error: "Please make sure the description is less than 128 characters." })
        }
        else if (actionData.notes === "" || actionData.notes === undefined || 
        actionData.description === "" || actionData.description === undefined ||
        actionData.project_id === "" || actionData.project_id === undefined) {
            res.status(400).json({ error: "Please make sure the project ID, notes, and/or description are indexed." })
        }
        else {
            actionDB.update(id, actionData)
                .then(update => {
                    if (update === null) {
                        res.status(404).json({ message: "The action with the specified ID does not exist." })
        }
                    else {
                        res.status(201).json(actionData);
                    }})
        }
    }
    catch (error) {
        res.status(500).json({ error: "There was an error while saving the project to the database" })
    }
})

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    actionDB.remove(id)
        .then(count => {
            if(count) {
                res.status(200).json(count);
            }
            else {
                res.status(404).json({ message: "The action with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The project could not be removed" })
        })
})

module.exports = router;