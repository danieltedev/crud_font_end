import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PessoaRoutingModule } from './pessoa-routing.module';
import { CadastroComponent } from './cadastro/cadastro.component';
import { BuscarComponent } from './buscar/buscar.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CadastroComponent, BuscarComponent],
  imports: [
    CommonModule,
    PessoaRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PessoaModule { }
