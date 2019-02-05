var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { TodoserviciosService } from './../servicios/TodoserviciosService';
import { Component, ViewChild, ElementRef, Injectable } from '@angular/core';
import leaflet from 'leaflet';
import { HttpClient } from '@angular/common/http';
import 'leaflet-routing-machine';
var Tab1Page = /** @class */ (function () {
    function Tab1Page(http, miServicio) {
        this.http = http;
        this.miServicio = miServicio;
        this.i = 0;
        this.coche = leaflet.icon({
            iconUrl: '/assets/icon/car.png',
            iconSize: [20, 40],
        });
        this.gasolinera = leaflet.icon({
            iconUrl: '/assets/icon/gas-station.png',
            iconSize: [20, 40],
        });
    }
    Tab1Page.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.loadmap();
        var misestaciones = [];
        this.http.get("https://opendata.arcgis.com/datasets/e64c741c13464d418f66bf3a5badeda2_0.geojson").subscribe(function (data) {
            console.log(data["features"]);
            data["features"].forEach(function (estaciones) {
                if (parseInt(_this.calcularDistancia(estaciones["properties"]["latitud"], estaciones["properties"]["longitud"], _this.lat1, _this.lon1)) <= 20) {
                    misestaciones.push(estaciones);
                }
            });
            //importante
            var myLayer = leaflet.geoJSON().addTo(_this.map).on('click', function (e) {
                leaflet.Routing.control({
                    waypoints: [
                        leaflet.latLng(_this.lat1, _this.lon1),
                        leaflet.getLatLng(),
                    ]
                }).addTo(_this.map);
            });
            //importante
            myLayer.addData(misestaciones);
        });
    };
    Tab1Page.prototype.calcularDistancia = function (lat1, lon1, lat2, lon2) {
        this.rad = function (x) { return x * Math.PI / 180; };
        var R = 6378.137; //Radio de la tierra en km
        var dLat = this.rad(lat2 - lat1);
        var dLong = this.rad(lon2 - lon1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this.rad(lat1)) * Math.cos(this.rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d.toFixed(3); //Retorna tres decimales
    };
    Tab1Page.prototype.ionViewDidLoad = function () {
    };
    Tab1Page.prototype.ionViewDidLeave = function () {
        this.map.remove();
    };
    Tab1Page.prototype.loadmap = function () {
        var _this = this;
        this.map = leaflet.map("map").fitWorld();
        leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 16,
        }).addTo(this.map);
        this.map.locate({
            setView: true,
            maxZoom: 16,
        }).on('locationfound', function (e) {
            var markerGroup = leaflet.featureGroup();
            _this.lat1 = e.latitude;
            _this.lon1 = e.longitude;
            var marker = leaflet.marker([e.latitude, e.longitude], { icon: _this.coche }).on('click', function () {
                alert('Usted está aquí');
            });
            markerGroup.addLayer(marker);
            _this.map.addLayer(markerGroup);
        }).on('locationerror', function (err) {
            alert(err.message);
        });
    };
    __decorate([
        ViewChild('map'),
        __metadata("design:type", ElementRef)
    ], Tab1Page.prototype, "mapContainer", void 0);
    Tab1Page = __decorate([
        Component({
            selector: 'app-tab1',
            templateUrl: 'tab1.page.html',
            styleUrls: ['tab1.page.scss']
        }),
        Injectable(),
        __metadata("design:paramtypes", [HttpClient, TodoserviciosService])
    ], Tab1Page);
    return Tab1Page;
}());
export { Tab1Page };
//# sourceMappingURL=tab1.page.js.map