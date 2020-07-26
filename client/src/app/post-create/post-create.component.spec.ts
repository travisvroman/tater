import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PostCreateComponent } from "./post-create.component";
import { PostService } from "../post.service";
import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

/**
 * Tests for the create component.
 */
describe( "PostCreateComponent", () => {
  let service: PostService;
  let component: PostCreateComponent;
  let httpMock: HttpTestingController;
  let fixture: ComponentFixture<PostCreateComponent>;

  /**
   * Prep done before each test (async)
   */
  beforeEach( async( () => {
    TestBed.configureTestingModule( {
      declarations: [PostCreateComponent],
      imports: [HttpClientTestingModule, RouterModule.forRoot( [] ), FormsModule]
    } )
      .compileComponents();

    // Inject services/providers.
    service = TestBed.inject( PostService );
    httpMock = TestBed.inject( HttpTestingController );
  } ) );

  /**
   * Prep done before each test (sync)
   */
  beforeEach( () => {
    fixture = TestBed.createComponent( PostCreateComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  } );

  it( "should create", () => {
    expect( component ).toBeTruthy();
  } );
} );
