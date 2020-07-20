import { Pipe, PipeTransform, DefaultIterableDiffer } from '@angular/core';

@Pipe( {
  name: 'postContent'
} )
export class PostContentPipe implements PipeTransform {

  transform( value: string ): string {
    return value.replace( /\r\n/g, "<br />" )
      .replace( /\n/g, "<br />" )
      .replace( /\[image\]/g, "<image src=\"" )
      .replace( /\[\/image\]/g, "\"/>" );
  }
}
