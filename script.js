let tabmem = [];
let indiceEdicao = null;

const popupOverlaycss = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

class Aluno {
    constructor(nome, idade, matricula, curso, notaFinal) {
        this.nome = nome;
        this.idade = parseInt(idade);
        this.matricula = matricula;
        this.curso = curso;
        this.notaFinal = parseFloat(notaFinal);
    }

    isAprovado() {
        return this.notaFinal >= 7;
    }

    toString() {
        return `${this.nome}, Idade: ${this.idade}, Matrícula: ${this.matricula}, Curso: ${this.curso}, Nota Final: ${this.notaFinal}`;
    }
}

function adicionarDados() {
    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const matricula = document.getElementById("matricula").value;
    const curso = document.getElementById("curso").value;
    const notaFinal = parseFloat(document.getElementById("notaFinal").value);

    if (!nome || !idade || !matricula || !curso || isNaN(notaFinal)) {
        alert("Preencha todos os campos!");
        return;
    }

    if (indiceEdicao === null) {
        const aluno = new Aluno(nome, idade, matricula, curso, notaFinal);
        tabmem.push(aluno);
    } else {
        const aluno = tabmem[indiceEdicao];
        aluno.nome = nome;
        aluno.idade = idade;
        aluno.matricula = matricula;
        aluno.curso = curso;
        aluno.notaFinal = notaFinal;
        indiceEdicao = null;
    }

    atualizarTabela();
    limparCampos();
}

function atualizarTabela() {
    const tbody = document.querySelector("#minhaTabela tbody");
    tbody.innerHTML = "";

    tabmem.forEach((aluno, index) => {
        const row = tbody.insertRow();

        row.insertCell().textContent = aluno.nome;
        row.insertCell().textContent = aluno.idade;
        row.insertCell().textContent = aluno.matricula;
        row.insertCell().textContent = aluno.curso;
        row.insertCell().textContent = aluno.notaFinal.toFixed(2);

        const cellAcoes = row.insertCell();

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.onclick = () => editarAluno(index);
        cellAcoes.appendChild(btnEditar);

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.onclick = () => {
            tabmem.splice(index, 1);
            atualizarTabela();
        };
        cellAcoes.appendChild(btnExcluir);
    });
}

function editarAluno(index) {
    const aluno = tabmem[index];

    document.getElementById("nome").value = aluno.nome;
    document.getElementById("idade").value = aluno.idade;
    document.getElementById("matricula").value = aluno.matricula;
    document.getElementById("curso").value = aluno.curso;
    document.getElementById("notaFinal").value = aluno.notaFinal;

    indiceEdicao = index;
}

function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("idade").value = "";
    document.getElementById("matricula").value = "";
    document.getElementById("curso").value = "";
    document.getElementById("notaFinal").value = "";
}

function listarAlunosAprovados() {
    const alunosAprovados = tabmem.filter(aluno => aluno.isAprovado());
    let listaHTML = '';

    if (alunosAprovados.length > 0) {
        listaHTML += '<ul>';
        alunosAprovados.forEach(aluno => {
            listaHTML += `<li>${aluno.toString()}</li>`;
        });
        listaHTML += '</ul>';
    } else {
        listaHTML = '<p>Nenhum aluno aprovado encontrado.</p>';
    }

    const modalHTML = `
    <div style="
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        width: 90%;
        max-width: 400px;
        position: relative;
    ">
        <span onclick="document.getElementById('popupOverlay').remove()" style="
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 20px;
            cursor: pointer;
            color: #aaa;
        ">&times;</span>
        
        <h3>Alunos Aprovados</h3>
        ${listaHTML}
        
        <button onclick="document.getElementById('popupOverlay').remove()" style="
            padding: 8px 15px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 10px;
        ">Fechar</button>
    </div>`;

    abrirPopup(modalHTML);
}

function calcularMediaNotas() {
    if (tabmem.length === 0) {
        alert("Nenhum aluno cadastrado.");
        return;
    }

    const notas = tabmem.map(aluno => aluno.notaFinal);
    const somaNotas = notas.reduce((total, nota) => total + nota, 0);
    const media = somaNotas / notas.length;

    const modalHTML = `
    <div style="
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        width: 90%;
        max-width: 400px;
        position: relative;
    ">
        <h1>Média das Notas</h1>
        <p>Média: ${media.toFixed(2)}</p>

        <button onclick="document.getElementById('popupOverlay').remove()" style="
            padding: 8px 15px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 10px;
        ">Fechar</button>
    </div>
    `;

    abrirPopup(modalHTML);
}

function calcularMediaIdades() {
    if (tabmem.length === 0) {
        alert("Nenhum aluno cadastrado.");
        return;
    }

    const idades = tabmem.map(aluno => aluno.idade);
    const somaIdades = idades.reduce((total, idade) => total + idade, 0);
    const media = somaIdades / idades.length;

    const modalHTML = `
    <div style="
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        width: 90%;
        max-width: 400px;
        position: relative;
    ">
        <h1>Média das Idades</h1>
        <p>Média: ${media.toFixed(2)}</p>
    
        <button onclick="document.getElementById('popupOverlay').remove()" style="
            padding: 8px 15px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 10px;
        ">Fechar</button>
    </div>
    `;

    abrirPopup(modalHTML);
}

function listarAlunos() {
    const alunosOrdenados = tabmem.slice().sort((a, b) => a.nome.localeCompare(b.nome));

    let listaHTML = ''; 

    if (alunosOrdenados.length > 0) {
        listaHTML += '<ul style="list-style: none; padding: 0;">';
        alunosOrdenados.forEach(aluno => {
            listaHTML += `<li style="padding: 5px 0; border-bottom: 1px dashed #ddd;">${aluno.nome}</li>`;
        });
        listaHTML += '</ul>';
    } else {
        listaHTML = '<p>Nenhum aluno encontrado.</p>';
    }

    const modalHTML = `
    <div style="
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        width: 90%;
        max-width: 600px;
        position: relative;
    ">
        <span onclick="document.getElementById('popupOverlay').remove()" style="
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 20px;
            cursor: pointer;
            color: #aaa;
        ">&times;</span>
        
        <h3>Lista de Alunos (Ordem Alfabética)</h3>
        ${listaHTML}

        <button onclick="document.getElementById('popupOverlay').remove()" style="
            padding: 8px 15px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 10px;
        ">Fechar</button>
    </div>`;

    abrirPopup(modalHTML);
}

function listarAlunosporCurso() {
    const contagemPorCurso = {};
    tabmem.forEach(aluno => {
        const curso = aluno.curso;
        contagemPorCurso[curso] = (contagemPorCurso[curso] || 0) + 1;
    });

    let listaHTML = '';

    if (Object.keys(contagemPorCurso).length > 0) {
        listaHTML += '<ul>';
        Object.keys(contagemPorCurso).forEach(curso => {
            listaHTML += `<li>${curso}: ${contagemPorCurso[curso]}</li>`;
        });
        listaHTML += '</ul>';
    } else {
        listaHTML = '<p>Nenhum aluno encontrado.</p>';
    }

    const modalHTML = `
        <div style="
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        width: 90%;
        max-width: 400px;
        position: relative;
    ">
        <span onclick="document.getElementById('popupOverlay').remove()" style="
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 20px;
            cursor: pointer;
            color: #aaa;
        ">&times;</span>
        
        <h3>Quantidade de Alunos por Curso</h3>
        ${listaHTML}

        <button onclick="document.getElementById('popupOverlay').remove()" style="
            padding: 8px 15px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 10px;
        ">Fechar</button>
    </div>`;

    abrirPopup(modalHTML);
}

function abrirPopup(modalHTML) {
    const popupOverlay = document.createElement('div');
    popupOverlay.id = 'popupOverlay';
    popupOverlay.style.cssText = popupOverlaycss;
    popupOverlay.innerHTML = modalHTML;
    document.body.appendChild(popupOverlay);
}

window.adicionarDados = adicionarDados;
window.listarAlunosAprovados = listarAlunosAprovados;
window.calcularMediaNotas = calcularMediaNotas;
window.calcularMediaIdades = calcularMediaIdades;
window.listarAlunos = listarAlunos;
window.listarAlunosporCurso = listarAlunosporCurso;
