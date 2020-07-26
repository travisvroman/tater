using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using TaterAPI.Data;
using TaterAPI.Models;

namespace TaterAPI.Tests {

    /// <summary>
    /// Performs various tests against the post controller. Utilizes an in-memory data provider
    /// so these tests may be run without a database hookup.
    /// </summary>
    [TestClass]
    public class PostControllerTests {

        // The post controller to be tested.
        private PostsController controller;

        // A copy of the posts stored in the data provider.
        private Dictionary<string, Post> _posts;

        /// <summary>
        /// Executed before every test.
        /// </summary>
        [TestInitialize]
        public void OnBeforeTest() {

            // Create a controller with an in-memory data provider for testing.
            InMemoryPostDataProvider provider = new InMemoryPostDataProvider();
            controller = new PostsController( provider );

            // Use reflection to get a copy of the internal posts. This allows verification during the assertion phase of tests.
            Type providerType = typeof( InMemoryPostDataProvider );
            FieldInfo field = providerType.GetField( "_posts", BindingFlags.NonPublic | BindingFlags.Instance );
            _posts = (Dictionary<string, Post>)field.GetValue( provider );
        }

        /// <summary>
        /// Attempt to get a post by id.
        /// </summary>
        [TestMethod]
        public void TestGetPostById() {

            // Grab the first post and get it by its id. All the properties should be a match.
            Post firstPost = _posts.First().Value;
            string postJson = controller.GetById( firstPost._id );

            // Ensure the response string exists and contains content.
            Assert.IsFalse( string.IsNullOrEmpty( postJson ) );

            Post post = JsonConvert.DeserializeObject<Post>( postJson );

            // Assert that the post exists and all properties are valid.
            Assert.IsNotNull( post );
            Assert.AreEqual( post._id, firstPost._id );
            Assert.AreEqual( post.title, firstPost.title );
            Assert.AreEqual( post.content, firstPost.content );
            Assert.AreEqual( post.createdAt, firstPost.createdAt );
            Assert.AreEqual( post.updatedAt, firstPost.updatedAt );
            Assert.AreEqual( post.published, firstPost.published );
        }

        /// <summary>
        /// Attempts to get all posts in the system.
        /// </summary>
        [TestMethod]
        public void GetAllPosts() {
            string postsJson = controller.GetByTitle( "" );

            // Ensure the response string exists and contains content.
            Assert.IsFalse( string.IsNullOrEmpty( postsJson ) );

            List<Post> posts = JsonConvert.DeserializeObject<List<Post>>( postsJson );

            // Should be exactly 3 posts. May want to verify their contents by looping through.
            Assert.AreEqual( posts.Count, 3 );
        }

        /// <summary>
        /// Attempts to get matching posts in the system with titles that contain "My".
        /// </summary>
        [TestMethod]
        public void GetMatchingTitlePosts() {
            string postsJson = controller.GetByTitle( "My" );

            // Ensure the response string exists and contains content.
            Assert.IsFalse( string.IsNullOrEmpty( postsJson ) );

            List<Post> posts = JsonConvert.DeserializeObject<List<Post>>( postsJson );

            // Should be exactly 1 post containing the word "My". May want to verify their contents by looping through.
            Assert.AreEqual( posts.Count, 1 );
        }

        /// <summary>
        /// Create a new post in the system and verify its integrity.
        /// </summary>
        [TestMethod]
        public void CreateAndVerifyPost() {
            Post newPost = new Post( Guid.NewGuid().ToString(), "New Post title 4", "Post content 4", DateTime.UtcNow, DateTime.UtcNow, true );

            Post createdPost = controller.CreatePost( newPost );
            Assert.IsNotNull( createdPost );

            // Asset fields are correct.
            Assert.AreEqual( createdPost._id, newPost._id );
            Assert.AreEqual( createdPost.title, newPost.title );
            Assert.AreEqual( createdPost.content, newPost.content );
            Assert.AreEqual( createdPost.createdAt, newPost.createdAt );
            Assert.AreEqual( createdPost.updatedAt, newPost.updatedAt );
            Assert.AreEqual( createdPost.published, newPost.published );

            // Now get all posts and verify that there are 4.
            string postsJson = controller.GetByTitle( "" );
            Assert.IsFalse( string.IsNullOrEmpty( postsJson ) );
            List<Post> posts = JsonConvert.DeserializeObject<List<Post>>( postsJson );
            Assert.AreEqual( posts.Count, 4 );

            // Only get posts with a title containing "New". This should only be 1.
            postsJson = controller.GetByTitle( "New" );
            Assert.IsFalse( string.IsNullOrEmpty( postsJson ) );
            posts = JsonConvert.DeserializeObject<List<Post>>( postsJson );
            Assert.AreEqual( posts.Count, 1 );

            // Finally, get the post by id and verify it matches.
            string postJson = controller.GetById( newPost._id );
            Assert.IsFalse( string.IsNullOrEmpty( postJson ) );
            Post post = JsonConvert.DeserializeObject<Post>( postJson );
            Assert.IsNotNull( post );
            Assert.AreEqual( post._id, newPost._id );
            Assert.AreEqual( post.title, newPost.title );
            Assert.AreEqual( post.content, newPost.content );
            Assert.AreEqual( post.createdAt, newPost.createdAt );
            Assert.AreEqual( post.updatedAt, newPost.updatedAt );
            Assert.AreEqual( post.published, newPost.published );
        }

        /// <summary>
        /// Updates a post, then retrieves it, ensuring the updated values are in place.
        /// </summary>
        [TestMethod]
        public void UpdateAndVerifyPost() {

            // Get a post to edit. The first in the list is fine.
            string postJson = controller.GetById( _posts.First().Value._id );
            Assert.IsFalse( string.IsNullOrEmpty( postJson ) );
            Post post = JsonConvert.DeserializeObject<Post>( postJson );

            // Change up some properties.
            post.title = "Edited post title";
            post.content = "This post has been edited.";
            post.published = false;
            post.updatedAt = DateTime.UtcNow;

            // Send the updated post back to the system.
            Post returned = controller.Update( post._id, post );
            Assert.IsNotNull( returned );

            // Get the post again and verify its contents.
            postJson = controller.GetById( _posts.First().Value._id );
            Assert.IsFalse( string.IsNullOrEmpty( postJson ) );
            Post updatedPost = JsonConvert.DeserializeObject<Post>( postJson );

            Assert.IsNotNull( post );
            Assert.AreEqual( updatedPost._id, post._id );
            Assert.AreEqual( updatedPost.title, post.title );
            Assert.AreEqual( updatedPost.content, post.content );
            Assert.AreEqual( updatedPost.updatedAt, post.updatedAt );
            Assert.AreEqual( updatedPost.published, post.published );
        }
    }
}
