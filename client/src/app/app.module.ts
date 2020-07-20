import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostHomeComponent } from './post-home/post-home.component';
import { PostViewComponent } from './post-view/post-view.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostContentPipe } from './post-content.pipe';

/**
 * The main app module.
 */
@NgModule({
  declarations: [
    AppComponent,
    PostHomeComponent,
    PostViewComponent,
    PostCreateComponent,
    PostEditComponent,
    PostContentPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,

    // Main routing for application.
    RouterModule.forRoot([
      { path: "", component: PostHomeComponent },
      { path: "posts/:_id", component: PostViewComponent },
      { path: "create", component: PostCreateComponent },
      { path: "edit/:_id", component: PostEditComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
