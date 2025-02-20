const urlParams = new URLSearchParams(window.location.search);
const source = urlParams.get('source');
console.log(source); // Saída: teste

const deleteTaskBtn = document.getElementById("delete-btn")

const inputResponsible = document.getElementById("input-responsible");
const inputTaskName = document.getElementById("input-task-name");
const inputDeadline = document.getElementById("input-deadline");
const status = document.getElementById("status");
const priority = document.getElementById("priority");
const inputMessage = document.getElementById("input-message");


fetch(`http://localhost:3030/task/${source}`)
.then(response => {
    if (response.status === 200) {
        return response.json();
    } else {
        console.log('nok');
    }
})
.then(dados => {
    console.log(dados[0]);
    
    inputTaskName.value = dados[0].title;

    const dataFormatada = new Date(dados[0].prazo).toISOString().split("T")[0];
    // Definir o valor do input corretamente
    inputDeadline.value = dataFormatada;
    console.log(dataFormatada); // Para debug

    // status.value = dados[0].status;

    console.log(dados[0].status);

    priority.value = dados[0].prioridade;

    inputResponsible.value = dados[0].responsavel;

    inputMessage.value = dados[0].descricao;
})

// Botão de deletar
deleteTaskBtn.addEventListener("click", () => {
    fetch(`http://localhost:3030/delete/task/${source}`, {
        method: "DELETE",
    })
    .then(response => {
        if (response.ok) {
            showToast("Tarefa deletada com sucesso!", "rgb(54, 195, 89)", "rgb(54, 210, 80)");
            window.location.href = "index.html";
        } else {
            console.error("Erro ao deletar a tarefa");
            alert("Erro ao deletar a tarefa");
        }
    })
    .catch(error => console.error("Erro na requisição:", error));

    window.location.href = "http://localhost:5500/front/pages/tasks.html";
});
