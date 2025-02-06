require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Task Schema
const TaskSchema = new mongoose.Schema({
    title: String,
    completed: { type: Boolean, default: false }
});
const Task = mongoose.model("Task", TaskSchema);

// Routes
app.post("/tasks", async (req, res) => {
    const task = await Task.create(req.body);
    res.json(task);
});

app.get("/tasks", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.put("/tasks/:id", async (req, res) => {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
});

app.delete("/tasks/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
