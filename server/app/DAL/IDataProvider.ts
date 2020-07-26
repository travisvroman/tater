/**
 * A callback made on successful IDataProvider operations.
 */
export type DataProviderSuccessCallback<T> = ( object: T ) => void;

/**
 * A callback made on unsuccessful IDataProvider operations.
 */
export type ErrorCallback = ( error: ErrorInfo ) => void;

/**
 * Represents an interface which provides methods for CRUD operations. Implementers
 * of this save off to some sort of data layer such as a database or flat file.
 */
export interface IDataProvider {

    /**
     * Attempts to connect to the provided database.
     * @param dsn The Data Source Name of the database (connection string)
     * @param onSuccess Callback made on success. Optional.
     * @param onError Callback made on error. Optional.
     */
    Connect( dsn: string, onSuccess?: () => void, onError?: ErrorCallback ): Promise<void>;

    /**
     * Attempts to create the passed object in the data layer.
     * @param object The object to be created/saved in the data layer.
     * @param onSuccess Callback made on success. Optional.
     * @param onError Callback made on error. Optional.
     */
    Create<T>( object: T, onSuccess?: DataProviderSuccessCallback<T>, onError?: ErrorCallback ): Promise<void>;

    /**
     * Attempts to read an object or objects from the data layer.
     * @param query The query used for object selection.
     * @param onSuccess Callback made on success. Optional.
     * @param onError Callback made on error. Optional.
     */
    Read<T>( query: DataProviderQuery<T>, onSuccess?: DataProviderSuccessCallback<T>, onError?: ErrorCallback ): Promise<void>;

    /**
     * Attempts to update an object or objects provided in the query.
     * @param query The query used for object selection.
     * @param onSuccess Callback made on success. Optional.
     * @param onError Callback made on error. Optional.
     */
    Update<T>( query: DataProviderQuery<T>, onSuccess?: DataProviderSuccessCallback<T>, onError?: ErrorCallback ): Promise<void>;

    /**
     * Attempts to delete an object or objects from the data layer using the provided query.
     * @param query The query used for object selection.
     * @param onSuccess Callback made on success. Optional.
     * @param onError Callback made on error. Optional.
     */
    Delete<T>( query: DataProviderQuery<T>, onSuccess?: DataProviderSuccessCallback<T>, onError?: ErrorCallback ): Promise<void>;
}

/**
 * Used to define a query selection type.
 */
export enum DataProviderQueryType {

    /** A single record. */
    FindOne,

    /** Multiple records */
    FindAll
}

/**
 * Used to identify data provider standard query fields.
 */
export enum DataProviderQueryField {

    /**
     * The object type field.
     */
    ObjectType = "objType",

    /**
     * The condition field.
     */
    Condition = "condition",

    /**
     * The ID field.
     */
    Id = "id",

    /**
     * The body of the request.
     */
    Body = "body"
}

/**
 * An object used to provide criteria for selection of update, read or delete operations.
 */
export class DataProviderQuery<T> {

    /** The type of selection. */
    public Type: DataProviderQueryType;

    /** Free-form parameters used for selection. */
    public Params: { [name: string]: any } = {};

    /**
     * Creates a new DataProviderQuery.
     * @param type The type of selection.
     */
    public constructor( type: DataProviderQueryType ) {
        this.Type = type;
    }
}

/**
 * A structure to hold error info for unsuccessful data provider operations.
 */
export class ErrorInfo {

    /**
     * The error code. Typically HTTP error codes such as 404 or 500.
     */
    public ErrorCode: number;

    /**
     * A free-text error message.
     */
    public ErrorMessage: string;

    /**
     * Any additional error information passed via callbacks or operation results.
     * Not always provided.
     */
    public InnerError?: Error;

    /**
     * Creates a new ErrorInfo structure.
     * @param code The error code. Typically HTTP error codes such as 404 or 500.
     * @param message A free-text error message.
     * @param innerError Any additional error information passed via callbacks or operation results. Optional
     */
    public constructor( code: number, message: string, innerError?: Error ) {
        this.ErrorCode = code;
        this.ErrorMessage = message;
        this.InnerError = innerError;
    }
}
