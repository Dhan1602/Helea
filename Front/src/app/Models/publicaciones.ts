export interface post_model {
  titulo: string,
  tituloC: string,
  descripcion: string,
  calificacion: {
    cantidad: number,
    total: number,
    promedio: number,
    personCalifi?: []
  },
  background: string,
  categoria: string,
  fecha: string,
  autor: string,
  autorId: string,
  _id?: string
}