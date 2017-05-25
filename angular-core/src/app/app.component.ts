import { Component,ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import {} from '@types/googlemaps';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { GetweatherService } from './services/getweather.service';

declare var google: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public data: any;
  public icon: any;
  public name: any;
  public add: any;
  public edited :boolean= false;
  public visible :boolean= false;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  @ViewChild("map")
  public mapElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private getweatherService: GetweatherService
  ) {}     

  ngOnInit() { 
    this.zoom = 7;
    this.latitude = 6.927078600000002;
    this.longitude = 79.86124300000006;
    
    this.searchControl = new FormControl();

    this.setCurrentPosition();

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);      
     
      autocomplete.addListener("place_changed", () => {
        this.edited = true;
        console.log(this.searchElementRef.nativeElement.value);      

        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          console.log(place.geometry.location.lat());
          console.log(place.geometry.location.lng());
         
          if (place.geometry === undefined || place.geometry === null) {
            alert("No available location found!");
            return;
          }
          
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 15;

          var address = '';
          if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || ''),
              (place.address_components[3] && place.address_components[3].short_name || ''),
              (place.address_components[4] && place.address_components[4].short_name || '')
            ].join(' ');
          }
         
          this.icon= place.icon;
          this.name= place.address_components[1] && place.address_components[1].short_name || '';
          this.add= address;

          var coords = {
            'lat' : place.geometry.location.lat(),
            'long': place.geometry.location.lng()
          };              
 
          this.getweatherService.getWeather(coords).then(data=>{
            this.data=data;
            this.visible=true;
          });   
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 10;
      });
    }
  }
}
