import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";

/**
 * Tests for the outer application component.
 */
describe( "AppComponent", () => {
  beforeEach( async( () => {
    TestBed.configureTestingModule( {
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    } ).compileComponents();
  } ) );

  /**
   * Successful creation.
   */
  it( "should create the app", () => {
    const fixture = TestBed.createComponent( AppComponent );
    const app = fixture.componentInstance;
    expect( app ).toBeTruthy();
  } );

  /**
   * Check that the title is correct.
   */
  it( `should have as title "TATER"`, () => {
    const fixture = TestBed.createComponent( AppComponent );
    const app = fixture.componentInstance;
    expect( app.title ).toEqual( "TATER" );
  } );

  /**
   * Check that the title renders.
   */
  it( "should render title", () => {
    const fixture = TestBed.createComponent( AppComponent );
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect( compiled.querySelector( "#titleText" ).textContent ).toContain( "TATER" );
  } );
} );
