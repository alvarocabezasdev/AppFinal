import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iProps } from './iProps';


@Injectable({
  providedIn: 'root'
})
export class TodoserviciosService {
  
  myCollection: any;
  gasolineras: Observable<any>;

  listado = [];

  dia: any;
  mes: any;
  total: any;

  props: iProps = {};
  

  constructor(private fireStore: AngularFirestore,
              private http: HttpClient,
             ) {

    this.myCollection = fireStore.collection<any>(environment.firebaseConfig.todoColeccion);
  }

  leeRegistro() {
    return this.myCollection.get();
  }

  agregaRegistro(datos) {
    return this.myCollection.add(datos);
  }

  setDia(dia: any){

    this.dia = dia;
  }

  setMes(mes: any){

    this.mes = mes;
  }

  setTotal(total: any){

    this.total = total;
  }

  getDia(){
    return this.dia;
  }

  getMes(){
    return this.mes;
  }

  getTotal(){
    return this.total;
  }

  setLang(val) {
    this.props.lang = val;
    //return this.storage.set("props", this.props);
  }

  getLang() {
    return this.props.lang;
  }

  

}