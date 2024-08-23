Blog API Backend
This repository contains the backend code for a blog application built with Node.js, Express, and MongoDB.

Table of Contents
Features
Technologies Used
Setup and Installation
API Endpoints
Database Schema
Error Handling
Deployment
Contributing
Features
CRUD operations for blog posts
Comment system for blog posts
Basic input validation and error handling
Technologies Used
Node.js
Express
MongoDB
Mongoose
CORS
Body-parser
Setup and Installation
To set up and run the backend API, follow these steps:

Prerequisites
Node.js (>= 14.x)
MongoDB instance (local or cloud)
Installation
Clone the repository

bash
Copy code
git clone https://github.com/yourusername/blog-api-backend.git
cd blog-api-backend
Install dependencies

bash
Copy code
npm install
Set up environment variables

Create a .env file in the root directory and add the following environment variables:

env
Copy code
MONGO_URI=your_mongodb_connection_string
PORT=5000
Start the server

bash
Copy code
npm start
The server will start and listen on port 5000 by default.

API Endpoints
POST /posts
Create a new blog post.

Request Body:

json
Copy code
{
  "title": "Post Title",
  "content": "Post content"
}
Response:

json
Copy code
{
  "_id": "post_id",
  "title": "Post Title",
  "content": "Post content",
  "date": "2024-08-23T00:00:00.000Z"
}
GET /posts
Get a list of all blog posts.

Response:

json
Copy code
[
  {
    "_id": "post_id",
    "title": "Post Title",
    "content": "Post content",
    "date": "2024-08-23T00:00:00.000Z"
  }
]
GET /posts/
Get a specific blog post by ID.

Response:

json
Copy code
{
  "_id": "post_id",
  "title": "Post Title",
  "content": "Post content",
  "date": "2024-08-23T00:00:00.000Z",
  "comments": [
    {
      "_id": "comment_id",
      "username": "User",
      "text": "Comment text",
      "date": "2024-08-23T00:00:00.000Z"
    }
  ]
}
PUT /posts/
Update a blog post by ID.

Request Body:

json
Copy code
{
  "title": "Updated Title",
  "content": "Updated content"
}
Response:

json
Copy code
{
  "_id": "post_id",
  "title": "Updated Title",
  "content": "Updated content",
  "date": "2024-08-23T00:00:00.000Z"
}
DELETE /posts/
Delete a blog post by ID.

Response:

json
Copy code
{
  "message": "Post deleted"
}
POST /posts/
/comments
Add a comment to a blog post.

Request Body:

json
Copy code
{
  "username": "User",
  "text": "Comment text"
}
Response:

json
Copy code
{
  "_id": "post_id",
  "title": "Post Title",
  "content": "Post content",
  "date": "2024-08-23T00:00:00.000Z",
  "comments": [
    {
      "_id": "comment_id",
      "username": "User",
      "text": "Comment text",
      "date": "2024-08-23T00:00:00.000Z"
    }
  ]
}
Database Schema
Post Schema
title (String, required)
content (String, required)
date (Date, default: Date.now)
comments (Array of Comment objects)
Comment Schema
username (String, required)
text (String, required)
date (Date, default: Date.now)
