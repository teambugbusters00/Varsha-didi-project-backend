const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/didi-linkedin?directConnection=true';
mongoose.connect(mongoURI);

// Import models
const { Task, Comment } = require('./data');

// Root route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Task Comment API is running!', status: 'OK' });
});

// POST /tasks/:taskId/comments - Create a comment for a task
app.post('/tasks/:taskId/comments', async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Text is required' });

    const comment = new Comment({ taskId, text });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /tasks/:taskId/comments - Get all comments for a task
app.get('/tasks/:taskId/comments', async (req, res) => {
  try {
    const { taskId } = req.params;
    const comments = await Comment.find({ taskId });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /comments/:id - Update a comment
app.put('/comments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Text is required' });

    const comment = await Comment.findByIdAndUpdate(id, { text }, { new: true });
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /comments/:id - Delete a comment
app.delete('/comments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;