export interface post_model {
    titulo: string,
    descripcion: string,
    calificacion: {
      cantidad:number,
      total:number,
      promedio:number
    },
    background: string,
    categoria: string,
    fecha: string,
    autor: string,
    autorId: string,
    _id?: string
   }