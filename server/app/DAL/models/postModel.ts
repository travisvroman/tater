import mongoose from "mongoose"
import { Post } from "../../models/post.model";

/**
 * Represents a post document (record).
 */
export class PostDocument extends mongoose.Document {
    title: string;
    content: string;
    published: boolean;
    createdAt?: Date;
    updatedAt?: Date;

    /**
     * Creates a new PostDocument.
     * 
     * @param post The post to create from.
     * @param createdAt The time created.
     * @param updatedAt The time updated.
     */
    public constructor( post: Post, createdAt?: Date, updatedAt?: Date ) {
        super();

        this.title = post.title;
        this.content = post.content;
        this.published = post.published;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

/**
 * Represents the model used for CRUD operations for a post.
 */
export interface PostModel extends mongoose.Model<PostDocument> { };