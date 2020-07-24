import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PostEditComponent } from "./post-edit.component";
import { PostService } from '../post.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { Post } from 'src/post';
import { Router } from "@angular/router";
import { Location } from '@angular/common';

describe( "PostEditComponent", () => {
  let service: PostService;
  let component: PostEditComponent;
  let httpMock: HttpTestingController;
  let fixture: ComponentFixture<PostEditComponent>;
  let location: Location;
  let router: Router;

  let post: Post;

  beforeEach( async( () => {
    TestBed.configureTestingModule( {
      declarations: [PostEditComponent],
      imports: [HttpClientTestingModule, RouterModule.forRoot( [] )]
    } )
      .compileComponents();
  } ) );

  beforeEach( () => {
    fixture = TestBed.createComponent( PostEditComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Inject services/providers.
    service = TestBed.inject( PostService );
    httpMock = TestBed.get( HttpTestingController );

    // Routing
    router = TestBed.get( Router );
    location = TestBed.get( Location );

    // The test post data to be returned from the mock server.
    post = {
      "published": true,
      "_id": "5f139a92ab4c7071b426bae2",
      "title": "My Test Post Title 1",
      "content": "Test post content 1",
    };
  } );

  /**
   * Verify successful component creation.
   */
  it( "should create", () => {
    expect( component ).toBeTruthy();
  } );

  /**
   * Verify that the form populates properly.
   */
  it( "should populate form", () => {

    // Perform proper routing, then verify form.
    router.navigate( ["edit/5f139a92ab4c7071b426bae2"] ).then( () => {

      // The mock request to display some test posts.
      const request = httpMock.expectOne( "http://localhost:8080/api/posts/5f139a92ab4c7071b426bae2", "Request for Post" );
      expect( request.request.method ).toBe( "GET" );

      // Return the test posts.
      request.flush( post );
      httpMock.verify();

      // Make sure the posts are displayed as expected.
      fixture.detectChanges();
      fixture.whenRenderingDone().then( () => {
        const compiled = fixture.nativeElement;
        expect( compiled.querySelector( "#title" ).value ).toBe( post.title );
        expect( compiled.querySelector( "#content" ).value ).toBe( post.content );
        expect( compiled.querySelector( "#published" ).checked ).toBeTruthy();
      } );
    } );
  } );
} );
