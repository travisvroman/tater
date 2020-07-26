using System;
using System.Collections.Generic;
using System.Linq;
using TaterAPI.Models;

namespace TaterAPI.Data {

    /// <summary>
    /// A simple in-memory data provider for posts. Allows testing without
    /// requiring a database connection.
    /// </summary>
    public class InMemoryPostDataProvider : IPostDataProvider {

        // A private dictionary in which entries are kept.
        private Dictionary<string, Post> _posts = new Dictionary<string, Post>();

        /// <summary>
        /// Creates a new in-memory post data provider.
        /// </summary>
        public InMemoryPostDataProvider() {
            Post post1 = new Post( "5f139a92ab4c7071b426bae2", "My Test Post Title 1", "Test post content 1", DateTime.Parse( "2020-07-19T00:58:01.870Z" ), DateTime.Parse( "2020-07-20T01:12:43.390Z" ), true );
            _posts.Add( post1._id, post1 );

            Post post2 = new Post( "5f139b00ab4c7071b426bae3", "Test Post Title 2", "Test post content 2", DateTime.Parse( "2020-07-19T00:59:44.218Z" ), DateTime.Parse( "2020-07-20T01:09:31.764Z" ), true );
            _posts.Add( post2._id, post2 );

            Post post3 = new Post( "5f139b64ab4c7071b426bae5", "Test Post Title 3", "Test post content 3", DateTime.Parse( "2020-07-19T01:01:24.515Z" ), DateTime.Parse( "2020-07-20T01:27:19.974Z" ), true );
            _posts.Add( post3._id, post3 );
        }

        /// <summary>
        /// Creates a new post.
        /// </summary>
        /// <param name="data">A reference to the post data to be created. Can be updated, such as with an new id.</param>
        /// <returns>True on success; otherwise false.</returns>
        public bool Create( ref Post data ) {
            string newId = Guid.NewGuid().ToString();

            // Create the post if not found.
            if( !_posts.TryGetValue( newId, out Post foundPost ) ) {
                data._id = newId;
                _posts[newId] = data;
                return true;
            }
            return false;
        }

        /// <summary>
        /// Reads and returns a post with the given id.
        /// </summary>
        /// <param name="id">The ID to search for.</param>
        /// <returns>The post if found; otherwise null.</returns>
        public Post Read( string id ) {
            if( _posts.ContainsKey( id ) ) {
                return _posts[id];
            }

            return null;
        }

        /// <summary>
        /// Reads and returns many records based on the provided criteria.
        /// </summary>
        /// <param name="criteria">The free-form criteria used to filter read records.</param>
        /// <returns>A collection of records which meet the provided criteria.</returns>
        public IEnumerable<Post> ReadMany( IDictionary<string, object> criteria ) {
            if( criteria["title"] != null ) {
                return _posts.Values.Where(
                    x => x.title.Contains( criteria["title"].ToString(), StringComparison.OrdinalIgnoreCase ) );
            }
            return _posts.Values;
        }

        /// <summary>
        /// Updates the given data the underlying data store.
        /// </summary>
        /// <param name="data">A reference to the data to be stored. Can be updated, such as with a new time stamp.</param>
        /// <returns>True on success; otherwise false.</returns>
        public bool Update( ref Post data ) {
            if( _posts[data._id] != null ) {
                _posts[data._id] = data;
                return true;
            }

            return false;
        }

        /// <summary>
        /// Deletes the given post.
        /// </summary>
        /// <param name="data">The post to be deleted.</param>
        /// <returns>True on success; other wise false.</returns>
        public bool Delete( Post data ) {

            if( _posts.ContainsKey( data._id ) ) {
                _posts[data._id] = null;
                return true;
            }

            return false;
        }
    }
}
