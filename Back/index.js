const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.LINK)
    .then((db) => { console.log("Se ha conectado a la BD") })
    .catch((err) => { console.log(err) });

const publicaciones = require("./models/publicaciones");
const categorias = require("./models/categories");
const perfil_model = require("./models/perfiles");
const chatMessages_model = require("./models/chatMessages");

app.get("/newChat/:idHeleo", async (req,res)=>{
    let newChat = {
        idHeleo: req.params.idHeleo,
        categorysChats: [{
            category: "General",
            messages: []
        }]
    }
    newChat = new chatMessages_model(newChat);
    await newChat.save();
    res.send({ response: "Chat listo para usar" });
});
app.get("/chats", async (req,res)=>{
    let chats = await chatMessages_model.find();
    res.send(chats);
});

app.post("/perfil", async (req, res)=>{
    let newPerfil = new perfil_model(req.body);
    await newPerfil.save();
    res.send({
        response: "Se ha registrado exitosamente",
        idCreado: newPerfil._id
    });
});
app.post("/perfil-singIng", async (req, res)=>{
    let perfil = await perfil_model.find(req.body);
    if(perfil.length == 0){
        res.send({ noExiste: true });
    }else{
        res.send(perfil);
    }
});
app.get("/perfiles", async (req, res)=>{
    // ruta creada para ver si todo va ok en la DB ya que Daniel no me quiso pasar 
    // su string de conexión :)
    let perfiles = await perfil_model.find();
    res.send(perfiles)
});

app.get("/posts", async (req, res)=>{
    let content = await publicaciones.find().sort({fecha:-1});
    res.send(content);
});

app.get("/posts/categories", async (req, res)=>{
    let content = await categorias.find().sort({name:1});
    res.send(content);
});

app.get("/searchName/:name", async (req, res)=>{
    let content = await publicaciones.find({titulo:{$regex:req.params.name,$options:"i"}}).sort({name:1});
    res.send(content);
});

app.get("/searchCategory/:name", async (req, res)=>{
    let content = await categorias.find({name:{$regex:req.params.name,$options:"i"}}).sort({name:1});
    res.send(content);
});

app.get("/searchByCategory/:name", async (req, res)=>{
    let content = await publicaciones.find({categoria:{$regex:req.params.name,$options:"i"}}).sort({name:1});
    res.send(content);
});

app.get("/searchArticle/:id", async (req, res)=>{
    let article = await publicaciones.find({_id: req.params.id});
    res.send(article);
});

app.get("/searchByAuthor/:name", async (req, res)=>{
    let article = await perfil_model.find({userName:{$regex:req.params.name,$options:"i"}}).sort({name:1});
    res.send(article);
});

app.post("/posts", async (req, res)=>{
    let saving = new publicaciones(req.body);
    await saving.save();
    res.send(saving);
});

app.listen(3000);
