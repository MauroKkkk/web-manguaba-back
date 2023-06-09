var express = require('express');
var bodyParser = require('body-parser');
const { response } = require('express');
var server = express();
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use('/', express.static('Arquivos'));
server.set("view engine", "ejs");
var dados = 0;
var info;

function GetDados(req, resp) {
    resp.setHeader("Access-Control-Allow-Origin", "*");
    resp.send(dados);
};

function PostDados(req, resp) {
    info = req.query.Dado
    dados = info;
    resp.send({ "Status": 200 });
    console.log(info);
};

function DeleteDados(req, resp) {
    dados = [];
    resp.send("");
};

function Index(req, resp) {
    resp.render("index");
};

server.get("/", Index);
server.get("/Receber", GetDados);
server.post("/Enviar", PostDados);
server.delete("/Deletar", DeleteDados);
server.listen(80);
