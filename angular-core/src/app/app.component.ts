import { Component,ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from 'angular2-google-maps/core';

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

  public edited = false;

  @ViewChild("search")
  public searchElementRef: ElementRef;
  
  @ViewChild("infowindow")
  public infoElementRef: ElementRef;

  @ViewChild("map")
  public mapElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}     

  ngOnInit() {    
    //set google maps defaults
    this.zoom = 7;
    this.latitude = 6.927078600000002;
    this.longitude = 79.86124300000006;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      
      var infowindowContent = this.infoElementRef.nativeElement
      var infowindow = new google.maps.InfoWindow();      
      infowindow.setContent(infowindowContent);
      
      autocomplete.addListener("place_changed", () => {
        console.log(this.searchElementRef.nativeElement.value);
        
        this.edited = true;
        infowindow.close();

        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          console.log(place.geometry.location.lat());
          console.log(place.geometry.location.lng());

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            alert("No available location found!");
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 15;

          var address = '';
          if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
          }

          
          infowindowContent.children['place-icon'].src = place.icon;
          //infowindowContent.children['place-name'].textContent = place.name;
          infowindowContent.children['place-name'].textContent = place.address_components[1] && place.address_components[1].short_name || '';
          infowindowContent.children['place-address'].textContent = address;
          
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
