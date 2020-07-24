import { Injectable } from "@angular/core";

/**
 * A simple service responsible for updating the page title from
 * anywhere within the application.
 */
@Injectable( {
  providedIn: "root"
} )
export class TitleService {

  /**
   * Creates a new TitleService.
   */
  public constructor() {
  }

  /**
   * Sets the page title.
   * @param title The title to be set.
   */
  public setTitle( title: string ): void {
    document.title = title;
  }
}
