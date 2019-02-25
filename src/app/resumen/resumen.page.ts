import { TodoserviciosService } from './../servicios/TodoserviciosService';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';





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

  /**
   * @return Devuelve la variable Dia del servicio
   */
  getDia(){
    console.log("Dia: "+this.servicio.getDia());
    return this.servicio.getDia();
  }

    /**
   * @return Devuelve la variable Mes del servicio
   */
  getMes(){
    console.log("Mes: "+this.servicio.getMes());

    return this.servicio.getMes();
  }

  /**
   * @return Devuelve la variable Total del servicio.
   */
  getTotal(){
    console.log("Total: "+this.servicio.getTotal());

    return this.servicio.getTotal();
  }







}
