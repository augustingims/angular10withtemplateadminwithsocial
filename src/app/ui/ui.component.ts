import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html'
})
export class UiComponent implements OnInit {

  constructor( ) { }

  ngOnInit() {
    window.dispatchEvent(new Event('resize'));
    document.body.className = 'hold-transition skin-red sidebar-mini';
  }

}
