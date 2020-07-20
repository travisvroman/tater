import { Component } from '@angular/core';

/**
 * The primary app component, used for the main page template.
 */
@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
} )
export class AppComponent {

  /**
   * The date year used to print the copyright message.
   */
  public dateYear: string = `${new Date().getFullYear()}`;
}
