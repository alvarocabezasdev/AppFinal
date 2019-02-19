import { browser } from 'protractor';
import { Geolocation } from '@ionic-native/geolocation';
import { TodoserviciosService } from './../servicios/TodoserviciosService';
import { Component,OnInit, ViewChild, ElementRef, Injectable } from '@angular/core';
import leaflet from 'leaflet';
import { HttpClient } from '@angular/common/http';
import 'leaflet-routing-machine';
import { LoadingController, AlertController } from '@ionic/angular';
import { InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import { BrowserTab } from '@ionic-native/browser-tab/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

@Injectable()
export class Tab1Page {

  @ViewChild('map') mapContainer: ElementRef;

  gasolineras: any;
  map: any;
  users: any;
  i: any=0;
  rad: any;
  lat1: any;
  lon1: any;

  coche = leaflet.icon({
    iconUrl: '/assets/icon/car.png',
    iconSize: [20, 40], // size of the icon
    
    });

    gasolinera = leaflet.icon({
      iconUrl: '/assets/icon/gas-station.png',
      iconSize: [20, 40], // size of the icon
      
      });
  

  constructor(private http: HttpClient,private miServicio: TodoserviciosService,
    public loadingController: LoadingController,
    private browserTab: BrowserTab,
    private alertCtrl: AlertController,
    private iab: InAppBrowser) {



  }

  ionViewDidEnter() {
 
    this.loadmap();

    let misestaciones=[];

    this.http.get("https://opendata.arcgis.com/datasets/e64c741c13464d418f66bf3a5badeda2_0.geojson").subscribe((data) => {
      console.log(data["features"]);
      data["features"].forEach((estaciones) => {
        
        if(parseInt(this.calcularDistancia(estaciones["properties"]["latitud"],estaciones["properties"]["longitud"],this.lat1, this.lon1 )) <= 20){
            misestaciones.push(estaciones);
          }
          
      });

      
//importante

      
      var myLayer = leaflet.geoJSON().addTo(this.map);

//importante
      myLayer.addData(misestaciones);

      myLayer.on('click',(e)=>{
        
        this.iniciarRuta(e["layer"]["feature"]["properties"]["dirección"].toString(),
        e["layer"]["feature"]["properties"]["localidad"].toString(),
        e["layer"]["feature"]["properties"]["latitud"].toString(),
        e["layer"]["feature"]["properties"]["longitud"].toString());
      

        //this.iniciarRuta(e["layer"]["feature"]["properties"]["dirección"].toString(),e["layer"]["feature"]["properties"]["localidad"].toString()
        //,e["layer"]["feature"]["properties"]["latitud"].toString(),e["layer"]["feature"]["properties"]["longitud"].toString());
        /*  
        alert('https://www.google.com/maps/dir/'+e["layer"]["feature"]["properties"]["latitud"]+','+e["layer"]["feature"]["properties"]["longitud"]
        +'/'+this.lat1+','+this.lon1+'/');
        */
      });

});
    

  }



  calcularDistancia(lat1, lon1, lat2, lon2){
    this.rad = function(x) {return x*Math.PI/180;}
    var R = 6378.137; //Radio de la tierra en km
    var dLat = this.rad( lat2 - lat1 );
    var dLong = this.rad( lon2 - lon1 );
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(this.rad(lat1)) * Math.cos(this.rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
   return d.toFixed(3); //Retorna tres decimales
    }



  


  ionViewDidLoad(){
    
  }

  ionViewDidLeave(){
    this.map.remove();
  }


 
  loadmap() {
    this.presentLoading("Cargando posición");
    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 16,
      
    }).addTo(this.map);

    this.map.locate({
      setView: true,
      maxZoom: 16,
      
    }).on('locationfound', (e) => {

      
      let markerGroup = leaflet.featureGroup();
      this.loadingController.dismiss();
      this.lat1 = e.latitude;
      this.lon1 = e.longitude;

      let marker: any = leaflet.marker([e.latitude, e.longitude], {icon: this.coche}).on('click', () => {
    
        alert('Usted está aquí -> '+'Lat: '+e.latitude+', Lon: '+e.longitude);
        /*
        var geocodeService = leaflet.esri.Geocoding.geocodeService();

        geocodeService.reverse().latlng(e.latlng).run(function(error, result) {
          leaflet.marker(result.latlng).addTo(this.map).bindPopup(result.address.Match_addr).openPopup();
        });
        */
      });
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
      }).on('locationerror', (err) => {
        this.loadingController.dismiss();

        alert(err.message);
    })

    

 
  }

  async presentLoading(msg) {
    let myloading = await this.loadingController.create({
      message: msg
    });
    return await myloading.present();
  }



  async iniciarRuta(direccion :any, localidad :any, latitud :any, longitud :any){

    let alert = await this.alertCtrl.create({
      header: direccion,
      message: localidad,
      buttons: [
        {
          text: 'Abrir en google maps',
          handler: () => {
            
            console.log('Buy clicked');
            this.browserTab.openUrl('https://www.google.com/maps/dir/'+latitud+','+longitud
            +'/'+this.lat1+','+this.lon1+'/');
            //this.browserTab.openUrl('https://www.google.com/maps/dir/'+latitud+','+longitud
            //+'/'+this.lat1+','+this.lon1+'/');

          }
        }
        
      ]
    });
    await alert.present();
  }



}