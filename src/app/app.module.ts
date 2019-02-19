import { BrowserTab } from '@ionic-native/browser-tab/ngx';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { TodoserviciosService } from './servicios/TodoserviciosService';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';



export function setTranslateLoader(http: any){
    return new TranslateHttpLoader(http, './assets/i18n/','.json');
}


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [    
    
    
    BrowserModule, 
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
   
    IonicModule.forRoot(), 
    AppRoutingModule,

    HttpClientModule, TranslateModule.forRoot({ //Módulo de traducción
      loader: {
      provide: TranslateLoader, 
      useFactory: (setTranslateLoader), 
      deps: [HttpClient]
      }
      }),

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule],

  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    EmailComposer,
    TodoserviciosService,
    BrowserTab,
    HttpClient,
    InAppBrowser,
    HttpClientModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],

  bootstrap: [AppComponent]
})
export class AppModule {




}
