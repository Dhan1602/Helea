export interface chats {
    _id?: string,
    idHeleo: String,
    categorysChats: [{
        category: String,
        messages: [{
            userName: String,
            message: String,
            fecha: {
                fullDate: String,
                hora: String
            }
        }]
    }]
}