import mongoose from "mongoose"
import { IDataProvider, DataProviderQuery, DataProviderQueryType, ErrorInfo, ErrorCallback, DataProviderSuccessCallback } from "./IDataProvider"
import { Post } from "../models/post.model";
import { PostModel, PostDocument } from "./models/postModel";

/**
 * A data provider which uses mongoose, a library to hook up to MongoDB.
 */
export class MongooseDataProvider implements IDataProvider {

    // The post model.
    private _postModel: PostModel;

    /**
     * Creates a new Mongoose DataProvider
     */
    public constructor() {

        // Setup schema
        let postSchema = new mongoose.Schema(
            {
                title: { type: String, required: true },
                content: { type: String, required: true },
                published: { type: Boolean, default: false }
            },
            {
                timestamps: true
            }
        );

        // Provide a "toJson" method to expose the ID
        postSchema.method<any>( "toJson", () => {
            const { __v, _id, ...object } = ( this as any ).toObject();
        } );

        // Create the mongoose model and save it off in the dictionary.
        this._postModel = mongoose.model<PostDocument>( "post", postSchema );
    }

    /**
     * Attempts to connect to the provided database.
     * 
     * @param dsn The Data Source Name of the database (connection string)
     * @param onSuccess Callback made on success. Optional.
     * @param onError Callback made on error. Optional.
     */
    public async Connect( dsn: string, onSuccess?: () => void, onError?: ( error: ErrorInfo ) => void ): Promise<void> {
        await mongoose.connect( dsn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        } ).then( () => {
            if ( onSuccess ) {
                onSuccess();
            }
        } ).catch(
            ( error: Error ) => {
                if ( onError ) {
                    onError( new ErrorInfo( 500, "Error connecting to database", error ) );
                }
            } );
    }

    /**
     * Attempts to create the passed object in the data layer.
     * 
     * @param object The object to be created/saved in the data layer.
     * @param onSuccess Callback made on success. Optional.
     * @param onError Callback made on error. Optional.
     */
    public async Create<T>( object: T, onSuccess?: DataProviderSuccessCallback<T>, onError?: ErrorCallback ): Promise<void> {

        if ( object instanceof Post ) {
            ( await this._postModel.create( object ) ).save()
                .then( ( data: any ) => {
                    if ( onSuccess ) {
                        onSuccess( data as T );
                    }
                } )
                .catch( ( error: Error ) => {
                    if ( onError ) {
                        onError( new ErrorInfo( 500, "", error ) );
                    }
                } );
        }
    }

    /**
     * Attempts to read an object or objects from the data layer.
     * 
     * @param query The query used for object selection.
     * @param onSuccess Callback made on success. Optional.
     * @param onError Callback made on error. Optional.
     */
    public async Read<T>( query: DataProviderQuery<T>, onSuccess?: DataProviderSuccessCallback<T>, onError?: ErrorCallback ): Promise<void> {

        switch ( query.Type ) {
            case DataProviderQueryType.FindAll: {
                if ( query.Params["objType"] === "post" ) {
                    await this._postModel.find( query.Params["condition"] )
                        .then( ( data: any ) => {
                            if ( onSuccess ) {
                                onSuccess( data as T );
                            }
                        } )
                        .catch( ( error: Error ) => {
                            if ( onError ) {
                                onError( new ErrorInfo( 500, "Unexpected error occurred while searching posts.", error ) );
                            }
                        } );
                } else {

                    // If this point is reached, an unrecognized data type was used.
                    if ( onError ) {
                        onError( new ErrorInfo( 500, "IDataProvider::Read() - Unexpected object type." ) );
                    }
                }
                return;
            }
            case DataProviderQueryType.FindOne:
                if ( query.Params["objType"] === "post" ) {
                    let id = query.Params["id"];
                    this._postModel.findById( query.Params["id"] )
                        .then( ( data: any ) => {
                            if ( !data ) {
                                if ( onError ) {
                                    onError( new ErrorInfo( 404, "Could not find post id: " + id, undefined ) );
                                }
                            } else {
                                if ( onSuccess ) {
                                    onSuccess( data as T );
                                }
                            }
                        } )
                        .catch( ( error: Error ) => {
                            if ( onError ) {
                                onError( new ErrorInfo( 500, "Error retrieving post id: " + id, error ) );
                            }
                        } );
                } else {

                    // If this point is reached, an unrecognized data type was used.
                    if ( onError ) {
                        onError( new ErrorInfo( 500, "IDataProvider::Read() - Unexpected object type." ) );
                    }
                }
                return;
        }
    }

    /**
     * Attempts to update an object or objects provided in the query.
     * @param query The query used for object selection.
     * @param onSuccess Callback made on success. Optional.
     * @param onError Callback made on error. Optional.
     */
    public async Update<T>( query: any, onSuccess?: DataProviderSuccessCallback<T>, onError?: ErrorCallback ): Promise<void> {
        if ( query.Params["objType"] === "post" ) {
            let id = query.Params["id"];
            let body = query.Params["body"];

            this._postModel.findByIdAndUpdate( id, body, { useFindAndModify: false } )
                .then( ( data: any ) => {
                    if ( !data ) {
                        if ( onError ) {
                            onError( new ErrorInfo( 404, "Could not update post id: " + id, undefined ) );
                        }
                    } else {
                        if ( onSuccess ) {
                            onSuccess( data as T );
                        }
                    }
                } )
                .catch( ( error: Error ) => {
                    if ( onError ) {
                        onError( new ErrorInfo( 500, "Error updating post id: " + id, error ) );
                    }
                } );
        } else {

            // If this point is reached, an unrecognized data type was used.
            if ( onError ) {
                onError( new ErrorInfo( 500, "IDataProvider::Update() - Unexpected object type." ) );
            }
        }
    }

    /**
     * Attempts to delete an object or objects from the data layer using the provided query.
     * 
     * @param query The query used for object selection.
     * @param onSuccess Callback made on success. Optional.
     * @param onError Callback made on error. Optional.
     */
    public async Delete<T>( query: any, onSuccess?: DataProviderSuccessCallback<T>, onError?: ErrorCallback ): Promise<void> {
        if ( query.Params["objType"] === "post" ) {
            let id = query.Params["id"];

            this._postModel.findByIdAndRemove( id )
                .then( ( data: any ) => {
                    if ( !data ) {
                        if ( onError ) {
                            onError( new ErrorInfo( 404, "Could not delete post id: " + id, undefined ) );
                        }
                    } else {
                        if ( onSuccess ) {
                            onSuccess( data as T );
                        }
                    }
                } )
                .catch( ( error: Error ) => {
                    if ( onError ) {
                        onError( new ErrorInfo( 500, "Error deleting post id: " + id, error ) );
                    }
                } );
        } else {

            // If this point is reached, an unrecognized data type was used.
            if ( onError ) {
                onError( new ErrorInfo( 500, "IDataProvider::Update() - Unexpected object type." ) );
            }
        }
    }
}