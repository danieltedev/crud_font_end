import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { BuscarComponent } from './buscar/buscar.component';
import { PessoaResolveService } from '../../shared/resolve/pessoa-resolve.service';
import { PessoaCadastroResolveService } from '../../shared/resolve/pessoa-cadastro-resolve.service';


const routes: Routes = [
  {
    path: 'cadastro', component: CadastroComponent
  },
  {
    path: 'buscar', component: BuscarComponent, resolve: { pageBuscarPessoa: PessoaResolveService }
  },
  {
    path: 'cadastro/:id', component: CadastroComponent, resolve: { pageCadastroPessoa: PessoaCadastroResolveService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PessoaRoutingModule { }
