module.exports = app => {
    const posts = require("../controllers/post.controller");

    var router = require("express").Router();

    // Create new
    router.post("/", posts.create);

    // Get all posts
    router.get("/", posts.findAll);

    // All published
    router.get("/published", posts.findAllPublished);

    // Get post by id
    router.get("/:id", posts.findOne);

    // Update by id
    router.put("/:id", posts.update);

    // Delete by id
    router.delete("/:id", posts.delete);

    // Delete all posts
    router.delete("/", posts.deleteAll);

    app.use("/api/posts", router);
};