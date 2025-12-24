const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/server');
const { Task, Comment } = require('../src/data');

let sampleTaskId;

describe('Comment APIs', () => {
  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await Task.deleteMany();
    await Comment.deleteMany();
    const task = new Task({ title: 'Sample Task' });
    await task.save();
    sampleTaskId = task._id.toString();
  });

  describe('POST /tasks/:taskId/comments', () => {
    it('should create a comment successfully', async () => {
      const res = await request(app)
        .post(`/tasks/${sampleTaskId}/comments`)
        .send({ text: 'This is a test comment' });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.taskId).toBe(sampleTaskId);
      expect(res.body.text).toBe('This is a test comment');
      expect(res.body).toHaveProperty('createdAt');
    });

    it('should return 404 if task not found', async () => {
      const res = await request(app)
        .post('/tasks/507f1f77bcf86cd799439011/comments')
        .send({ text: 'Comment' });

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Task not found');
    });

    it('should return 400 if text is missing', async () => {
      const res = await request(app)
        .post(`/tasks/${sampleTaskId}/comments`)
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Text is required');
    });
  });

  describe('GET /tasks/:taskId/comments', () => {
    it('should return comments for a task', async () => {
      // Create a comment first
      await request(app)
        .post(`/tasks/${sampleTaskId}/comments`)
        .send({ text: 'Comment 1' });

      const res = await request(app)
        .get(`/tasks/${sampleTaskId}/comments`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].text).toBe('Comment 1');
    });

    it('should return empty array if no comments', async () => {
      const res = await request(app)
        .get(`/tasks/${sampleTaskId}/comments`);

      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });
  });

  describe('PUT /comments/:id', () => {
    it('should update a comment successfully', async () => {
      // Create a comment
      const createRes = await request(app)
        .post(`/tasks/${sampleTaskId}/comments`)
        .send({ text: 'Original comment' });

      const commentId = createRes.body._id;

      const res = await request(app)
        .put(`/comments/${commentId}`)
        .send({ text: 'Updated comment' });

      expect(res.status).toBe(200);
      expect(res.body.text).toBe('Updated comment');
    });

    it('should return 404 if comment not found', async () => {
      const res = await request(app)
        .put('/comments/507f1f77bcf86cd799439011')
        .send({ text: 'Update' });

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Comment not found');
    });

    it('should return 400 if text is missing', async () => {
      // Create a comment
      const createRes = await request(app)
        .post(`/tasks/${sampleTaskId}/comments`)
        .send({ text: 'Comment' });

      const commentId = createRes.body._id;

      const res = await request(app)
        .put(`/comments/${commentId}`)
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Text is required');
    });
  });

  describe('DELETE /comments/:id', () => {
    it('should delete a comment successfully', async () => {
      // Create a comment
      const createRes = await request(app)
        .post(`/tasks/${sampleTaskId}/comments`)
        .send({ text: 'Comment to delete' });

      const commentId = createRes.body._id;

      const res = await request(app)
        .delete(`/comments/${commentId}`);

      expect(res.status).toBe(204);

      // Verify it's deleted
      const getRes = await request(app)
        .get(`/tasks/${sampleTaskId}/comments`);

      expect(getRes.body).toEqual([]);
    });

    it('should return 404 if comment not found', async () => {
      const res = await request(app)
        .delete('/comments/507f1f77bcf86cd799439011');

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Comment not found');
    });
  });
});