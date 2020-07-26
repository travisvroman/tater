
/**
 * Represents a single post in the system.
 */
export class Post {
    /**
     * The title of the post.
     */
    public title: string;

    /**
     * The content of the post.
     */
    public content: string;

    /**
     * Indicates if the post has been published.
     */
    public published: boolean;

    /**
     * Creates a new post object.
     * @param title The title of the post.
     * @param content The content of the post.
     * @param published Indicates if the post has been published.
     */
    public constructor( title: string, content: string, published: boolean ) {
        this.title = title;
        this.content = content;
        this.published = published;
    }
}
