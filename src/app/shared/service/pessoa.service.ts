import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { take, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<Array<any>> {
    return this.http.get<Array<any>>(environment.API.PESSOA).pipe(take(1), catchError(e => throwError(e)));
  }

  buscarPorId(id: number): Observable<any> {
    return this.http.get<any>(`${environment.API.PESSOA}/${id}`).pipe(take(1), catchError(e => throwError(e)));
  }

  deletar(id: number): Observable<any> {
    return this.http.delete(`${environment.API.PESSOA}/${id}`).pipe(take(1), catchError(e => throwError(e)));
  }

  salvar(pessoa: any): Observable<any> {
    return this.http.post(environment.API.PESSOA, pessoa).pipe(take(1), catchError(e => throwError(e)));
  }

  atualizar(pessoa: any): Observable<any> {
    return this.http.put(environment.API.PESSOA, pessoa).pipe(take(1), catchError(e => throwError(e)));
  }
}
