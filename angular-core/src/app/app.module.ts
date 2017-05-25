import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from "angular2-google-maps/core";
import { AppComponent } from './app.component';
import { GetweatherService } from './services/getweather.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCwHezlGAAOhqxlzOnTnoJUaX27cGh1Icw",
      libraries: ["places"]
    }),
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [GetweatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
