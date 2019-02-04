import { TodoserviciosService } from './../servicios/TodoserviciosService';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { setTranslateLoader } from '../app.module';



@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.page.html',
  styleUrls: ['./resumen.page.scss'],
})
export class ResumenPage implements OnInit {

  constructor(public modalControler: ModalController,
                public servicio: TodoserviciosService) { 

              }

  ngOnInit() {
    
  } 


  dismiss(){
    this.modalControler.dismiss();
  }

  getDia(){
    console.log("Dia: "+this.servicio.getDia());
    return this.servicio.getDia();
  }

  getMes(){
    console.log("Mes: "+this.servicio.getMes());

    return this.servicio.getMes();
  }

  getTotal(){
    console.log("Total: "+this.servicio.getTotal());

    return this.servicio.getTotal();
  }







}
