import { IonicModule, ModalController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tab2Page } from './tab2.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { setTranslateLoader } from '../app.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    RouterModule.forChild([{ path: '', component: Tab2Page }]),
    TranslateModule.forChild({ //Necesario para poder utilziar | translate
      loader: {
      provide: TranslateLoader, 
      useFactory: (setTranslateLoader), deps: [HttpClient]
      }
      })

  ],
  declarations: [Tab2Page],
  entryComponents:[]
})
export class Tab2PageModule {}
