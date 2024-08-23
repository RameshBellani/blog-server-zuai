const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const MONGO_URI = "mongodb+srv://rameshbellani95:Ramesh1234@cluster0.raipn7s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(MONGO_URI, {}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    comments: [
        {
            username: { type: String, required: true },
            text: { type: String, required: true },
            date: { type: Date, default: Date.now }
        }
    ]
});

const Post = mongoose.model('Post', PostSchema);

app.get('/posts', async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

app.get('/posts/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.json(post);
});

app.post('/posts', async (req, res) => {
    const newPost = new Post(req.body);
    await newPost.save();
    res.json(newPost);
});

app.put('/posts/:id', async (req, res) => {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPost);
});

app.delete('/posts/:id', async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted' });
});

app.post('/posts/:id/comments', async (req, res) => {
    const { username, text } = req.body;
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const newComment = { username, text };
        post.comments.push(newComment);
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


