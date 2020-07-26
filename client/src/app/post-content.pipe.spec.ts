import { PostContentPipe } from "./post-content.pipe";
import { pipe } from "rxjs";

/**
 * Contains basic tests for the post content pipe.
 */
describe( "PostContentPipe", () => {

  // The content pipe used for all tests.
  let postContentPipe: PostContentPipe;

  /**
   * Basic setup
   */
  beforeAll( () => {
    postContentPipe = new PostContentPipe();
    expect( pipe ).toBeTruthy();
  } );

  /**
   * Ensures that content token replacements are performed on a provided string,
   * such as newline and image tag replacements (e.g. [image]url[/image] => <img src="url" />).
   */
  it( "perform content text token replacements", () => {

    const source: string = "Some text\n\n[image]https://picsum.photos/200[/image]\n\nSome additional sample text here.";
    const expected: string = "Some text<br /><br /><img src=\"https://picsum.photos/200\"/><br /><br />Some additional sample text here.";

    expect( postContentPipe.transform( source ) ).toBe( expected );
  } );
} );
