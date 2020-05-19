import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PessoaService } from '../../../shared/service/pessoa.service';
import { Util } from '../../../shared/util/util';
import { Materialize } from '../../../shared/materialize-css/materialize';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  private msgCadastroSucesso = {
    html: 'Cadastro efetuado com sucesso!',
    classes: 'green'
  };

  private msgCadastroError = {
    html: 'Erro ao efetuar o cadastro!',
    classes: 'red'
  };

  private msgAtualizarSucesso = {
    html: 'Atualizar efetuado com sucesso!',
    classes: 'green'
  };

  private msgAtualizarError = {
    html: 'Erro ao efetuar o atualizar!',
    classes: 'red'
  };

  private resetFormPessoa = {
    id: '',
    nome: '',
    dataNascimento: ''
  };

  formPessoa: FormGroup;

  constructor(
    private active: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private service: PessoaService
  ) { }

  private construirFormulario() {
    this.formPessoa = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      dataNascimento: ['', Validators.required]
    });
  }

  salvar() {
    this.formPessoa.markAsDirty();
    const pessoa = this.formPessoa.value;
    if (this.formPessoa.valid && Util.isEmpty(pessoa.id)) {
      this.service.salvar(pessoa).subscribe(resp => {
        Materialize.toast(this.msgCadastroSucesso);
        this.formPessoa.reset(this.resetFormPessoa);
        Materialize.updateTextFields();
      }, error => {
        Materialize.toast(this.msgCadastroError);
      });
    }

    if (this.formPessoa.valid && !Util.isEmpty(pessoa.id)) {
      this.service.atualizar(pessoa).subscribe(resp => {
        Materialize.toast(this.msgAtualizarSucesso);
      }, error => {
        Materialize.toast(this.msgAtualizarError);
      });
    }
  }

  cancelar(): void {
    this.router.navigateByUrl('/pessoa/buscar');
  }

  ngOnInit() {
    this.construirFormulario();
    if (!Util.isEmpty(this.active.snapshot.data.pageCadastroPessoa)) {
      const pessoa = this.active.snapshot.data.pageCadastroPessoa.pessoa;
      this.formPessoa.patchValue(pessoa);
      Materialize.updateTextFields();
    }
  }

}
