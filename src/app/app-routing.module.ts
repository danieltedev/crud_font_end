import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'pessoa', loadChildren: () => import('./pages/pessoa/pessoa.module').then(m => m.PessoaModule)
  },
  { path: '', redirectTo: '/pessoa/buscar', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
