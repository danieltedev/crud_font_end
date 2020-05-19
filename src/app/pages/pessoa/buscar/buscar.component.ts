import { Component, OnInit } from '@angular/core';
import { PessoaService } from 'src/app/shared/service/pessoa.service';
import { ActivatedRoute } from '@angular/router';
import { Materialize } from '../../../shared/materialize-css/materialize';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss']
})
export class BuscarComponent implements OnInit {

  listaPessoa: Array<any>;

  private msgDeletarSucesso = {
    html: 'Pessoa deletada com sucesso!',
    classes: 'black'
  };

  private msgDeletarError = {
    html: 'Erro ao deletar a pessoa!',
    classes: 'black'
  };

  constructor(
    private service: PessoaService,
    private active: ActivatedRoute
  ) { }

  deletar(id: number) {
    this.service.deletar(id).subscribe(e => {
      this.listaPessoa = this.listaPessoa.filter(p => p.id !== id);
      Materialize.toast(this.msgDeletarSucesso);
    }, error => {
      Materialize.toast(this.msgDeletarError);
    });
  }

  ngOnInit() {
    this.listaPessoa = this.active.snapshot.data.pageBuscarPessoa.listaPessoa;
  }

}
