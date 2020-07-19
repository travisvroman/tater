// For REST API
import express from "express";

// Parse request and create request.body object
import bodyParser from "body-parser";

// Enable CORS.
import cors from "cors";
import { DBIO } from "./app/models";
import { PostRouter } from "./app/routes/post.routes";

export class TaterServer {
    private static app = express();

    public static Start(): void {
        var corsOptions = {
            origin: "http://localhost:8081"
        }

        // Middleware: CORS support
        TaterServer.app.use( cors( corsOptions ) );

        // Middleware: Parse requests of content-type application-json
        TaterServer.app.use( bodyParser.json() );

        // Parse requests of application type application/x-www-form-urlencoded
        TaterServer.app.use( bodyParser.urlencoded( { extended: true } ) );

        // Connect to the database
        DBIO.Initialize( "mongodb://localhost:27017/tater_db" );

        // Routes:
        // /api/posts: GET, POST, DELETE
        // /api/posts/:id: GET, PUT, UPDATE
        // /apt/posts/published: GET

        // Routes
        PostRouter.Initialize( TaterServer.app );

        // Set port, listen for requests.
        const PORT = process.env.PORT || 8080;
        TaterServer.app.listen( PORT, () => {
            console.log( `Server is running on port ${PORT}` );
        } );
    }
}

TaterServer.Start();