let idUser = localStorage.getItem("idUser");

const urlParams = new URLSearchParams(window.location.search);
const source = urlParams.get("source");

const deleteTaskBtn = document.getElementById("delete-btn");
const updateTaskBtn = document.getElementById("btn-update-task");

const inputResponsible = document.getElementById("input-responsible");
const inputTaskName = document.getElementById("input-task-name");
const inputDeadline = document.getElementById("input-deadline");
const status = document.getElementById("status");
const priority = document.getElementById("priority");
const inputMessage = document.getElementById("input-message");

fetch(`http://localhost:3030/task/${source}`)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
    }
  })
  .then((dados) => {
    inputTaskName.value = dados[0].title;

    const dataFormatada = new Date(dados[0].prazo).toISOString().split("T")[0];
    inputDeadline.value = dataFormatada;

    status.value = dados[0].status;

    priority.value = dados[0].prioridade;

    inputResponsible.value = dados[0].responsavel;

    inputMessage.value = dados[0].descricao;
  });

//Botão de atualizar tarefa

// Botão de deletar
deleteTaskBtn.addEventListener("click", () => {
  fetch(`http://localhost:3030/delete/task/${source}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        showToast(
          "Tarefa deletada com sucesso!",
          "rgb(54, 195, 89)",
          "rgb(54, 210, 80)"
        );
        window.location.href = "index.html";
      } else {
        console.error("Erro ao deletar a tarefa");
        alert("Erro ao deletar a tarefa");
      }
    })
    .catch((error) => console.error("Erro na requisição:", error));

  window.location.href = "http://localhost:5500/front/pages/tasks.html";
});

updateTaskBtn.addEventListener("click", () => {
  const inputResponsible = document.getElementById("input-responsible").value;
  const inputTaskName = document.getElementById("input-task-name").value;
  const inputDeadline = document.getElementById("input-deadline").value;
  const status = document.getElementById("status").value;
  const priority = document.getElementById("priority").value;
  const inputMessage = document.getElementById("input-message").value;

  fetch(`http://localhost:3030/tasks/updateTask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      inputTaskName: inputTaskName,
      inputMessage: inputMessage,
      status: status,
      inputResponsible: inputResponsible,
      priority: priority,
      inputDeadline: inputDeadline,
      source: source,
    }),
  })
    .then((response) => {
      if (response.status === 200) {
        alert("Tarefa atualizada com sucesso");
        console.log("Tarefa atualizada com sucesso");
        window.location.href = "http://localhost:5500/front/pages/tasks.html";
        return response.json();
      } else {
        alert("Erro ao atualizar a tarefa");
        throw new Error("Erro ao atualizar a tarefa");
      }
    })
    .then((dados) => {});
});

fetch(`http://localhost:3030/users/userId/${idUser}`)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      console.log("nok");
    }
  })
  .then((dados) => {
        if (dados[0].nivel === 2) {
            const btnGerenciar = document.getElementById('btnGerenciar');

            btnGerenciar.style.display = 'none';
        }
    });