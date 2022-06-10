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

const usuariosLogeados = require("./usuariosLogeados/logeados");
const loger = new usuariosLogeados.loger(); // uso exclusivo para verificar cliente - logeo

const men = require("./usuariosLogeados/mensajes");
const mensajes = new men.men(); // uso exclusivo para verificar mensajes nuevos

// verificar cliente - logeo ––––––––––––––––––––––––––––––––––––––––––––––––
app.get("/saveIPreferences/:ip", (req, res) => {
    res.send(loger.saveIPreferences(req.params.ip));
});
app.get("/exitsIPreferences/:ip", (req, res) => {
    res.send(loger.exitsIPreferences(req.params.ip));
});
app.post("/logear", (req, res) => {
    res.send(loger.logearUsuario(req.body));
});
app.get("/deslogear/:id", (req, res) => {
    res.send(loger.desLogearUsuario(req.params.id));
});
app.get("/verificarloger/:id", (req, res) => {
    res.send(loger.isLoger(req.params.id));
});
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// chat ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
app.get("/newChat/:idHeleo", async (req, res) => {
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
app.get("/chats", async (req, res) => {
    let chats = await chatMessages_model.find();
    res.send(chats);
});
app.get("/cargarChat/:id", async (req,res)=>{
    let chat = await chatMessages_model.findOne({idHeleo: req.params.id});
    let perfil = await perfil_model.findById(req.params.id);
    res.send({chat, perfil});
});
app.post("/saveMessage/:id", async (req,res)=>{
    let m = req.body;
    let messageCategory = await chatMessages_model.findById(req.params.id);
    proceso:{
        for(let i = 0; i < messageCategory.categorysChats.length; i++){
            if(messageCategory.categorysChats[i].category == m.category){
                messageCategory.categorysChats[i].messages.push(m.message);
                break proceso;
            }
        }
    }
    mensajes.notificar();
    await messageCategory.save();
    res.send({response: "guardado con exito"});
});
app.get("/verCambios", (req,res)=>{
    res.send( {status: mensajes.verCambios()} );
});
app.post("/newCategory/:id", async (req,res)=>{
    let chat = await chatMessages_model.findById(req.params.id);
    chat.categorysChats.push(req.body);
    await chat.save();
    res.send( {response: "Creada con exito"} );
});
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// perfiles ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
app.post("/perfil", async (req, res) => {
    let newPerfil = new perfil_model(req.body);
    await newPerfil.save();
    res.send({
        response: "Se ha registrado exitosamente",
        perfilCreado: newPerfil
    });
});
app.post("/perfil-singIng", async (req, res) => {
    let perfil = await perfil_model.find(req.body);
    if (perfil.length == 0) {
        res.send({ noExiste: true });
    } else {
        res.send(perfil[0]);
    }
});
app.get("/perfiles", async (req, res) => {
    let perfiles = await perfil_model.find();
    res.send(perfiles)
});

app.get("/perfiles/:id", async (req, res) => {
    let perfiles = await perfil_model.findById(req.params.id);
    res.send(perfiles)
});

app.get("/perfiles2", async (req, res) => {
    // ruta creada para ver si todo va ok en la DB ya que Daniel no me quiso pasar 
    // su string de conexión :)
    let perfiles = await chatMessages_model.find();
    res.send(perfiles);
});
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

app.put("/rank/:ruta", async (req, res) => {
    let calificacion = parseInt(req.body.calificacion)
    let publicacion = await publicaciones.findById(req.params.ruta);
    publicacion.calificacion.cantidad = (publicacion.calificacion.cantidad + 1);
    publicacion.calificacion.total = publicacion.calificacion.total + calificacion
    publicacion.calificacion.promedio = Math.trunc(publicacion.calificacion.total / publicacion.calificacion.cantidad);
    await publicacion.save();
    res.send({mensaje: "Todo okey"})
});

app.get("/posts", async (req, res) => {
    let content = await publicaciones.find().sort({ fecha: -1 });
    res.send(content);
});

app.get("/tarjetas/:autor", async (req, res) => {
    let content = await publicaciones.find({ autorId: req.params.autor }).sort({ fecha: -1 });
    res.send(content);
});

app.get("/posts/categories", async (req, res) => {
    let content = await categorias.find().sort({ name: 1 });
    res.send(content);
});

app.get("/searchName/:name", async (req, res) => {
    let content = await publicaciones.find({ titulo: { $regex: req.params.name, $options: "i" } }).sort({ name: 1 });
    res.send(content);
});

app.get("/searchCategory/:name", async (req, res) => {
    let content = await categorias.find({ name: { $regex: req.params.name, $options: "i" } }).sort({ name: 1 });
    res.send(content);
});

app.get("/searchByCategory/:name", async (req, res) => {
    let content = await publicaciones.find({ categoria: { $regex: req.params.name, $options: "i" } }).sort({ name: 1 });
    res.send(content);
});

app.get("/searchArticle/:id", async (req, res) => {
    let article = await publicaciones.find({ _id: req.params.id });
    res.send(article);
});

app.get("/searchByAuthor/:name", async (req, res) => {
    let article = await perfil_model.find({ userName: { $regex: req.params.name, $options: "i" } }).sort({ name: 1 });
    res.send(article);
});

app.post("/posts", async (req, res) => {
    let saving = new publicaciones(req.body);
    await saving.save();
    res.send(saving);
});

app.listen(3000);