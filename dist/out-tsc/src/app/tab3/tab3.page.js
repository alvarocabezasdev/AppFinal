var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component, ViewChild } from '@angular/core';
import { TodoserviciosService } from '../servicios/TodoserviciosService';
import { LoadingController, ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
var Tab3Page = /** @class */ (function () {
    function Tab3Page(todoS, loadingController, router, modalController, alertCtrl) {
        this.todoS = todoS;
        this.loadingController = loadingController;
        this.router = router;
        this.modalController = modalController;
        this.alertCtrl = alertCtrl;
        this.listado = [];
        this.listadoPanel = [];
        this.total = 0;
        this.totalTemp = 0;
    }
    Tab3Page.prototype.getTotal = function () {
        for (var _i = 0, _a = this.listadoPanel; _i < _a.length; _i++) {
            var data = _a[_i];
            this.total = this.total + parseInt(data.importe);
            this.totalTemp = this.total;
        }
        this.total = 0;
        this.todoS.setTotal(this.totalTemp);
        return this.totalTemp;
    };
    /* Analizar el ciclo de vida de los componentes: justo cuando se hace activa */
    Tab3Page.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.presentLoading("Cargando");
        this.total = 0;
        this.todoS.leeRegistro().subscribe(function (querySnapshot) {
            _this.listado = [];
            _this.delete();
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                //console.log(doc.id, " => ", doc.data());
                _this.listado.push(__assign({ id: doc.id }, doc.data()));
            });
            //console.log(this.listado);
            _this.listadoPanel = _this.listado;
            _this.getImporteMes();
            _this.getImporteDia();
            _this.loadingController.dismiss();
        });
    };
    /* Esta función es llamada por el componente Refresher de IONIC v4 */
    Tab3Page.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.todoS.leeRegistro().subscribe(function (querySnapshot) {
            _this.listado = [];
            _this.delete();
            querySnapshot.forEach(function (doc) {
                _this.listado.push(__assign({ id: doc.id }, doc.data()));
            });
            _this.listadoPanel = _this.listado;
            _this.getImporteMes();
            _this.getImporteDia();
            refresher.target.complete();
        });
    };
    Tab3Page.prototype.delete = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: //para solucionar el tema de list-items-sliding con ngfor
                    return [4 /*yield*/, this.dynamicList.closeSlidingItems()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Tab3Page.prototype.presentLoading = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var myloading;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({
                            message: msg
                        })];
                    case 1:
                        myloading = _a.sent();
                        return [4 /*yield*/, myloading.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Tab3Page.prototype.initializeItems = function () {
        this.listadoPanel = this.listado;
    };
    Tab3Page.prototype.getItems = function (ev) {
        this.initializeItems();
        var val = ev.target.value;
        if (val && val.trim() != '') {
            this.listadoPanel = this.listadoPanel.filter(function (item) {
                return (item.importe.toString().toLowerCase().indexOf(val.toLowerCase()) > -1 || item.fecha.toString().toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    };
    Tab3Page.prototype.getImporteMes = function () {
        this.fechaDia = new Date().toISOString().substr(0, 10);
        this.total = 0;
        for (var _i = 0, _a = this.listadoPanel; _i < _a.length; _i++) {
            var data = _a[_i];
            if (data.fecha.substr(5, 2) == this.fechaDia.substr(5, 2)) {
                this.total = this.total + parseInt(data.importe);
            }
        }
        this.totalTemp = this.total;
        this.total = 0;
        console.log("IMPORTE MES: " + this.totalTemp);
        this.todoS.setMes(this.totalTemp);
    };
    Tab3Page.prototype.getImporteDia = function () {
        this.todoS.setDia(parseInt(this.listadoPanel[0].importe));
    };
    Tab3Page.prototype.actualizarPage = function () {
        var _this = this;
        this.todoS.leeRegistro().subscribe(function (querySnapshot) {
            _this.listado = [];
            _this.delete();
            querySnapshot.forEach(function (doc) {
                _this.listado.push(__assign({ id: doc.id }, doc.data()));
            });
            _this.listadoPanel = _this.listado;
            _this.getImporteMes();
            _this.getImporteDia();
            _this.loadingController.dismiss();
        });
    };
    // Infinity scroll
    Tab3Page.prototype.loadData = function (event) {
        var _this = this;
        setTimeout(function () {
            console.log('Done');
            event.target.complete();
            // App logic to determine if all data is loaded
            // and disable the infinite scroll
            if (_this.listadoPanel.length == 1000) {
                event.target.disabled = true;
            }
        }, 500);
    };
    Tab3Page.prototype.toggleInfiniteScroll = function () {
        this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    };
    __decorate([
        ViewChild(IonInfiniteScroll),
        __metadata("design:type", IonInfiniteScroll)
    ], Tab3Page.prototype, "infiniteScroll", void 0);
    __decorate([
        ViewChild('dynamicList'),
        __metadata("design:type", Object)
    ], Tab3Page.prototype, "dynamicList", void 0);
    Tab3Page = __decorate([
        Component({
            selector: 'app-tab3',
            templateUrl: 'tab3.page.html',
            styleUrls: ['tab3.page.scss']
        }),
        __metadata("design:paramtypes", [TodoserviciosService,
            LoadingController,
            Router,
            ModalController,
            AlertController])
    ], Tab3Page);
    return Tab3Page;
}());
export { Tab3Page };
//# sourceMappingURL=tab3.page.js.map