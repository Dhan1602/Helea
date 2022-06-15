export interface comentarios {
    _id?: string,
    idPublicacion: String,
    messages: {
        userName: String,
        image: string,
        message: String,
        fecha: String
    }
}