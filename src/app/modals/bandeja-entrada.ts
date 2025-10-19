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

export interface BandejaItem {
  id: number;
  asunto: string; // texto del asunto
  leido: boolean;
  nombre: string;
  email: string;
  categoria: string; // pill a la izquierda del asunto
  mensaje?: string; // contenido del mensaje
  fechacreacion: string; // ISO o 'DD/MM/YYYY' según tu UI
}