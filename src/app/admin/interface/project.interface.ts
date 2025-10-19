export type Projects  = {
    descripcioncompleta: string;
    descripcioncorta:    string;
    estado:              boolean;
    fecha:               string;
    fechacreacion:       Date;
    fechamodificacion:   Date;
    galeriaimagenes:     any[];
    id:                  number;
    idcategoria:         number;
    imagenprincipal:     string;
    titulo:              string;
    ubicacion:           string;
    usuariocreacion:     string;
    usuariomodificacion: string;
    categoria?: {nombre: string};
}

export type Project = Pick<Projects, "imagenprincipal" | 'titulo' | 'idcategoria' | 'ubicacion' | 'fecha' | 'descripcioncompleta'>;
