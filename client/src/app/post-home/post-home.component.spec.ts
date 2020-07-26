import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PostHomeComponent } from "./post-home.component";
import { PostService } from "../post.service";
import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterModule } from "@angular/router";

/**
 * Tests for the home page component.
 */
describe( "PostHomeComponent", () => {
  let service: PostService;
  let component: PostHomeComponent;
  let httpMock: HttpTestingController;
  let fixture: ComponentFixture<PostHomeComponent>;
  let testPosts: any[];

  /**
   * Initial setup (async).
   */
  beforeEach( async( () => {
    TestBed.configureTestingModule( {
      declarations: [PostHomeComponent],
      imports: [HttpClientTestingModule, RouterModule.forRoot( [] )]
    } )
      .compileComponents();
  } ) );

  /**
   * Initial setup (synchronous)
   */
  beforeEach( () => {
    fixture = TestBed.createComponent( PostHomeComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Inject services/providers.
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
   * Verify successful creation.
   */
  it( "should create", () => {
    expect( component ).toBeTruthy();
  } );

  /**
   * Make sure that exactly 3 posts are displayed, as returned from the mock server.
   */
  it( "should display 3 posts", () => {

    // The mock request to display some test posts.
    const request = httpMock.expectOne( "http://localhost:8080/api/posts?title=", "call to API" );
    expect( request.request.method ).toBe( "GET" );

    // Return the test posts.
    request.flush( testPosts );
    httpMock.verify();

    // Make sure the posts are displayed as expected.
    fixture.detectChanges();
    fixture.whenRenderingDone().then( () => {
      const compiled = fixture.nativeElement;
      expect( compiled.querySelectorAll( ".post-title" ).length ).toBe( 3 );
    } );

  } );
} );
