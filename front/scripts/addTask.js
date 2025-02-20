let idUser = localStorage.getItem("idUser");

console.log(idUser);

document.getElementById("btn-add-task").addEventListener("click", () => {
  const inputResponsible = document.getElementById("input-responsible").value;
  const inputTaskName = document.getElementById("input-task-name").value;
  const inputDeadline = document.getElementById("input-deadline").value;
  const status = document.getElementById("status").value;
  const priority = document.getElementById("priority").value;
  const inputMessage = document.getElementById("input-message").value;

  console.log(inputResponsible);
  console.log(inputTaskName);
  console.log(inputDeadline);
  console.log(inputMessage);
  console.log(priority);
  console.log(status);
  console.log("idUser: " + idUser);

  priority &&
  inputTaskName &&
  inputDeadline &&
  status &&
  priority &&
  inputMessage
    ? showToast(
        "Adicionando tarefa...",
        "rgb(14, 105, 255)",
        "rgb(54, 124, 255)"
      )
    : showToast(
        "Preencha os dados corretamente!",
        "rgb(255, 0 ,0)",
        "rgb(255, 10, 10)"
      );

  fetch(`http://localhost:3030/create/task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id_user: idUser,
      title: inputTaskName,
      descricao: inputMessage,
      status: status,
      responsavel: inputResponsible,
      prioridade: priority,
      prazo: inputDeadline,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        showToast("Erro ao adicionar tarefa", "rgb(255, 0 ,0)",
        "rgb(255, 10, 10)");
        return response.json().then((err) => {
          throw new Error(err.error);
        });
      }
      showToast("Tarefa adicionada!", "rgb(54, 195, 89)", "rgb(54, 210, 80)");
      return response.json();
    })
    .then((data) => console.log(data))
    .catch((error) => console.error("Erro:", error.message));
});

document.getElementById("reset-btn").addEventListener("click", () => {
  window.location.href = "http://localhost:5500/front/pages/tasks.html";
});
