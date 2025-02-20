let idUser = localStorage.getItem("idUser");

console.log("idUser:" + idUser);

fetch(`http://localhost:3030/tasks/${idUser}`)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      console.log("nok");
    }
  })
  .then((dados) => {
    dados.forEach((tarefa) => {
      const tbody = document.querySelector("#tbody");

      const dataFormatada = new Date(tarefa.prazo).toLocaleDateString("pt-BR", {
        timeZone: "UTC",
      });

      let htmlTask = `<tr>
                        <td id="task-title"><a href="../pages/infoTask.html?source=${tarefa.id}" id="link-task">${tarefa.title}</a></td>
                        <td id="task-status">${tarefa.status}</td>
                        <td id="task-responsavel">${tarefa.responsavel}</td>
                        <td id="task-prazo">${dataFormatada}</td>
                        <td id="task-prioridade">${tarefa.prioridade}</td>
                        <td id="task-descricao">${tarefa.descricao}</td>
                    </tr>`;

      tbody.innerHTML += htmlTask;
    });
  });


//
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
