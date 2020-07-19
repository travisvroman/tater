import express, { Router } from "express";
import "../controllers/post.controller"
import { PostController } from "../controllers/post.controller";

export class PostRouter {

    private static router: Router;
    private static controller: PostController;

    public static Initialize( app: express.Express ) {
        PostRouter.controller = new PostController();

        PostRouter.router = express.Router();

        // Create new
        PostRouter.router.post( "/", PostRouter.controller.create.bind( PostRouter.controller ) );

        // Get all posts
        PostRouter.router.get( "/", PostRouter.controller.findAll.bind( PostRouter.controller ) );

        // All published
        PostRouter.router.get( "/published", PostRouter.controller.findAllPublished.bind( PostRouter.controller ) );

        // Get post by id
        PostRouter.router.get( "/:id", PostRouter.controller.findOne.bind( PostRouter.controller ) );

        // Update by id
        PostRouter.router.put( "/:id", PostRouter.controller.update.bind( PostRouter.controller ) );

        // Delete by id
        PostRouter.router.delete( "/:id", PostRouter.controller.delete.bind( PostRouter.controller ) );

        // Delete all posts
        PostRouter.router.delete( "/", PostRouter.controller.deleteAll.bind( PostRouter.controller ) );

        app.use( "/api/posts", PostRouter.router );
    }
};