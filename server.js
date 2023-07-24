var express = require('express');
var bodyParser = require('body-parser');
const { response } = require('express');
var server = express();
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use('/', express.static(__dirname+'/Arquivos'));
server.set("view engine", "ejs");
var dados = [];
var info;

function GetDados(req, resp) {
    resp.setHeader("Access-Control-Allow-Origin", "*");
    resp.send(dados);
};

function PostDados(req, resp) {

    info = { "Distancia": req.query.distancia, "Time": new Date().toLocaleString("pt-BR", {timeZone: "America/Maceio"}).toTimeString() }
    if(info.Distancia == "0.00"){
        console.log("Não enviou");

    }   else {
        dados.push(info);
        console.log(info);
    }
    dados.push(info);
    console.log(info);
    resp.send({ "Status": 200 });

    console.log(info);
};

function DeleteDados(req, resp) {
    dados = [];
    resp.send("");
};

function Index(req, resp) {
    resp.render(__dirname+"/views/index.ejs");
};

server.get("/", Index);
server.get("/Receber", GetDados);
server.post("/Enviar", PostDados);
server.delete("/Deletar", DeleteDados);
server.listen(80);
