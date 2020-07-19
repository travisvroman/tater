// Mongoose model.
// const dbConfig = require( "../../config/db.config.js" );

// const mongoose = require( "mongoose" );
// mongoose.Promise = global.Promise;

// const db = {};
// db.mongoose = mongoose;
// db.url = dbConfig.url;
// db.posts = require( "./post.model.js" )( mongoose );

// module.exports = db;

import mongoose from "mongoose";

export class DBIO {

    private static mongoose = mongoose;
    private static url: string;

    public static Initialize( configUrl: string ): void {

        DBIO.url = configUrl;

        // Connect to db
        mongoose
            .connect( DBIO.url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            } )
            .then( () => {
                console.log( "Connected to the database!" );
            } )
            .catch( ( err: Error ) => {
                console.log( "Cannot connect to the database!", err );
                process.exit();
            } );
    }
}