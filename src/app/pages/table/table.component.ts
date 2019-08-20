import { Component, OnInit, HostBinding } from '@angular/core';
import { MyregisterService } from '../../services/myregister.service';
import { ExportexcelService } from '../../services/exportexcel.service';
import * as moment from 'moment'


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: ['./table.component.css']
})


export class TableComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  registros: any = [];
  fecha: string;
  mostrar: boolean;
  loading = false;
  

  constructor(private regitrosServices: MyregisterService, private exportExcelService: ExportexcelService) { }

  ngOnInit() {
    this.mostrar = false;
    this.fecha = ''; //moment().format('MM');
    console.log(this.fecha);
    
    this.loading = true;
    
    this.regitrosServices.getRegistros().subscribe(
      res => {

        this.loading = false;
        this.registros = res;
        
      },
      err => console.log(err)
    );

  }

  filtrar(fecha?: string) {
    this.mostrar = true;
    this.loading = true;
    this.regitrosServices.getRegistrosFil(fecha).subscribe(
      res => {
        this.loading = false;
        this.registros = res;
      },
      err => console.log(err)
    );
      
  }

  exportAsXLSX(): void {
    this.exportExcelService.exportAsExcelFile(this.registros, 'sample');
  }

}

