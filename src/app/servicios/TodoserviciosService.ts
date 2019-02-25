import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iProps } from './iProps';


@Injectable({
  providedIn: 'root'
})
export class TodoserviciosService {
  
  myCollection: AngularFirestoreCollection<any>;
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

  /**
   * @return Devuelve un Observable con la coleccion de los registros de la base de datos
   */
  leeRegistro(): Observable<firebase.firestore.QuerySnapshot>{
    return this.myCollection.get();
  }

  /**
   * 
   * @param datos 
   * @return Devuelve un Promise referenciado a un Documento de firebase
   */
  agregaRegistro(datos): Promise<firebase.firestore.DocumentReference> {
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

  /**
   * @return Devuelve la variable Dia 
   */
  getDia(): any{
    return this.dia;
  }

  /**
   * @return Devuelve la variable Mes
   */
  getMes(): any{
    return this.mes;
  }
/**
 * @return Devuelve la variable Total
 */
  getTotal(): any{
    return this.total;
  }

  setLang(val) {
    this.props.lang = val;
    //return this.storage.set("props", this.props);
  }

/**
 *  @return Devuelve la variable lang de la interfaz iProps
 */
  getLang() {
    return this.props.lang;
  }

  /**
   * 
   * @param id 
   * @return Devuelve un Promise con el borrado de un registro de la base de datos
   */
  borrarRegistro(id): Promise<void>{
    
    return this.myCollection.doc(id).delete();
    
  }

  

}