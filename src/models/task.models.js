import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    }, 
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, 
{
    timestamps: true
})

const Task = mongoose.model('Task', taskSchema)

export { Task }
