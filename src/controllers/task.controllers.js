import { Task } from "../models/task.models.js";

const createTask = async (req, res) => {
    try {

        const { title, description } = req.body

        await Task.create({ title, description, user: req.user })

        res.status(201).json({
            success: true,
            message: "Task Created Successfully",
        })

    } catch (error) {
        console.log("Error in creating Task", error);
    }
}


const readTasks = async (req, res) => {
    try {

        const userId = req.user._id

        const tasks = await Task.find({ user: userId })

        res.status(200).json({
            success: true,
            tasks
        })

    }

    catch (error) {
        console.log("Error in reading Tasks", error);
    }
}

const updateTasks = async (req, res) => {
    try {

        const { id } = req.params;

        const task = await Task.findById(id)

        if (!task) {
            return res.status(400).json({
                success: false,
                message: "Task Not Found"
            })
        }

        task.isCompleted = !task.isCompleted;

        await task.save()

        res.status(200).json({
            success: true,
            message: "Task Updated Successfully"
        })

    }

    catch (error) {
        console.log("Error in updating Tasks", error);
    }
}

const deleteTasks = async (req, res) => {
    try {

        const { id } = req.params;

        const task = await Task.findById(id)

        if (!task) {            
            return res.status(400).json({
                success: false,
                message: "Task Not Found"
            })
        }

        await task.deleteOne()

        res.status(200).json({
            success: true,
            message: "Task Deleted Successfully"
        })

    }

    catch (error) {
        console.log("Error in deleting Tasks", error);
    }
}

export { createTask, readTasks, updateTasks, deleteTasks }
