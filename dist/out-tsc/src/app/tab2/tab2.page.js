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
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ModalController, MenuController } from '@ionic/angular';
import { TodoserviciosService } from '../servicios/TodoserviciosService';
var Tab2Page = /** @class */ (function () {
    //Lo usamos para mostrar un cargando mientras se realiza la operación.
    function Tab2Page(formBuilder, todoS, router, loadingController, modalController, menu) {
        /* Creamos la relación entre el formulario de nueva.page.html y todo; además
        asociamos los validares y valores iniciales */
        this.formBuilder = formBuilder;
        this.todoS = todoS;
        this.router = router;
        this.loadingController = loadingController;
        this.modalController = modalController;
        this.menu = menu;
        this.todo = this.formBuilder.group({
            importe: [''],
            fecha: [''],
        });
    }
    /* Se ejecuta al submit el formulario. Crea un objeto proveniente del formulario (sería
    igual que this.todo.value) y llama a la función agregaNota del servicio. Gestiona la
    Promise para sincronizar la interfaz. */
    Tab2Page.prototype.ionViewDidEnter = function () {
    };
    Tab2Page.prototype.logForm = function () {
        var _this = this;
        this.fechaDia = new Date().toISOString().substr(0, 10);
        var data = {
            importe: this.importeFijo,
            fecha: this.fechaDia.substr(8, 10) + '/' + this.fechaDia.substr(5, 2) + '/' + this.fechaDia.substr(0, 4)
        };
        /* Mostramos el cargando... */
        this.myloading = this.presentLoading();
        this.todoS.agregaRegistro(data)
            .then(function (docRef) {
            console.log("ID insertado (por si lo necesitamos para algo...): ", docRef.id);
            /* Ponemos en blanco los campos del formulario*/
            _this.todo.setValue({
                importe: '',
                fecha: ''
            });
            /* Cerramos el cargando...*/
            _this.loadingController.dismiss();
            /*Podríamos ir a la página de listado*/
            _this.router.navigateByUrl('/tabs/(tab3:tab3)');
        })
            .catch(function (error) {
            console.error("Error insertando documento: ", error);
            /* Cerramos el cargando...*/
            _this.loadingController.dismiss();
            /* Mostramos un mensaje de error */
            /* A desarrollar, se aconseja emplear un componente denominado toast */
        });
    };
    /* Es un componente de la interfaz IONIC v4 */
    Tab2Page.prototype.presentLoading = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Guardando'
                            })];
                    case 1:
                        _a.myloading = _b.sent();
                        return [4 /*yield*/, this.myloading.present()];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    Tab2Page.prototype.sumar5 = function () {
        if (!this.importeFijo) {
            this.importeFijo = 0;
            this.importeFijo += 5;
        }
        else {
            this.importeFijo += 5;
        }
    };
    Tab2Page.prototype.sumar10 = function () {
        if (!this.importeFijo) {
            this.importeFijo = 0;
            this.importeFijo += 10;
        }
        else {
            this.importeFijo += 10;
        }
    };
    Tab2Page.prototype.reset0 = function () {
        this.importeFijo = 0;
    };
    Tab2Page = __decorate([
        Component({
            selector: 'app-tab2',
            templateUrl: 'tab2.page.html',
            styleUrls: ['tab2.page.scss']
        }),
        __metadata("design:paramtypes", [FormBuilder,
            TodoserviciosService,
            Router,
            LoadingController,
            ModalController,
            MenuController])
    ], Tab2Page);
    return Tab2Page;
}());
export { Tab2Page };
//# sourceMappingURL=tab2.page.js.map