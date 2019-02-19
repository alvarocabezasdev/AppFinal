import { Component, ViewChild } from '@angular/core';
import { TodoserviciosService } from '../servicios/TodoserviciosService';
import { LoadingController, ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { forEach } from '@angular/router/src/utils/collection';
import { isUndefined } from 'util';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  [x: string]: any;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  @ViewChild('dynamicList') dynamicList;
  listado = [];
  listadoPanel = [];
  total= 0;
  totalTemp = 0;
  fechaDia :string;

  constructor(private todoS: TodoserviciosService,
    public loadingController: LoadingController,
    private router: Router,
    public modalController: ModalController,
    private alertCtrl: AlertController) {
  }


  getTotal(){
    for(let data of this.listadoPanel) {
      this.total = this.total + parseInt(data.importe);
      this.totalTemp = this.total;
    }
    this.total = 0;
    this.todoS.setTotal(this.totalTemp);

    return this.totalTemp;
  }


  /* Analizar el ciclo de vida de los componentes: justo cuando se hace activa */
  ionViewDidEnter() {
    this.presentLoading("Cargando");
    this.total=0;
    this.todoS.leeRegistro().subscribe((querySnapshot) => {
        this.listado = [];
        this.delete();
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          //console.log(doc.id, " => ", doc.data());
          this.listado.push({ id: doc.id, ...doc.data() });
        });
        //console.log(this.listado);
        this.listadoPanel = this.listado;
        this.getImporteMes();
        this.getImporteDia();
        this.loadingController.dismiss();
      });
  }
  /* Esta función es llamada por el componente Refresher de IONIC v4 */
  doRefresh(refresher) {
    this.todoS.leeRegistro().subscribe(querySnapshot => {
        this.listado = [];
        this.delete();
        querySnapshot.forEach((doc) => {
          this.listado.push({ id: doc.id, ...doc.data() });
        });
        this.listadoPanel = this.listado;
        this.getImporteMes();
        this.getImporteDia();
        refresher.target.complete();
      });
  }

  async delete() { //para solucionar el tema de list-items-sliding con ngfor
    await this.dynamicList.closeSlidingItems();
  }

  async presentLoading(msg) {
    let myloading = await this.loadingController.create({
      message: msg
    });
    return await myloading.present();
  }

  initializeItems() {
    this.listadoPanel = this.listado;
  }

  getItems(ev: any) {
    this.initializeItems();
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.listadoPanel = this.listadoPanel.filter((item) => { 
        return (item.importe.toString().toLowerCase().indexOf(val.toLowerCase()) > -1 || item.fecha.toString().toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  getImporteMes(){

    this.fechaDia = new Date().toISOString().substr(0,10);
    this.totalTemp = 0;
    for(let data of this.listadoPanel) {
      console.log("IMPORTE MES: "+this.fechaDia.substr(3,2));
      
      if(data.fecha.substr(3,2) ==  this.fechaDia.substr(5,2) ){
        this.totalTemp = this.totalTemp + parseInt(data.importe);
      }
    }

   

    this.todoS.setMes(this.totalTemp);
    
  }

  getImporteDia(){
    if(this.listadoPanel.length!=0){
      this.todoS.setDia(parseInt(this.listadoPanel[0].importe));

    }
    
  }

  actualizarPage(){

    this.todoS.leeRegistro().subscribe((querySnapshot) => {
      this.listado = [];
      this.delete();
      querySnapshot.forEach((doc) => {
        this.listado.push({ id: doc.id, ...doc.data() });
      });

      this.listadoPanel = this.listado;
      this.getImporteMes();
      this.getImporteDia();
      this.loadingController.dismiss();
    });

  }
  // Infinity scroll
  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.listadoPanel.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  async borrarRegistros(){

    let alert = await this.alertCtrl.create({
      header: '¿Estas seguro?',
      message: 'Se borran todos los datos',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Buy clicked');
            this.listadoPanel.forEach((doc1) => {
              this.todoS.borrarRegistro(doc1.id);
            });
            this.actualizarPage();

          }
        }
        
      ]
    });
    await alert.present();

  }

  async borrarRegistro(id){

    let alert = await this.alertCtrl.create({
      header: '¿Estas seguro?',
      message: 'Se borrará la entrada',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Buy clicked');
            
              this.todoS.borrarRegistro(id);
            
            this.actualizarPage();

          }
        }
        
      ]
    });
    await alert.present();

  }





 




}
