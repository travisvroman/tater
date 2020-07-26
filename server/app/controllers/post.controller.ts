import express from "express";
import { Post } from "../models/post.model";
import { IDataProvider, DataProviderQuery, DataProviderQueryType, ErrorInfo, DataProviderQueryField } from "../DAL/IDataProvider";

/**
 * The controller, responsible for manipulating post data.
 */
export class PostController {
    private dataProvider: IDataProvider;

    /**
     * Creates a new post controller.
     */
    public constructor( dataProvider: IDataProvider ) {
        this.dataProvider = dataProvider;
    }

    /**
     * Creates a new post.
     * @param request The request object.
     * @param response The response object.
     */
    public create( request: express.Request, response: express.Response ): void {

        // Validate request
        if ( !request.body.title ) {
            response.status( 400 ).send( { message: "Content cannot be empty!" } );
            return;
        }

        // Create new
        const post = new Post(
            request.body.title,
            request.body.content,
            request.body.published ? request.body.published : false
        );

        // Save data.
        this.dataProvider.Create<Post>(
            post,
            ( result: Post ) => { response.send( result ); },
            ( error: ErrorInfo ) => {
                response.status( error.ErrorCode ).send( {
                    message: error.ErrorMessage,
                    innerError: error.InnerError
                } );
            }
        );
    }

    // Get all posts.
    public findAll( request: express.Request, response: express.Response ): void {
        const title = String( request.query.title );
        const condition = title ? { title: { $regex: new RegExp( title ), $options: "i" } } : {};

        const query = new DataProviderQuery<Post[]>( DataProviderQueryType.FindAll );
        query.Params[DataProviderQueryField.ObjectType] = "post";
        query.Params[DataProviderQueryField.Condition] = condition;

        // Search data
        this.dataProvider.Read<Post[]>(
            query,
            ( result: Post[] ) => { response.send( result ); },
            ( error: ErrorInfo ) => {
                response.status( error.ErrorCode ).send( {
                    message: error.ErrorMessage,
                    innerError: error.InnerError
                } );
            }
        );
    }

    // Find post by id.
    public findOne( request: express.Request, response: express.Response ): void {

        const query = new DataProviderQuery<Post>( DataProviderQueryType.FindOne );
        query.Params[DataProviderQueryField.ObjectType] = "post";
        query.Params[DataProviderQueryField.Id] = request.params.id;

        // Search data
        this.dataProvider.Read<Post>(
            query,
            ( result: Post ) => { response.send( result ); },
            ( error: ErrorInfo ) => {
                response.status( error.ErrorCode ).send( {
                    message: error.ErrorMessage,
                    innerError: error.InnerError
                } );
            }
        );
    }

    // Update post by id.
    public update( request: express.Request, response: express.Response ): void {
        if ( !request.body ) {
            response.status( 400 ).send( { message: "Data to update cannot be empty!" } );
            return;
        }

        const id = request.params.id;

        const query = new DataProviderQuery<Post>( DataProviderQueryType.FindOne );
        query.Params[DataProviderQueryField.ObjectType] = "post";
        query.Params[DataProviderQueryField.Id] = request.params.id;
        query.Params[DataProviderQueryField.Body] = request.body;

        // Update data
        this.dataProvider.Update<Post>(
            query,
            ( result: Post ) => { response.send( result ); },
            ( error: ErrorInfo ) => {
                response.status( error.ErrorCode ).send( {
                    message: error.ErrorMessage,
                    innerError: error.InnerError
                } );
            }
        );
    }

    // Delete post by id.
    public delete( request: express.Request, response: express.Response ): void {
        const id = request.params.id;

        const query = new DataProviderQuery<Post>( DataProviderQueryType.FindOne );
        query.Params[DataProviderQueryField.ObjectType] = "post";
        query.Params[DataProviderQueryField.Id] = request.params.id;

        // Search data
        this.dataProvider.Delete<Post>(
            query,
            ( result: Post ) => { response.send( result ); },
            ( error: ErrorInfo ) => {
                response.status( error.ErrorCode ).send( {
                    message: error.ErrorMessage,
                    innerError: error.InnerError
                } );
            }
        );
    }

    // Find all published posts.
    public findAllPublished( request: express.Request, response: express.Response ): void {

        const query = new DataProviderQuery<Post>( DataProviderQueryType.FindAll );
        query.Params[DataProviderQueryField.ObjectType] = "post";
        query.Params[DataProviderQueryField.Condition] = { published: true };

        // Search data
        this.dataProvider.Read<Post>(
            query,
            ( result: Post ) => { response.send( result ); },
            ( error: ErrorInfo ) => {
                response.status( error.ErrorCode ).send( {
                    message: error.ErrorMessage,
                    innerError: error.InnerError
                } );
            }
        );
    }
}
