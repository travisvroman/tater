import express, { Router } from "express";
import "../controllers/post.controller"
import { PostController } from "../controllers/post.controller";
import { IDataProvider } from "../DAL/IDataProvider";

/**
 * A router to handle posts in the system.
 */
export class PostRouter {

    // The express router.
    private static router: Router;

    // The internally used post controller.
    private static controller: PostController;

    /**
     * Initializes this router using the provided DataProvider, and feeds back to the application.
     * @param app The application
     * @param dataProvider The data provider
     */
    public static Initialize( app: express.Express, dataProvider: IDataProvider ): void {
        PostRouter.controller = new PostController( dataProvider );

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

        // Tell the app to use this router.
        app.use( "/api/posts", PostRouter.router );
    }
};