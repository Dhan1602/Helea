class Logeados{
    usuariosLogeados = [];
    constructor(){}

    logearUsuario(usuario){
        this.usuariosLogeados.push({
            _id: usuario._id,
            logeado: true,
            userName: usuario.userName
        });
        return "lesto";
    }
    desLogearUsuario(userId){
        this.usuariosLogeados.forEach(user=>{
            if(user._id == userId) user.logeado = false;
        });
        return "lesto";
    }
    isLogeado(userId){
        let esta = false;
        this.usuariosLogeados.forEach(user=>{
            if(user._id == userId) esta = true;
        });
        if(esta) return "esta logedo";
        return "no esta logeado";
    }
}

exports.loger = Logeados;