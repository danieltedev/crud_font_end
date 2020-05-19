import {
  Directive,
  Renderer2,
  ElementRef,
  OnInit,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Pagination } from '../interfaces/pagination';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { take, catchError } from 'rxjs/operators';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[m-pagination]'
})
export class PaginationDirective implements OnInit, AfterViewInit, OnChanges {

  private paginationValue: Pagination;
  private liFirstChild: Element;
  private liLastChild: Element;
  private listLiAdd: Array<Element> = [];
  private numberPageCreate = 5;

  @Output('m-pagination')
  private paginationChange = new EventEmitter<Pagination>();

  @Input('m-pagination')
  get pagination(): Pagination {
    return this.paginationValue;
  }

  set pagination(pagination: Pagination) {
    this.paginationValue = pagination;
    this.paginationChange.emit(this.paginationValue);
  }

  constructor(private el: ElementRef, private render: Renderer2, private route: Router, private htttp: HttpClient) { }

  private nextPage(): void {
    this.liLastChild.firstChild.addEventListener('click', (e: Event) => {
      const liActive = this.el.nativeElement.querySelector('.active');
      this.numberPageCreate = this.numberPageCreate <= this.pagination.paginaAtual ? this.numberPageCreate + 5 : this.numberPageCreate;
      if (Math.ceil(this.pagination.totalPagina) > liActive.querySelector('a').innerText) {
        const page = this.pagination.paginaAtual + 1;
        this.route.navigateByUrl(this.pagination.routerNavegation + page);
        this.disabledBtnNext(this.liLastChild, page);
        this.disabledBtnPrevious(this.liFirstChild, page);
        this.loadDataPage(page);
      }
    });
  }

  private previousPage(): void {
    this.liFirstChild.firstChild.addEventListener('click', (e: Event) => {
      const liActive = this.el.nativeElement.querySelector('.active');
      this.numberPageCreate = this.numberPageCreate > this.pagination.paginaAtual ? this.numberPageCreate - 5 : this.numberPageCreate;
      if (1 < liActive.querySelector('a').innerText) {
        const page = this.pagination.paginaAtual - 1;
        this.route.navigateByUrl(this.pagination.routerNavegation + page);
        this.disabledBtnNext(this.liLastChild, page);
        this.disabledBtnPrevious(this.liFirstChild, page);
        this.loadDataPage(page);
      }
    });
  }

  private showPage(link: Element, pagination: Pagination): void {
    link.addEventListener('click', (e: Event) => {
      const liSetActive = link.parentElement;
      this.route.navigateByUrl(pagination.routerNavegation + link.textContent);
      this.disabledBtnNext(this.liLastChild, this.pagination.paginaAtual);
      this.disabledBtnPrevious(this.liFirstChild, this.pagination.paginaAtual);
      this.loadDataPage(this.pagination.paginaAtual);
    });
  }

  private disabledBtnPrevious(btnPrevious: Element, actualPage: number): void {
    if (actualPage === 1) {
      this.render.addClass(btnPrevious, 'disabled');
      this.render.removeClass(btnPrevious, 'waves-effect');
    } else {
      this.render.addClass(btnPrevious, 'waves-effect');
      this.render.removeClass(btnPrevious, 'disabled');
    }
  }

  private disabledBtnNext(btnNext: Element, actualPage: number): void {
    if (actualPage === Math.ceil(this.pagination.totalPagina)) {
      this.render.addClass(btnNext, 'disabled');
      this.render.removeClass(btnNext, 'waves-effect');
    } else {
      this.render.addClass(btnNext, 'waves-effect');
      this.render.removeClass(btnNext, 'disabled');
    }
  }

  private createPage(paginas: number, btnNext: Element): void {
    Array(Math.ceil(paginas)).fill(undefined).map((v, i) => {
      return i + 1;
    }).filter((v, i) => (this.numberPageCreate === 5 || v > (this.numberPageCreate - 5)) && v <= Math.ceil(this.pagination.totalPagina))
      .forEach((v, i) => {
        const li = this.render.createElement('li');
        const a = this.render.createElement('a');
        this.render.addClass(li, parseInt(this.pagination.paginaAtual as any, 0) === v ? 'active' : 'waves-effect');
        this.render.appendChild(li, a);
        this.render.appendChild(a, this.render.createText(v.toString()));
        this.render.insertBefore(this.el.nativeElement, li, btnNext);

        this.listLiAdd.push(li);

        this.showPage(a, this.pagination);
      });
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.nextPage();
    this.previousPage();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.pagination) {
      this.numberPageCreate = this.pagination.paginaAtual > this.numberPageCreate ? this.numberPageCreate + 5 : this.numberPageCreate;
    }
    this.liFirstChild = this.el.nativeElement.firstChild;
    this.liLastChild = this.el.nativeElement.lastChild;

    this.listLiAdd.forEach(e => {
      e.remove();
    });
    this.listLiAdd = [];

    if (this.pagination && this.pagination.totalPagina > 1) {
      this.createPage(this.numberPageCreate, this.liLastChild);
      this.disabledBtnNext(this.liLastChild, this.pagination.paginaAtual);
      this.disabledBtnPrevious(this.liFirstChild, this.pagination.paginaAtual);

      this.render.removeClass(this.el.nativeElement, 'hide');
    } else {
      this.render.addClass(this.el.nativeElement, 'hide');
    }
  }

  private loadDataPage(page: number): void {
    this.pagination.service.params[this.pagination.service.paramIndexArrayPage] = page;
    this.pagination.service.instance[this.pagination.service.method]
      .apply(this.pagination.service.instance, this.pagination.service.params)
      .subscribe(resp => {
        this.pagination.listaRetorno.next(resp);
      });
  }

}
