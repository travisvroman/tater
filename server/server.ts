// For REST API
import express from "express";

// Parse request and create request.body object
import bodyParser from "body-parser";

// Enable CORS.
import cors from "cors";
import { PostRouter } from "./app/routes/post.routes";
import { IDataProvider, ErrorInfo } from "./app/DAL/IDataProvider";
import { MongooseDataProvider } from "./app/DAL/MongooseDataProvider";

/**
 * Represents the application which serves requests to the front-end.
 */
export class TaterServer {

    // Start up express.
    private static app = express();
    private static dataProvider: IDataProvider;

    /**
     * Kick off the server and begin listening.
     */
    public static Start(): void {
        var corsOptions = {

            // The location of the site.
            origin: "http://localhost:4200"
        }

        // Middleware: CORS support
        TaterServer.app.use( cors( corsOptions ) );

        // Middleware: Parse requests of content-type application-json
        TaterServer.app.use( bodyParser.json() );

        // Parse requests of application type application/x-www-form-urlencoded
        TaterServer.app.use( bodyParser.urlencoded( { extended: true } ) );

        // Connect to the database. TODO: figure out which one to use based on config.
        TaterServer.dataProvider = new MongooseDataProvider();
        TaterServer.dataProvider.Connect(
            "mongodb://localhost:27017/tater_db",
            () => {
                console.log( "Connected to database!" );
            },
            ( error: ErrorInfo ) => {
                console.error( "Failed to connect to database!", error );
                process.exit();
            }
        );

        // Routes:
        // /api/posts: GET, POST, DELETE
        // /api/posts/:id: GET, PUT, UPDATE
        // /apt/posts/published: GET

        // Routes
        PostRouter.Initialize( TaterServer.app, TaterServer.dataProvider );

        // Set port, listen for requests.
        const PORT = process.env.PORT || 8080;
        TaterServer.app.listen( PORT, () => {
            console.log( `Server is running on port ${PORT}` );
        } );
    }
}

// Start off the server.
TaterServer.Start();