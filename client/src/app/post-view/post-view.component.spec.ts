import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

import { PostService } from "../post.service";
import { PostViewComponent } from "./post-view.component";
import { RouterModule } from "@angular/router";

describe( "PostViewComponent", () => {
  let service: PostService;
  let component: PostViewComponent;
  let httpMock: HttpTestingController;
  let fixture: ComponentFixture<PostViewComponent>;

  beforeEach( async( () => {
    TestBed.configureTestingModule( {
      declarations: [PostViewComponent],
      imports: [HttpClientTestingModule, RouterModule.forRoot([])]
    } )
      .compileComponents();
  } ) );

  beforeEach( () => {
    fixture = TestBed.createComponent( PostViewComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Inject services/providers.
    service = TestBed.inject( PostService );
    httpMock = TestBed.inject( HttpTestingController );
  } );

  it( "should create", () => {
    expect( component ).toBeTruthy();
  } );
} );
