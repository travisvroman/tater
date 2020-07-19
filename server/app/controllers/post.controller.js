const db = require("../models");
const { response } = require("express");
const Post = db.posts;

// Create new post.
exports.create = (request, response) => {
    // Validate request
    if (!request.body.title) {
        response.status(400).send({ message: "Content cannot be empty!" });
        return;
    }

    // Create new
    const post = new Post({
        title: request.body.title,
        description: request.body.description,
        published: request.body.published ? request.body.published : false
    });

    // Save to the DB
    post.save(post)
        .then(data => {
            response.send(data);
        })
        .catch(error => {
            response.status(500).send({
                message: error.message || "Unexpected error occurred while creating post."
            });
        });
};

// Get all posts.
exports.findAll = (request, response) => {
    const title = request.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Post.find(condition)
        .then(data => {
            response.send(data);
        })
        .catch(error => {
            response.status(500).send({
                message: error.message || "Unexpected error occurred while creating post."
            });
        });
};

// Find post by id.
exports.findOne = (request, response) => {
    const id = request.params.id;

    Post.findById(id)
        .then(data => {
            if (!data) {
                response.status(404).send({ message: "Could not find post id: " + id });
            } else {
                response.send(data);
            }
        })
        .catch(error => {
            response.status(500).send({
                message: "Error retrieving post id: " + id
            });
        });
};

// Update post by id.
exports.update = (request, response) => {
    if (!request.body) {
        return response.status(400).send({ message: "Data to update cannot be empty!" });
    }

    const id = request.params.id;

    Post.findByIdAndUpdate(id, request.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                response.status(404).send({
                    message: `Cannot update post with id=${id}. Post not found?`
                });
            } else {
                response.send({ message: "Updated successfully!" });
            }
        })
        .catch(error => {
            response.status(500).send({
                message: "Error updating post id: " + id
            });
        });
};

// Delete post by id.
exports.delete = (request, response) => {
    const id = request.params.id;

    Post.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                response.status(404).send({
                    message: `Cannot delete post id=${id}. Not found?`
                });
            } else {
                response.send({
                    message: "Post deleted successfully"
                });
            }
        })
        .catch(error => {
            response.status(500).send({
                message: "Could not delete post id: " + id
            });
        });
};

// Delete all posts.
exports.deleteAll = (request, response) => {
    Post.deleteMany({})
        .then(data => {
            response.send({
                message: `${data.deleteCount} posts deleted successfully!`
            });
        })
        .catch(error => {
            response.status(500).send({
                message: "Unexpected error occurred while attempting to remove all posts."
            });
        });
};

// Find all published posts.
exports.findAllPublished = (request, response) => {
    Post.find({ published: true })
        .then(data => {
            response.send(data);
        })
        .catch(error => {
            response.status(500).send({
                message: error.message || "Unexpected error occurred while attempting to get published posts."
            });
        });
};