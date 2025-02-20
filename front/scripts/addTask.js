const idUser = localStorage.getItem("idUser");


document.getElementById("btn-add-task").addEventListener("click", async () => {

  if (!idUser) {
    showToast("Erro: Usuário não identificado!", "rgb(255, 0 ,0)", "rgb(255, 10, 10)");
    return;
  }

  try {
    const response = await fetch(`http://localhost:3030/users/userId/${idUser}`);
    
    if (!response.ok) {
      showToast("Erro ao buscar usuário!", "rgb(255, 0 ,0)", "rgb(255, 10, 10)");
      return;
    }

    const user = await response.json();

    if (!user || user.length === 0 || user[0].nivel !== 1) {
      showToast("Você não tem permissão para criar tarefas!", "rgb(255, 0 ,0)", "rgb(255, 10, 10)");
      return;
    }

    const inputResponsible = document.getElementById("input-responsible").value;
    const inputTaskName = document.getElementById("input-task-name").value;
    const inputDeadline = document.getElementById("input-deadline").value;
    const status = document.getElementById("status").value;
    const priority = document.getElementById("priority").value;
    const inputMessage = document.getElementById("input-message").value;

    if (!(priority && inputTaskName && inputDeadline && status && inputMessage)) {
      showToast("Preencha os dados corretamente!", "rgb(255, 0 ,0)", "rgb(255, 10, 10)");
      return;
    }

    showToast("Adicionando tarefa...", "rgb(14, 105, 255)", "rgb(54, 124, 255)");

    const taskResponse = await fetch(`http://localhost:3030/create/task`, {
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
    });

    if (!taskResponse.ok) {
      showToast("Erro ao adicionar tarefa", "rgb(255, 0 ,0)", "rgb(255, 10, 10)");
      return;
    }

    showToast("Tarefa adicionada!", "rgb(54, 195, 89)", "rgb(54, 210, 80)");
  } catch (error) {
    console.error("Erro ao processar a requisição:", error);
    showToast("Erro inesperado!", "rgb(255, 0 ,0)", "rgb(255, 10, 10)");
  }
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
