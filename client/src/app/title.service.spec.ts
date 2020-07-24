import { TestBed } from "@angular/core/testing";

import { TitleService } from "./title.service";

/**
 * Contains the tests for the title service.
 */
describe( "TitleService", () => {
  let service: TitleService;

  /**
   * Setup performed before each test.
   */
  beforeEach( () => {
    TestBed.configureTestingModule( {} );
    service = TestBed.inject( TitleService );
  } );

  /**
   * Verify that the service gets created.
   */
  it( "should be created", () => {
    expect( service ).toBeTruthy();
  } );

  /**
   * Change the document title and verify the title was updated.
   */
  it( "should change document title", () => {
    const testTitle: string = "TEST_TITLE";
    service.setTitle( testTitle );
    expect( document.title ).toEqual( testTitle );
  } );
} );
