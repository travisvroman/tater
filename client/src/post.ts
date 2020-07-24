
/**
 * Represents a post in the system.
 */
export interface Post {

    _id: string;

    /**
     * The title of the post.
     */
    title: string;

    /**
     * The content of the post.
     */
    content: string;

    /**
     * Indicates if the post has been published.
     */
    published: boolean;
}
