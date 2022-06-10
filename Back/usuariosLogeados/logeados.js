class Logeados{
    usuariosLogeados = [/*{
        _id: usuario._id,
        logeado: true,
        userName: usuario.userName
    }*/];
    IPreferences = [];
    constructor(){}

    exitsIPreferences(ip){
        let exits = false;
        proceso:{
            for(let ips of this.IPreferences){
                if(ips == ip){
                    exits = true;
                    break proceso;
                }
            }
        }
        if(!exits) return false;
        return true;
    }
    saveIPreferences(ip){
        let exits = this.exitsIPreferences(ip);
        if(!exits){
            this.IPreferences.push(ip);
            return false;
        }
        return true;
    }
    logearUsuario(usuario){
        let info = this.isLoger(usuario._id);
        if(!info.estado){
            this.usuariosLogeados.push({
                _id: usuario._id,
                _ip: usuario._ip,
                logeado: true,
                userName: usuario.userName
            });
        }else{
            this.usuariosLogeados[info.index].logeado = true;
        }
        return true;
    }
    desLogearUsuario(userId){
        let info = this.isLoger(usuario._id);
        if(info.estado){
            this.usuariosLogeados[info.index].logeado = false;
        }
        return true;
    }
    isLoger(userIp){
        let estado = false, index = -1;
        proceso:{
            for(let user of this.usuariosLogeados){
                index++;
                if(user._ip == userIp){
                    if(user.logeado){
                        estado = true;
                        break proceso;
                    }
                } 
            }
        }
        if(estado) return { estado, index, userID: this.usuariosLogeados[index]._id }; //esta logeado.
        return { estado, index }; // no esta logeado.
    }
}

exports.loger = Logeados;