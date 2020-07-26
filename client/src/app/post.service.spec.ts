import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

import { PostService } from "./post.service";
import { Post } from "src/post";

/**
 * Contains tests for the post service.
 */
describe( "PostService", () => {
  let service: PostService;
  let httpMock: HttpTestingController;
  let testPosts: any[];

  /**
   * Setup performed before each test.
   */
  beforeEach( () => {
    TestBed.configureTestingModule( {
      imports: [HttpClientTestingModule]
    } );

    // Inject services/providers
    service = TestBed.inject( PostService );
    httpMock = TestBed.inject( HttpTestingController );

    // Setup test post data.
    testPosts = [
      {
        published: true,
        _id: "5f139a92ab4c7071b426bae2",
        title: "My Test Post Title 1",
        content: "Test post content 1",
        createdAt: "2020-07-19T00:58:01.870Z",
        updatedAt: "2020-07-20T01:12:43.390Z",
        __v: 0
      },
      {
        published: true,
        _id: "5f139b00ab4c7071b426bae3",
        title: "Test Post Title 2",
        content: "Test post content 2",
        createdAt: "2020-07-19T00:59:44.218Z",
        updatedAt: "2020-07-20T01:09:31.764Z",
        __v: 0
      },
      {
        published: false,
        _id: "5f139b64ab4c7071b426bae5",
        title: "Test Post Title 3",
        content: "Test post content 3",
        createdAt: "2020-07-19T01:01:24.515Z",
        updatedAt: "2020-07-20T01:27:19.974Z",
        __v: 0
      },
    ];
  } );

  /**
   * Ensure successful creation.
   */
  it( "should be created", () => {
    expect( service ).toBeTruthy();
  } );

  /**
   * Obtain all blog posts from the mock system.
   */
  it( "should get all blog posts", () => {
    service.getAllPosts().subscribe( ( posts: Post[] ) => {
      expect( posts.length ).toBe( 3 );
      for ( let i = 0; i < posts.length; ++i ) {
        expect( posts[i].title ).toBe( testPosts[i].title );
        expect( posts[i].content ).toBe( testPosts[i].content );
      }
    }, () => { }, () => { } );

    const request = httpMock.expectOne( "http://localhost:8080/api/posts?title=", "call to API" );
    expect( request.request.method ).toBe( "GET" );

    request.flush( testPosts );

    httpMock.verify();
  } );

  /**
   * Obtain all blog posts with titles containing the given string.
   */
  it( "should get all blog posts containing string", () => {
    const searchTerm: string = "My";
    service.getAllPostsWithTitle( searchTerm ).subscribe( ( posts: Post[] ) => {

      // Should only return the first post.
      expect( posts.length ).toBe( 1 );
      expect( posts[0].title ).toBe( testPosts[0].title );
      expect( posts[0].content ).toBe( testPosts[0].content );
    }, () => { }, () => { } );

    const request = httpMock.expectOne( `http://localhost:8080/api/posts?title=${searchTerm}`, "call to API" );
    expect( request.request.method ).toBe( "GET" );

    // Filter the posts by ones with a title containing the search term.
    request.flush( testPosts.filter( x => x.title.indexOf( searchTerm ) !== -1 ) );

    httpMock.verify();
  } );

  /**
   * Obtain all blog posts with titles containing the given string.
   */
  it( "should get single post with matching id", () => {

    // Id of second post.
    const postId: string = "5f139b00ab4c7071b426bae3";
    service.getPostById( postId ).subscribe( ( post: Post ) => {

      // Should only return the first post.
      expect( post ).toBeDefined();
      expect( post.title ).toBe( testPosts[1].title );
      expect( post.content ).toBe( testPosts[1].content );
    }, () => { }, () => { } );

    const request = httpMock.expectOne( "http://localhost:8080/api/posts/" + postId, "call to API" );
    expect( request.request.method ).toBe( "GET" );

    // Return the post with the matching id. Should return the second post.
    request.flush( testPosts.filter( x => x._id === postId )[0] );

    httpMock.verify();
  } );

  /**
   * Attempt to obtain a post with an invalid id.
   */
  it( "should return error", () => {

    // Id of second post.
    const postId: string = "12345";
    service.getPostById( postId ).subscribe( ( error: any ) => {

      // Should only return the first post.
      expect( error.message ).toBe( "Error retrieving post id: " + postId );
    }, () => { }, () => { } );

    const request = httpMock.expectOne( "http://localhost:8080/api/posts/" + postId, "call to API" );
    expect( request.request.method ).toBe( "GET" );

    // Return an error object.
    request.flush( {
      message: "Error retrieving post id: 12345",
      innerError: {
        stringValue: "\"12345\"",
        kind: "ObjectId",
        value: "12345",
        path: "_id",
        reason: {}
      }
    } );

    httpMock.verify();
  } );

  /**
   * Create a new post
   */
  it( "should create post", () => {

    // The post id which will be "generated" by the server.
    const newPostId: string = "5f1a2588f8baa8a18c7d1b91";

    // Create a new post to be submitted.
    const newPost: Post = {

      // id is generated by server, so pass undefined.
      _id: undefined,
      title: "My test post #8",
      content: "Post content 8",
      published: false
    };

    // Create the post.
    service.createPost( newPost ).subscribe( ( post: Post ) => {

      // Should return newly created post.
      expect( post._id ).toBe( newPostId );
      expect( post.content ).toBe( newPost.content );
      expect( post.title ).toBe( newPost.title );
    }, () => { }, () => { } );

    const request = httpMock.expectOne( "http://localhost:8080/api/posts", "call to API" );
    expect( request.request.method ).toBe( "POST" );

    // Return the value of a newly created post.
    request.flush( {
      published: false,
      _id: newPostId,
      title: newPost.title,
      content: newPost.content,
      createdAt: "2020-07-24T00:04:24.023Z",
      updatedAt: "2020-07-24T00:04:24.023Z",
      __v: 0
    } );

    httpMock.verify();
  } );

  /**
   * Update an existing post title and content, as well as flip published flag to true.
   */
  it( "should create post", () => {

    const postData: Post = {

      // id of the post to be updated
      _id: "5f139b64ab4c7071b426bae5",
      title: "My Test Post Title 1",
      content: "Test post content 1",
      published: true
    };

    // Post the update.
    service.updatePost( postData ).subscribe( ( post: Post ) => {

      // Should return updated post.
      expect( post._id ).toBe( postData._id );
      expect( post.content ).toBe( postData.content );
      expect( post.title ).toBe( postData.title );
      expect( post.published ).toBeTrue();
    }, () => { }, () => { } );

    const request = httpMock.expectOne( "http://localhost:8080/api/posts/" + postData._id, "call to API" );
    expect( request.request.method ).toBe( "PUT" );

    // Return the value of a updated post.
    request.flush( {
      published: postData.published,
      _id: postData._id,
      title: postData.title,
      content: postData.content,
      createdAt: "2020-07-24T00:04:24.023Z",
      updatedAt: "2020-07-24T00:04:24.023Z",
      __v: 0
    } );

    httpMock.verify();
  } );

} );
