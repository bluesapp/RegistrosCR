import { Component, OnInit } from '@angular/core';
import { FormService } from '../../services/cursos.service';
import { SelectService } from '../../services/select.service';
import {  Servicio, State } from '../../models/products';
import { Registro } from '../../models/registros';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { MyregisterService } from '../../services/myregister.service';




@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
})


export class CursosComponent implements OnInit {

  mostrar:boolean;
  otra = true;

  registro = {} as Registro;
 // validacion = false;


  //  Seleccion de servicios***** */
  selectedServicio: Servicio = new Servicio(1, '');
  servicios: Servicio[];
  states: State[];

  // Seleccio de ciudad/municipio****
  selectedCiudad: Servicio = new Servicio(1, '');
  ciudades: Servicio[];
  municipios: State[];

  //usuarrio login
  fechaReg: string;
  horaReg: string;

  user: string;

  // cambio de array
  servicio: string;
  ciudad: string;
  
    // OPcion de telefono/correo
    info: false;

 
 



  constructor(private registroService: MyregisterService, public productService: FormService, public selectService: SelectService, private auth: AuthService) {

  }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
    })
    this.servicios = this.selectService.getServicios();
    this.onSelect(this.selectedServicio.id);

    this.ciudades = this.selectService.getCiudad();
    this.onSelectCiudad(this.selectedCiudad.id);
    this.ciudad = null;
    this. mostrar = false;
    this.registro.origen = 'telefono';

    if (this.auth.user == null) {
      this.user = localStorage.getItem('email');
    } else {
      this.user = this.auth.user;
    }



  }

  addRegistro(f: NgForm) {
    //console.log("NgForm: ", f)
    if (f.invalid) {
      return;
    }


    this.registro.usuario = this.user;

    this.registro.servicio = this.servicio;
    this.registro.ciudad = this.ciudad;

    if (this.registro.primernom) {
      this.registro.primernom = this.registro.primernom.toUpperCase();
    }

    if (this.registro.segundonom) {

      this.registro.segundonom = this.registro.segundonom.toUpperCase();
    }

    if (this.registro.primerape) {
      this.registro.primerape = this.registro.primerape.toUpperCase();
    }

    if (this.registro.segundoape) {
      this.registro.segundoape = this.registro.segundoape.toUpperCase();
    }

    
    if (this.mostrar = false) {
      this.registro.tipodoc = 'NIT';
    }
    this.registro.correo = this.registro.correo.toLowerCase();


    

  



    delete this.registro.id;
    delete this.registro.fechareg;
    this.registroService.saveRegistros(this.registro)
      .subscribe(
        res => {
        Swal.fire({
          position: 'center',
          type: 'success',
          title: `Registro guardado con exito `,
          showConfirmButton: true,
        })
      
        this.otra = false;
        this.registro = {} as Registro;
        this.registro.ciudad = '';
        this.registro.origen = 'telefono';
      }
        ,
        (err) => {
          console.log('errorr: ',err);
          
      });



      // Swal.fire({
      //   type: 'error',
      //   title: 'Lo sentimos...',
      //   text: 'El registro no ha sido guardado; por favor comuniquese con el administrador de la pagina',
      //   footer: `ERROR: ${err}`
      // })
    

  }


  onSelect(servicioid) {

    this.states = this.selectService.getStates().filter((item) => item.servicioid == servicioid);

    this.servicio = this.servicios[servicioid - 1].name;



  }

  onSelectCiudad(servicioid) {

    this.municipios = this.selectService.getMunicipios().filter((item) => item.servicioid == servicioid)

    this.ciudad = this.ciudades[servicioid - 1].name;



    if (servicioid == 3) {
      
      return this.otra = true;

    } else {

      return this.otra = false;

    }

  }

}



