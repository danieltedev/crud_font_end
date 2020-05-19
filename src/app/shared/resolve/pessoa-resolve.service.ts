import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { PessoaService } from '../service/pessoa.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PessoaResolveService implements Resolve<any> {

  constructor(
    private service: PessoaService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.service.listarTodos().pipe(map(resp => {
      console.log(resp);
      return {
        listaPessoa: resp
      };
    }));
  }
}
