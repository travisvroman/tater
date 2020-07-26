using System;

namespace TaterAPI.Models {

    /// <summary>
    /// Represents a post in the system.
    /// </summary>
    public class Post {

        /// <summary>
        /// The unique identifier for this post.
        /// </summary>
        public string _id { get; set; }

        /// <summary>
        /// The title of this post.
        /// </summary>
        public string title { get; set; }

        /// <summary>
        /// The content of this post.
        /// </summary>
        public string content { get; set; }

        /// <summary>
        /// Indicates if this post has been published.
        /// </summary>
        public bool published { get; set; }

        /// <summary>
        /// When this post was created.
        /// </summary>
        public DateTime createdAt { get; set; }

        /// <summary>
        /// When this post was last updated.
        /// </summary>
        public DateTime updatedAt { get; set; }

        /// <summary>
        /// Creates a new post. Should only be used for serialization.
        /// </summary>
        public Post() { }

        /// <summary>
        /// Creates a new post without a given id. Typically used when creating a new post.
        /// </summary>
        /// <param name="title">The post title.</param>
        /// <param name="content">The post content.</param>
        /// <param name="published">Indicates whether the post is published.</param>
        public Post( string title, string content, bool published = false ) {
            _id = null;
            this.title = title;
            this.content = content;
            this.published = published;
        }

        /// <summary>
        /// Creates a new post with a given id. Typically used when loading an existing item.
        /// </summary>
        /// <param name="id">The unique post identifier.</param>
        /// <param name="title">The post title.</param>
        /// <param name="content">The post content.</param>
        /// <param name="createdAt">When this post was created.</param>
        /// <param name="updatedAt">When this post was last updated.</param>
        /// <param name="published">Indicates whether the post is published.</param>
        public Post( string id, string title, string content, DateTime createdAt, DateTime updatedAt, bool published = false ) {
            _id = id;
            this.title = title;
            this.content = content;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
            this.published = published;
        }
    }
}
