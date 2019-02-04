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
import { ModalController } from '@ionic/angular';
import { Component } from '@angular/core';
var ResumenPage = /** @class */ (function () {
    function ResumenPage(modalControler, servicio) {
        this.modalControler = modalControler;
        this.servicio = servicio;
    }
    ResumenPage.prototype.ngOnInit = function () {
    };
    ResumenPage.prototype.dismiss = function () {
        this.modalControler.dismiss();
    };
    ResumenPage.prototype.getDia = function () {
        console.log("Dia: " + this.servicio.getDia());
        return this.servicio.getDia();
    };
    ResumenPage.prototype.getMes = function () {
        console.log("Mes: " + this.servicio.getMes());
        return this.servicio.getMes();
    };
    ResumenPage.prototype.getTotal = function () {
        console.log("Total: " + this.servicio.getTotal());
        return this.servicio.getTotal();
    };
    ResumenPage = __decorate([
        Component({
            selector: 'app-resumen',
            templateUrl: './resumen.page.html',
            styleUrls: ['./resumen.page.scss'],
        }),
        __metadata("design:paramtypes", [ModalController,
            TodoserviciosService])
    ], ResumenPage);
    return ResumenPage;
}());
export { ResumenPage };
//# sourceMappingURL=resumen.page.js.map