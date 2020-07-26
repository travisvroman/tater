using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using TaterAPI.Data;
using TaterAPI.Models;

namespace TaterAPI {

    /// <summary>
    /// A controller to handle posts.
    /// </summary>
    [Route( "api/[controller]" )]
    public class PostsController : ControllerBase {

        // Injected data provider which performs the actual CRUD operations.
        IPostDataProvider postDataProvider;

        /// <summary>
        /// Creates a new post controller.
        /// </summary>
        /// <param name="postDataProvider">A post data provider, injected by the startup.</param>
        public PostsController( IPostDataProvider postDataProvider ) {
            this.postDataProvider = postDataProvider;
        }

        /// <summary>
        /// Gets posts by title, or all posts. GET: api/<controller> or api/<controller>?title=Search
        /// </summary>
        /// <param name="title">Title to search for. Optional. Default: ""</param>
        /// <returns>The content of the matching posts, in JSON string format.</returns>
        [HttpGet]
        public string GetByTitle( string title = "" ) {

            // Build the search criteria.
            Dictionary<string, object> criteria = new Dictionary<string, object>();
            criteria.Add( "title", title );

            // Obtain the list.
            IEnumerable<Post> posts = postDataProvider.ReadMany( criteria );

            // Serialize and return the matches.
            return JsonConvert.SerializeObject( posts );
        }

        /// <summary>
        /// Gets a post by id. GET: api/<controller>/post-id
        /// </summary>
        /// <param name="id">The post id</param>
        /// <returns>The post id found, otherwise null.</returns>
        [HttpGet( "{id}" )]
        public string GetById( string id ) {
            Post foundPost = postDataProvider.Read( id );
            if( foundPost != null ) {
                return JsonConvert.SerializeObject( foundPost );
            } else {
                return null;
            }
        }

        /// <summary>
        /// Creates a new post. POST api/<controller>
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        [HttpPost]
        public Post CreatePost( [FromBody]Post value ) {
            // Create and return 
            if( value != null ) {
                value.createdAt = DateTime.UtcNow;
                value.updatedAt = DateTime.UtcNow;
                postDataProvider.Create( ref value );
                return value;
            }

            return null;
        }

        /// <summary>
        /// Updates a post by id. PUT api/<controller>/5=post-id
        /// </summary>
        /// <param name="id">The post id.</param>
        /// <param name="value">Submitted form data, deserialized to a post.</param>
        /// <returns>A copy of the updated post.</returns>
        [HttpPut( "{id}" )]
        public Post Update( string id, [FromBody]Post value ) {
            if( value != null ) {

                value.updatedAt = DateTime.UtcNow;
                if( !postDataProvider.Update( ref value ) ) {
                    throw new Exception( "Error updating post!" );
                }

                return value;
            }

            return null;
        }

        /// <summary>
        /// Deletes a post by id. DELETE api/<controller>/5
        /// </summary>
        /// <param name="id">The post id to delete.</param>
        [HttpDelete( "{id}" )]
        public void Delete( string id ) {

            Post post = postDataProvider.Read( id );
            if( post != null ) {
                if( !postDataProvider.Delete( post ) ) {
                    throw new Exception( "Unable to delete post id: " + id );
                }
            } else {
                throw new Exception( "Unable to delete post id: " + id );
            }
        }
    }
}
