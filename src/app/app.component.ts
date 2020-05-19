import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Materialize } from './shared/materialize-css/materialize';
import { LoadInterceptorService } from './shared/service/load-interceptor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // title = 'crud-front-end';

  constructor(private title: Title) {}

  option: any = {
    opacity: 0.5,
    inDuration: 250,
    outDuration: 250,
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null,
    preventScrolling: true,
    dismissible: true,
    startingTop: '4%',
    endingTop: '10%'
  };

  ngOnInit(): void {
    this.title.setTitle('crud-front-end');
    Materialize.AutoInit();
    LoadInterceptorService.status.subscribe((s: boolean) => {
      this.option.open = s;
      this.option = Object.assign({}, this.option);
    });
  }
}
