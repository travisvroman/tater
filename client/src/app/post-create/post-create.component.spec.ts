import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PostCreateComponent } from "./post-create.component";
import { PostService } from '../post.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe( "PostCreateComponent", () => {
  let service: PostService;
  let component: PostCreateComponent;
  let httpMock: HttpTestingController;
  let fixture: ComponentFixture<PostCreateComponent>;

  beforeEach( async( () => {
    TestBed.configureTestingModule( {
      declarations: [PostCreateComponent],
      imports: [HttpClientTestingModule, RouterModule.forRoot( [] ), FormsModule]
    } )
      .compileComponents();

    // Inject services/providers.
    service = TestBed.inject( PostService );
    httpMock = TestBed.get( HttpTestingController );
  } ) );

  beforeEach( () => {
    fixture = TestBed.createComponent( PostCreateComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  } );

  it( "should create", () => {
    expect( component ).toBeTruthy();
  } );
} );
