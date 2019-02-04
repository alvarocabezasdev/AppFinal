var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Platform, ModalController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
var AppComponent = /** @class */ (function () {
    function AppComponent(platform, splashScreen, statusBar, modalController, navCtrl, router) {
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.modalController = modalController;
        this.navCtrl = navCtrl;
        this.router = router;
        this.appPages = [
            {
                title: 'Listado',
                url: '',
                icon: 'home'
            },
            {
                title: 'Tab3',
                url: '/tab3',
                icon: 'person-add'
            },
        ];
        this.initializeApp();
    }
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    AppComponent.prototype.goResumen = function () {
        this.router.navigate(['resumen']);
    };
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            templateUrl: 'app.component.html'
        }),
        __metadata("design:paramtypes", [Platform,
            SplashScreen,
            StatusBar,
            ModalController,
            NavController,
            Router])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map