import { Tab3PageModule } from './tab3/tab3.module';
import { Component } from '@angular/core';

import { Platform, ModalController, NavController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { TodoserviciosService } from './servicios/TodoserviciosService';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public appPages = [
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

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public modalController: ModalController,
    public navCtrl: NavController,
    private translate: TranslateService,
    public router: Router,
    public todoS: TodoserviciosService,
    private alertCtrl: AlertController,
    
    
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  goResumen(){
    this.router.navigate(['resumen']);
  }

  goEscribenos(){
    this.router.navigate(['escribenos']);
  }

  changeLang(e) {

    if (e.detail.checked) {
      this.todoS.setLang("en");
      this.translate.use("en");
    } else {
      this.todoS.setLang("es");
      this.translate.use("es");
    }

  }

  

}
