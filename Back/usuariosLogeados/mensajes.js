class Mensajes{
    status = 0;
    constructor(){}
    notificar(){
        this.status += 1; 
    }
    verCambios(){ return this.status; }
}

exports.men = Mensajes;