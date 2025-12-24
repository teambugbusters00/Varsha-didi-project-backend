# Task Comment Management Backend API

A robust backend API for managing comments on tasks, built with Node.js, Express, and MongoDB. Features full CRUD operations with automated testing.

## 🚀 Features

- ✅ **CRUD Operations** for comments on tasks
- ✅ **MongoDB Integration** with Mongoose ODM
- ✅ **Input Validation** and error handling
- ✅ **Automated Testing** with Jest and Supertest
- ✅ **RESTful API Design**
- ✅ **Environment-based Configuration**

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Testing**: Jest + Supertest
- **Deployment**: Render/Vercel ready

## 📁 Project Structure

```
├── src/
│   ├── data.js          # MongoDB models and connection
│   └── server.js        # Main Express server
├── tests/
│   └── comment.test.js  # API tests
├── package.json
└── README.md
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/teambugbusters00/Varsha-didi-project-backend.git
   cd Varsha-didi-project-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env` (if exists)
   - Set `MONGO_URI` to your MongoDB connection string
   - For local MongoDB: `mongodb://localhost:27017/didi-linkedin`
   - For MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/didi-linkedin`

4. **Start MongoDB** (if using local)
   ```bash
   mongod
   ```

5. **Run the server**
   ```bash
   npm start
   ```
   Server starts on http://localhost:3000

## 🧪 Testing

Run automated tests:
```bash
npm test
```

Tests include:
- ✅ Comment creation, reading, updating, deletion
- ✅ Input validation
- ✅ Error handling
- ✅ Database operations

## 📡 API Endpoints

### Comments API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/tasks/:taskId/comments` | Create a comment |
| GET | `/tasks/:taskId/comments` | Get all comments for a task |
| PUT | `/comments/:id` | Update a comment |
| DELETE | `/comments/:id` | Delete a comment |

### Request/Response Examples

#### Create Comment
```bash
POST /tasks/507f1f77bcf86cd799439011/comments
Content-Type: application/json

{
  "text": "This is a sample comment"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "taskId": "507f1f77bcf86cd799439011",
  "text": "This is a sample comment",
  "createdAt": "2025-12-24T18:00:00.000Z"
}
```

#### Get Comments
```bash
GET /tasks/507f1f77bcf86cd799439011/comments
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "taskId": "507f1f77bcf86cd799439011",
    "text": "This is a sample comment",
    "createdAt": "2025-12-24T18:00:00.000Z"
  }
]
```

## 🚀 Deployment

### Render Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Render Setup**
   - Go to render.com
   - New → Web Service
   - Connect GitHub repo
   - Settings:
     - Runtime: Node
     - Build Command: `npm install`
     - Start Command: `npm start`
   - Environment Variables:
     - `MONGO_URI`: Your MongoDB Atlas connection string

3. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment
   - Get your live URL

### Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```
   - Follow prompts
   - Set environment variables

## 🔍 Interview Questions

### Backend Development

1. **What is REST? Explain RESTful API design.**
   - REST (Representational State Transfer) is an architectural style for APIs
   - Uses HTTP methods (GET, POST, PUT, DELETE)
   - Stateless, cacheable, uniform interface

2. **Explain middleware in Express.js**
   - Functions that execute during request-response cycle
   - Can modify req/res objects
   - Used for authentication, logging, error handling

3. **What is MongoDB? Difference from SQL databases?**
   - NoSQL document database
   - Stores data in JSON-like documents
   - Schema-less, horizontal scaling
   - vs SQL: Fixed schema, relational, vertical scaling

4. **Explain async/await vs Promises**
   - async/await: Syntactic sugar over promises
   - Makes asynchronous code look synchronous
   - Better error handling with try/catch

5. **What is input validation? Why important?**
   - Checking data before processing
   - Prevents security vulnerabilities (injection attacks)
   - Ensures data integrity
   - Improves user experience

### Project-Specific Questions

6. **How did you structure this API?**
   - Separated concerns: models, routes, tests
   - Used MVC-like pattern
   - Centralized error handling

7. **Why MongoDB for this project?**
   - Flexible schema for comments
   - Easy to scale
   - JSON-like data matches JavaScript

8. **How did you handle errors?**
   - Try/catch blocks in async functions
   - Consistent error response format
   - HTTP status codes (400, 404, 500)

9. **Explain your testing strategy**
   - Unit tests for API endpoints
   - Used Supertest for HTTP testing
   - Mocked database for isolation
   - Tested success and error cases

10. **How would you add authentication?**
    - JWT tokens
    - Middleware for protected routes
    - Password hashing with bcrypt
    - User model with roles

### System Design

11. **How would you scale this API?**
    - Database indexing
    - Caching (Redis)
    - Load balancing
    - API rate limiting

12. **Security considerations?**
    - Input sanitization
    - CORS configuration
    - Environment variables for secrets
    - HTTPS in production

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License.

## 📞 Contact
8949906332
For questions or feedback, please reach out to the development team.
