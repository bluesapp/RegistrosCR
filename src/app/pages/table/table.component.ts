import { Component, OnInit, HostBinding } from '@angular/core';
import { MyregisterService } from '../../services/myregister.service'


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: ['./table.component.css']
})


export class TableComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  registros: any = [];

  constructor(private regitrosServices: MyregisterService) { }

  ngOnInit() {
    this.regitrosServices.getRegistros().subscribe(
      res => {
        console.log(res)
        
        this.registros = res; 
      },
      err => console.log(err)
    );
  }

}

