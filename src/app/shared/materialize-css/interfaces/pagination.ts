import { EventEmitter } from '@angular/core';
export interface Pagination {

  paginaAtual?: number;
  totalItens?: number;
  totalPagina?: number;
  listaRetorno?: EventEmitter<Array<any>>;
  routerNavegation?: string;
  service?: {
    instance?: any,
    params?: Array<any>,
    method?: string,
    paramIndexArrayPage?: number,
    paramIndexArraySize?: number
  };
}
