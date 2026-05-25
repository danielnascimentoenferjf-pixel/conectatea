function ativarModoEscuro(){

    document.body.classList.toggle("dark-mode");

    localStorage.setItem(
        "modoEscuro",
        document.body.classList.contains("dark-mode")
    );
}

// LOGIN

function fazerLogin(){

    let nome =
        document.getElementById("nomeCrianca").value;

    let idade =
        document.getElementById("idadeCrianca").value;

    let turma =
        document.getElementById("turmaCrianca").value;

    let humor =
        document.getElementById("humorInicial").value;

    if(
        nome == "" ||
        idade == "" ||
        turma == "" ||
        humor == ""
    ){

        alert("Preencha todos os campos.");

    }else{

        localStorage.setItem("nomeCrianca", nome);

        localStorage.setItem("idadeCrianca", idade);

        localStorage.setItem("turmaCrianca", turma);

        localStorage.setItem("humor", humor);

        window.location.href =
            "dashboard.html";
    }
}

// LOGIN AUTOMÁTICO

function verificarLogin(){

    let nome =
        localStorage.getItem("nomeCrianca");

    let paginaAtual =
        window.location.pathname;

    if(
        nome &&
        paginaAtual.includes("login.html")
    ){

        window.location.href =
            "dashboard.html";
    }
}

// SAIR

function sairSistema(){

    localStorage.clear();

    window.location.href =
        "login.html";
}

// MENSAGENS

function enviarMensagem(){

    let mensagem =
        document.getElementById("mensagem").value;

    if(mensagem.trim() == ""){

        alert("Digite uma mensagem.");

    }else{

        let mensagens =
            JSON.parse(localStorage.getItem("mensagens"))
            || [];

        mensagens.push({

            texto: mensagem,

            hora: new Date().toLocaleTimeString()

        });

        localStorage.setItem(
            "mensagens",
            JSON.stringify(mensagens)
        );

        mostrarMensagens();

        document.getElementById("mensagem").value = "";
    }
}

function mostrarMensagens(){

    let lista =
        document.getElementById("listaMensagens");

    if(!lista) return;

    lista.innerHTML = "";

    let mensagens =
        JSON.parse(localStorage.getItem("mensagens"))
        || [];

    mensagens.forEach(function(msg,index){

        lista.innerHTML += `

            <div class="card">

                <h4>${msg.hora}</h4>

                <p>${msg.texto}</p>

                <button onclick="excluirMensagem(${index})">
                    Excluir
                </button>

            </div>

        `;
    });

    let contador =
        document.getElementById("contador");

    if(contador){

        contador.innerHTML =
            mensagens.length;
    }
}

function excluirMensagem(index){

    let mensagens =
        JSON.parse(localStorage.getItem("mensagens"))
        || [];

    mensagens.splice(index,1);

    localStorage.setItem(
        "mensagens",
        JSON.stringify(mensagens)
    );

    mostrarMensagens();
}

// AGENDA

function adicionarAgenda(){

    let data =
        document.getElementById("dataAgenda").value;

    let horario =
        document.getElementById("horario").value;

    let atividade =
        document.getElementById("atividade").value;

    if(
        data == "" ||
        horario == "" ||
        atividade == ""
    ){

        alert("Preencha todos os campos.");

    }else{

        let agenda =
            JSON.parse(localStorage.getItem("agenda"))
            || [];

        agenda.push({

            data:data,

            horario:horario,

            atividade:atividade

        });

        localStorage.setItem(
            "agenda",
            JSON.stringify(agenda)
        );

        mostrarAgenda();

        document.getElementById("dataAgenda").value = "";

        document.getElementById("horario").value = "";

        document.getElementById("atividade").value = "";
    }
}

function mostrarAgenda(){

    let lista =
        document.getElementById("listaAgenda");

    if(!lista) return;

    lista.innerHTML = "";

    let agenda =
        JSON.parse(localStorage.getItem("agenda"))
        || [];

    agenda.forEach(function(item){

        lista.innerHTML += `

            <div class="card">

                <h3>${item.data}</h3>

                <h4>${item.horario}</h4>

                <p>${item.atividade}</p>

            </div>

        `;
    });
}

// RELATÓRIOS

function salvarRelatorio(){

    let profissional =
        document.getElementById("profissional").value;

    let relatorio =
        document.getElementById("relatorio").value;

    let humor =
        document.getElementById("humor").value;

    if(
        profissional == "" ||
        relatorio.trim() == "" ||
        humor.trim() == ""
    ){

        alert("Preencha todos os campos.");

    }else{

        let relatorios =
            JSON.parse(localStorage.getItem("relatorios"))
            || [];

        relatorios.push({

            profissional:profissional,

            texto:relatorio,

            humor:humor,

            data:new Date().toLocaleDateString(),

            hora:new Date().toLocaleTimeString()

        });

        localStorage.setItem(
            "relatorios",
            JSON.stringify(relatorios)
        );

        localStorage.setItem("humor", humor);

        mostrarRelatorios();

        atualizarDashboard();

        document.getElementById("profissional").value = "";

        document.getElementById("relatorio").value = "";

        document.getElementById("humor").value = "";

        document.getElementById("resultadoHumor").innerHTML =
            "Relatório salvo com sucesso!";
    }
}

function mostrarRelatorios(){

    let lista =
        document.getElementById("listaRelatorios");

    if(!lista) return;

    lista.innerHTML = "";

    let relatorios =
        JSON.parse(localStorage.getItem("relatorios"))
        || [];

    relatorios.forEach(function(rel){

        lista.innerHTML += `

            <div class="card">

                <h4>${rel.data} - ${rel.hora}</h4>

                <h3>Profissional</h3>

                <p>${rel.profissional}</p>

                <h3>Humor</h3>

                <p>${rel.humor}</p>

                <h3>Relatório</h3>

                <p>${rel.texto}</p>

            </div>

        `;
    });
}

// DASHBOARD

function atualizarDashboard(){

    let mensagens =
        JSON.parse(localStorage.getItem("mensagens"))
        || [];

    let relatorios =
        JSON.parse(localStorage.getItem("relatorios"))
        || [];

    let humor =
        localStorage.getItem("humor")
        || "Não informado";

    let nome =
        localStorage.getItem("nomeCrianca")
        || "-";

    let idade =
        localStorage.getItem("idadeCrianca")
        || "-";

    let turma =
        localStorage.getItem("turmaCrianca")
        || "-";

    document.getElementById("painelNome").innerHTML =
        nome;

    document.getElementById("painelIdade").innerHTML =
        idade + " anos";

    document.getElementById("painelTurma").innerHTML =
        turma;

    document.getElementById("painelHumor").innerHTML =
        humor;

    document.getElementById("painelMensagens").innerHTML =
        mensagens.length;

    document.getElementById("painelRelatorios").innerHTML =
        relatorios.length;

    let nomeTopo =
        document.getElementById("nomeTopo");

    if(nomeTopo){

        nomeTopo.innerHTML =
            "Aluno(a): " + nome;
    }
}

// INICIALIZAÇÃO

window.onload = function(){

    verificarLogin();

    mostrarMensagens();

    mostrarAgenda();

    mostrarRelatorios();

    atualizarDashboard();

    let modoEscuro =
        localStorage.getItem("modoEscuro");

    if(modoEscuro == "true"){

        document.body.classList.add("dark-mode");
    }
}