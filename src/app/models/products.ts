export interface Product {
  id?: string; //id que genera farebase automatico
  tipoServicio?: string;
  servicio?: string;
  nit?: string;
  nombreE?: string;
  telefonoE?: string;
  documento?: string;
  primerN?: string
  segundoN?: string;
  primerA?: string;
  segundoA?: string;
  ciudad?: string;
  munLocalidad?: string;
  fecha?: string;
  telCel?: string;
  correo?: string;
  observacion?: string;
  eje?: string;
  fechaReg?: string;
  horaReg?: string;
  usuario?: string;
  otraCiudad?: string;
  origen?: string;
}


export class Servicio {
  constructor(public id: number, public name: string) { }
}

export class State {
  constructor(public id: number, public servicioid: number, public name: string) { }
}


