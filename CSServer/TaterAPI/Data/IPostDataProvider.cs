using System.Collections.Generic;
using TaterAPI.Models;

namespace TaterAPI.Data {

    /// <summary>
    /// Provides an interface for post data providers.
    /// </summary>
    public interface IPostDataProvider {

        /// <summary>
        /// Creates a new post.
        /// </summary>
        /// <param name="data">A reference to the post data to be created. Can be updated, such as with an new id.</param>
        /// <returns>True on success; otherwise false.</returns>
        bool Create( ref Post data );

        /// <summary>
        /// Reads and returns a post with the given id.
        /// </summary>
        /// <param name="id">The ID to search for.</param>
        /// <returns>The post if found; otherwise null.</returns>
        Post Read( string id );

        /// <summary>
        /// Reads and returns many records based on the provided criteria.
        /// </summary>
        /// <param name="criteria">The free-form criteria used to filter read records.</param>
        /// <returns>A collection of records which meet the provided criteria.</returns>
        IEnumerable<Post> ReadMany( IDictionary<string, object> criteria );

        /// <summary>
        /// Updates the given data the underlying data store.
        /// </summary>
        /// <param name="data">A reference to the data to be stored. Can be updated, such as with a new time stamp.</param>
        /// <returns>True on success; otherwise false.</returns>
        bool Update( ref Post data );

        /// <summary>
        /// Deletes the given post.
        /// </summary>
        /// <param name="data">The post to be deleted.</param>
        /// <returns>True on success; other wise false.</returns>
        bool Delete( Post data );
    }
}
