var distancias, time, dados;
var max = 10;
var min = 0;
var dist = 0;
var novosDadosContagem = 0;
var novosDadosContagem1 = 0;
var data = [];
var distancias = [];
var time = [];
function GetDados() {
    distancias = [];
    time = [];
    var requests = new XMLHttpRequest();
     // Contagem de novos dados

    requests.onreadystatechange = function() {
        if (requests.readyState == 4) {
            dados = JSON.parse(requests.responseText);
            
            for (i = 0; i < dados.length; i++) {
                var dist1 = parseFloat(dados[i].Distancia);
                dist = (180 - dist1) / 100
                distancias.push(dist);
                time.push(dados[i].Time);
            };

            Grafico();
            Indicador();
        };
    };

    try {
        requests.open("GET", "https://web-manguaba-back.vercel.app/receber");
        requests.send();
    } catch (e) {
        console.log(e);
    }
}

function Grafico() {
    
    var linha = {
        x: time,
        y: distancias,
        type: 'lines'
    };
    data = [linha]
    console.log(linha)


    Plotly.newPlot("Graficos", data);
    
    novosDadosContagem1++;
    if (novosDadosContagem1 == 8) {
        // Remover o primeiro dado a cada 10 novos dados
        time.shift();
        distancias.shift();
        novosDadosContagem1 = 0; // Resetar a contagem
    }

}

function Indicador() {
    var data = [{
        domain: { x: [0, 1], y: [0, 1] },
        value: dist,
        title: { text: "Nível da água em metros:" },
        type: "indicator",
        mode: "gauge+number",
        delta: { reference: 400.50 },
        gauge: { axis: { range: [0, max] } }
    }];

    var layout = { width: 600, height: 400 };
    Plotly.newPlot('Indicador', data, layout);
}


setInterval(GetDados, 1000);