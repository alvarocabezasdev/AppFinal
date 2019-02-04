import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


import { IonicModule } from '@ionic/angular';

import { ResumenPage } from './resumen.page';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { setTranslateLoader } from '../app.module';
import { HttpClient } from '@angular/common/http';


const routes: Routes = [
  {
    path: '',
    component: ResumenPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild({ //Necesario para poder utilziar | translate
      loader: {
      provide: TranslateLoader, 
      useFactory: (setTranslateLoader), deps: [HttpClient]
      }
      }),
    
    RouterModule.forChild(routes)
  ],
  declarations: [ResumenPage]
})
export class ResumenPageModule {}
