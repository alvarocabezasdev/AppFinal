import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { setTranslateLoader } from '../app.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    TranslateModule.forChild({ //Necesario para poder utilziar | translate
      loader: {
      provide: TranslateLoader, 
      useFactory: (setTranslateLoader), deps: [HttpClient]
      }
      })
  ],
  declarations: [Tab3Page]
})
export class Tab3PageModule {}
