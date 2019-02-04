var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
var TodoserviciosService = /** @class */ (function () {
    function TodoserviciosService(fireStore, http) {
        this.fireStore = fireStore;
        this.http = http;
        this.listado = [];
        this.myCollection = fireStore.collection(environment.firebaseConfig.todoColeccion);
    }
    TodoserviciosService.prototype.leeRegistro = function () {
        return this.myCollection.get();
    };
    TodoserviciosService.prototype.agregaRegistro = function (datos) {
        return this.myCollection.add(datos);
    };
    TodoserviciosService.prototype.setDia = function (dia) {
        this.dia = dia;
    };
    TodoserviciosService.prototype.setMes = function (mes) {
        this.mes = mes;
    };
    TodoserviciosService.prototype.setTotal = function (total) {
        this.total = total;
    };
    TodoserviciosService.prototype.getDia = function () {
        return this.dia;
    };
    TodoserviciosService.prototype.getMes = function () {
        return this.mes;
    };
    TodoserviciosService.prototype.getTotal = function () {
        return this.total;
    };
    TodoserviciosService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [AngularFirestore,
            HttpClient])
    ], TodoserviciosService);
    return TodoserviciosService;
}());
export { TodoserviciosService };
//# sourceMappingURL=TodoserviciosService.js.map