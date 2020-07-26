using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using TaterAPI.Models;

namespace TaterAPI.Data {

    /// <summary>
    /// The SQL database data provider for posts. Connection string is read from appsettings.json.
    /// </summary>
    public class SQLPostDataProvider : IPostDataProvider {

        private string connectionString;
        private ILogger logger;

        /// <summary>
        /// Creates a new SQL post data provider.
        /// </summary>
        /// <param name="configuration">The application configuration.</param>
        /// <param name="logger">The logger to be used for error trapping.</param>
        public SQLPostDataProvider( IConfiguration configuration, ILogger<SQLPostDataProvider> logger ) {
            connectionString = configuration.GetConnectionString( "Development" );
            this.logger = logger;
        }

        /// <summary>
        /// Creates a new post.
        /// </summary>
        /// <param name="data">A reference to the post data to be created. Can be updated, such as with an new id.</param>
        /// <returns>True on success; otherwise false.</returns>
        public bool Create( ref Post data ) {
            try {
                using( SqlConnection connection = new SqlConnection( connectionString ) ) {
                    connection.Open();
                    using( SqlTransaction transaction = connection.BeginTransaction() ) {
                        using( SqlCommand command = new SqlCommand( "CreatePost", connection, transaction ) ) {

                            data._id = Guid.NewGuid().ToString();

                            command.CommandType = System.Data.CommandType.StoredProcedure;
                            command.Parameters.AddWithValue( "@PostId", data._id );
                            command.Parameters.AddWithValue( "@Title", data.title );
                            command.Parameters.AddWithValue( "@Content", data.content );
                            command.Parameters.AddWithValue( "@Published", data.published );
                            command.Parameters.AddWithValue( "@CreatedAt", data.createdAt );
                            command.Parameters.AddWithValue( "@UpdatedAt", data.updatedAt );

                            command.ExecuteNonQuery();

                            transaction.Commit();

                            return true;
                        }
                    }
                }
            } catch( Exception ex ) {
                logger.LogError( "Error creating new post: " + ex.Message + Environment.NewLine + ex.StackTrace );
                return false;
            }
        }

        /// <summary>
        /// Reads and returns a post with the given id.
        /// </summary>
        /// <param name="id">The ID to search for.</param>
        /// <returns>The post if found; otherwise null.</returns>
        public Post Read( string id ) {
            try {
                using( SqlConnection connection = new SqlConnection( connectionString ) ) {
                    connection.Open();
                    using( SqlCommand command = new SqlCommand( "GetPostById", connection ) ) {
                        command.CommandType = System.Data.CommandType.StoredProcedure;
                        command.Parameters.AddWithValue( "@PostId", id );

                        var reader = command.ExecuteReader();

                        reader.Read();
                        string title = reader["Title"].ToString();
                        string content = reader["Content"].ToString();
                        bool published;

                        // NOTE: This is stored as a bit, so it will always be true/false. Therefore this should never fail,
                        // unless potentially if it is NULL, in which case just assume false.
                        if( !bool.TryParse( reader["Published"].ToString(), out published ) ) {
                            published = false;
                        }

                        DateTime createdAt = DateTime.Parse( reader["CreatedAt"].ToString() );
                        DateTime updatedAt = DateTime.Parse( reader["UpdatedAt"].ToString() );

                        return new Post( id, title, content, createdAt, updatedAt, published );
                    }
                }
            } catch( Exception ex ) {
                logger.LogError( "Error getting post: " + ex.Message + Environment.NewLine + ex.StackTrace );
                return null;
            }
        }

        /// <summary>
        /// Reads and returns many records based on the provided criteria.
        /// </summary>
        /// <param name="criteria">The free-form criteria used to filter read records.</param>
        /// <returns>A collection of records which meet the provided criteria.</returns>
        public IEnumerable<Post> ReadMany( IDictionary<string, object> criteria ) {
            try {
                using( SqlConnection connection = new SqlConnection( connectionString ) ) {
                    connection.Open();
                    using( SqlCommand command = new SqlCommand( "GetPosts", connection ) ) {
                        command.CommandType = System.Data.CommandType.StoredProcedure;
                        object searchTitle;
                        criteria.TryGetValue( "title", out searchTitle );
                        command.Parameters.AddWithValue( "@Title", searchTitle == null ? "" : searchTitle.ToString() );

                        var reader = command.ExecuteReader();

                        List<Post> posts = new List<Post>();
                        while( reader.Read() ) {
                            string id = reader["Id"].ToString();
                            string title = reader["Title"].ToString();
                            string content = "";
                            bool published;

                            // NOTE: This is stored as a bit, so it will always be true/false. Therefore this should never fail,
                            // unless potentially if it is NULL, in which case just assume false.
                            if( !bool.TryParse( reader["Published"].ToString(), out published ) ) {
                                published = false;
                            }

                            DateTime createdAt = DateTime.Parse( reader["CreatedAt"].ToString() );
                            DateTime updatedAt = DateTime.Parse( reader["UpdatedAt"].ToString() );

                            posts.Add( new Post( id, title, content, createdAt, updatedAt, published ) );
                        }
                        return posts;
                    }
                }
            } catch( Exception ex ) {
                logger.LogError( "Error getting posts: " + ex.Message + Environment.NewLine + ex.StackTrace );
                return null;
            }
        }

        /// <summary>
        /// Deletes the given post.
        /// </summary>
        /// <param name="data">The post to be deleted.</param>
        /// <returns>True on success; other wise false.</returns>
        public bool Update( ref Post data ) {
            try {
                using( SqlConnection connection = new SqlConnection( connectionString ) ) {
                    connection.Open();
                    using( SqlTransaction transaction = connection.BeginTransaction() ) {
                        using( SqlCommand command = new SqlCommand( "UpdatePost", connection, transaction ) ) {
                            command.CommandType = System.Data.CommandType.StoredProcedure;
                            command.Parameters.AddWithValue( "@PostId", data._id );
                            command.Parameters.AddWithValue( "@Title", data.title );
                            command.Parameters.AddWithValue( "@Content", data.content );
                            command.Parameters.AddWithValue( "@Published", data.published );
                            command.Parameters.AddWithValue( "@UpdatedAt", data.updatedAt );

                            command.ExecuteNonQuery();

                            transaction.Commit();

                            return true;
                        }
                    }
                }
            } catch( Exception ex ) {
                logger.LogError( "Error creating new post: " + ex.Message + Environment.NewLine + ex.StackTrace );
                return false;
            }
        }

        /// <summary>
        /// Updates the given data the underlying data store.
        /// </summary>
        /// <param name="data">A reference to the data to be stored. Can be updated, such as with a new time stamp.</param>
        /// <returns>True on success; otherwise false.</returns>
        public bool Delete( Post data ) {
            try {
                using( SqlConnection connection = new SqlConnection( connectionString ) ) {
                    connection.Open();
                    using( SqlTransaction transaction = connection.BeginTransaction() ) {
                        using( SqlCommand command = new SqlCommand( "DeletePost", connection, transaction ) ) {
                            command.CommandType = System.Data.CommandType.StoredProcedure;
                            command.Parameters.AddWithValue( "@PostId", data._id );

                            command.ExecuteNonQuery();

                            return true;
                        }
                    }
                }
            } catch( Exception ex ) {
                logger.LogError( "Error deleting post: " + ex.Message + Environment.NewLine + ex.StackTrace );
                return false;
            }
        }
    }
}


