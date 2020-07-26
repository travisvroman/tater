import { Pipe, PipeTransform, DefaultIterableDiffer } from "@angular/core";

/**
 * A basic pipe which formats raw text into HTML. Note that this is far from
 * production ready, as it does not sanitize HTML input into it. This is merely
 * meant to serve as a light example as to a pipe's implementation.
 */
@Pipe( {
  name: "postContent"
} )
export class PostContentPipe implements PipeTransform {

  /**
   * Transforms the given value into HTML text. Used to format raw text stored in
   * a database into that which is usable by the front end for rendering.
   * @param value The value to be transformed.
   * @return The transformed string.
   */
  public transform( value: string ): string {
    return value.replace( /\r\n/g, "<br />" )
      .replace( /\n/g, "<br />" )
      .replace( /\[image\]/g, "<img src=\"" )
      .replace( /\[\/image\]/g, "\"/>" );
  }
}
