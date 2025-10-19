export interface FormContactanos {
  nombre: string;
  email: string;
  telefono: string;
  asunto:string;
  categoria:string;
  mensaje: string;
}

export interface BandejaEntradaPayload extends Omit<FormContactanos, 'categoria'> {
    idcategoria:number | null;
    usuariocreacion:string;
    usuariomodificacion:string;
}