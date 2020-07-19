import express from "express"
import { Post } from "../models/post.model";
import mongoose from "mongoose";

/**
 * The controller, responsible for manipulating post data.
 */
export class PostController {

    // The internal mongoose schema, which hooks into the mongoose DB.
    private schema: mongoose.Schema = new mongoose.Schema(
        {
            title: String,
            description: String,
            published: Boolean
        },
        {
            timestamps: true
        }
    );

    // The mongoose model, which can be thought of as the db connection
    private model: any;

    /**
     * Creates a new post controller.
     */
    public constructor() {
        this.schema.method<any>( "toJson", () => {
            const { __v, _id, ...object } = ( this as any ).toObject();
        } );

        this.model = mongoose.model<mongoose.Document>( "post", this.schema );
    }

    /**
     * Creates a new post.
     * @param request The request object.
     * @param response The response object.
     */
    public create( request: express.Request, response: express.Response ) {
        // Validate request
        if ( !request.body.title ) {
            response.status( 400 ).send( { message: "Content cannot be empty!" } );
            return;
        }

        // Create new
        const post = new Post(
            request.body.title,
            request.body.description,
            request.body.published ? request.body.published : false
        );

        // Save to the DB
        this.model.save( post )
            .then( ( data: any ) => {
                response.send( data );
            } )
            .catch( ( error: Error ) => {
                response.status( 500 ).send( {
                    message: error.message || "Unexpected error occurred while creating post."
                } );
            } );
    };

    // Get all posts.
    public findAll( request: express.Request, response: express.Response ): void {
        const title = String( request.query.title );
        var condition = title ? { title: { $regex: new RegExp( title ), $options: "i" } } : {};

        this.model.find( condition )
            .then( ( data: any ) => {
                response.send( data );
            } )
            .catch( ( error: Error ) => {
                response.status( 500 ).send( {
                    message: error.message || "Unexpected error occurred while creating post."
                } );
            } );
    };

    // Find post by id.
    public findOne( request: express.Request, response: express.Response ): void {
        const id = request.params.id;

        this.model.findById( id )
            .then( ( data: any ) => {
                if ( !data ) {
                    response.status( 404 ).send( { message: "Could not find post id: " + id } );
                } else {
                    response.send( data );
                }
            } )
            .catch( ( error: Error ) => {
                response.status( 500 ).send( {
                    message: "Error retrieving post id: " + id
                } );
            } );
    };

    // Update post by id.
    public update( request: express.Request, response: express.Response ): void {
        if ( !request.body ) {
            response.status( 400 ).send( { message: "Data to update cannot be empty!" } );
            return;
        }

        const id = request.params.id;

        this.model.findByIdAndUpdate( id, request.body, { useFindAndModify: false } )
            .then( ( data: any ) => {
                if ( !data ) {
                    response.status( 404 ).send( {
                        message: `Cannot update post with id=${id}. Post not found?`
                    } );
                } else {
                    response.send( { message: "Updated successfully!" } );
                }
            } )
            .catch( ( error: Error ) => {
                response.status( 500 ).send( {
                    message: "Error updating post id: " + id
                } );
            } );
    };

    // Delete post by id.
    public delete( request: express.Request, response: express.Response ): void {
        const id = request.params.id;

        this.model.findByIdAndRemove( id )
            .then( ( data: any ) => {
                if ( !data ) {
                    response.status( 404 ).send( {
                        message: `Cannot delete post id=${id}. Not found?`
                    } );
                } else {
                    response.send( {
                        message: "Post deleted successfully"
                    } );
                }
            } )
            .catch( ( error: Error ) => {
                response.status( 500 ).send( {
                    message: "Could not delete post id: " + id
                } );
            } );
    };

    // Delete all posts.
    public deleteAll( request: express.Request, response: express.Response ): void {
        this.model.deleteMany( {} )
            .then( ( data: any ) => {
                response.send( {
                    message: `${data.deleteCount} posts deleted successfully!`
                } );
            } )
            .catch( ( error: Error ) => {
                response.status( 500 ).send( {
                    message: "Unexpected error occurred while attempting to remove all posts."
                } );
            } );
    };

    // Find all published posts.
    public findAllPublished( request: express.Request, response: express.Response ): void {
        this.model.find( { published: true } )
            .then( ( data: any ) => {
                response.send( data );
            } )
            .catch( ( error: Error ) => {
                response.status( 500 ).send( {
                    message: error.message || "Unexpected error occurred while attempting to get published posts."
                } );
            } );
    };

}