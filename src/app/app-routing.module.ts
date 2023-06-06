import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { ClientFormComponent } from './client-form/client-form.component';

const routes: Routes = [
   {path: '', component : ClientsComponent},
   {path: 'clients', component : ClientsComponent},
   {path: 'clientDetails/:id', component : ClientFormComponent},
   {path: 'createClient', component : ClientFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
