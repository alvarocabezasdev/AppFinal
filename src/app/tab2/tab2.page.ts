import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ModalController, MenuController } from '@ionic/angular';
import { TodoserviciosService } from '../servicios/TodoserviciosService';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  
  private fechaDia: String;

  importeFijo: number;

  private todo: FormGroup; //Instancia del FormGroup de nueva.page.html
  myloading: any; //mejorable con un servicio destinado a estos menesteres...
  //Lo usamos para mostrar un cargando mientras se realiza la operación.
  constructor(private formBuilder: FormBuilder,
    private todoS: TodoserviciosService,
    private router: Router,
    public loadingController: LoadingController,
    public modalController: ModalController,
    private menu: MenuController) {
    /* Creamos la relación entre el formulario de nueva.page.html y todo; además
    asociamos los validares y valores iniciales */
    
    this.todo = this.formBuilder.group({
      importe: [''],
      fecha: [''],
    });
    
  }
  /* Se ejecuta al submit el formulario. Crea un objeto proveniente del formulario (sería
  igual que this.todo.value) y llama a la función agregaNota del servicio. Gestiona la
  Promise para sincronizar la interfaz. */


  ionViewDidEnter(){

  }


  logForm() {
    this.fechaDia = new Date().toISOString().substr(0,10);

    let data = {
      importe: this.importeFijo,
      fecha:   this.fechaDia.substr(8,10)+ '/' + this.fechaDia.substr(5,2)  +'/' + this.fechaDia.substr(0,4) 
        };
    /* Mostramos el cargando... */
    this.myloading = this.presentLoading();
    this.todoS.agregaRegistro(data)
      .then((docRef) => {
        console.log("ID insertado (por si lo necesitamos para algo...): ", docRef.id);
        /* Ponemos en blanco los campos del formulario*/
        this.todo.setValue({
          importe: '',
          fecha: ''
        });
        /* Cerramos el cargando...*/
        this.loadingController.dismiss();
        /*Podríamos ir a la página de listado*/
        this.router.navigateByUrl('/tabs/(tab3:tab3)');
      })
      .catch((error) => {
        console.error("Error insertando documento: ", error);
        /* Cerramos el cargando...*/
        this.loadingController.dismiss();
        /* Mostramos un mensaje de error */
        /* A desarrollar, se aconseja emplear un componente denominado toast */
      });
  }
  /* Es un componente de la interfaz IONIC v4 */
  async presentLoading() {
    this.myloading = await this.loadingController.create({
      message: 'Guardando'
    });
    this.reset0();
    return await this.myloading.present();
  }

  sumar5(){
    
    if(!this.importeFijo){
      this.importeFijo=0;
      this.importeFijo+=5;
    }else{this.importeFijo+=5;}
    
  }

  sumar10(){
    if(!this.importeFijo){
      this.importeFijo=0;
      this.importeFijo+=10;
    }else{this.importeFijo+=10;}
    
  }

  reset0(){
    this.importeFijo = 0;
  }




}