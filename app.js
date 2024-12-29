const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// In-memory task store
let tasks = [];
let nextId = 1;

// Get all tasks
app.get('/api/tasks', (req, res) => res.json(tasks));

// Get task by ID
app.get('/api/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
});

// Create a new task
app.post('/api/tasks', (req, res) => {
    const { task, category, time } = req.body;
    if (!task) return res.status(400).json({ error: 'Task is required' });

    const newTask = { id: nextId++, task, category, time };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Update a task
app.put('/api/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ error: 'Task not found' });

    const { task: newTask, category, time } = req.body;
    if (newTask) task.task = newTask;
    if (category) task.category = category;
    if (time) task.time = time;

    res.json(task);
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
    tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
    res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
