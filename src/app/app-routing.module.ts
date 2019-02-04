import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'resumen', loadChildren: './resumen/resumen.module#ResumenPageModule' },
  { path: 'escribenos', loadChildren: './escribenos/escribenos.module#EscribenosPageModule' },

];
@NgModule({
  imports: [RouterModule.forRoot(routes),
            FormsModule,
            ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}