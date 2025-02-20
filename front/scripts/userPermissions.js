function showToast(text, fromColor, toColor) {
  Toastify({
    text,
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor: `linear-gradient(to right, ${fromColor}, ${toColor})`,
    style: { width: "200px" },
  }).showToast();
}

fetch("http://localhost:3030/users")
  .then((response) => response.json())
  .then((users) => {
    const tbody = document.querySelector("#userTable tbody");
    tbody.innerHTML = "";

    users.forEach((user) => {
      let htmlUser = `<tr class="table-row" data-user-id="${user.id}">
                  <td class="userName">${user.nome}</td>
                  <td class="userLogin">${user.login}</td>
                  <td class="userActions">
                      <button class="deleteBtn" onclick="deleteUser(${user.id})">🗑️</button>
                      <button class="permitBtn" onclick="updateUserLevel(${user.id}, 1)"><i class="fa-regular fa-circle-check"></i></button>
                      <button class="denyBtn" onclick="updateUserLevel(${user.id}, 2)"><i class="fa-regular fa-circle-xmark"></i></button>
                  </td>
              </tr>`;

      tbody.innerHTML += htmlUser;
    });

    restoreButtonStyles();
  })
  .catch((error) => console.error("Erro ao buscar usuários:", error));

function deleteUser(userId) {
  fetch(`http://localhost:3030/delete/user/${userId}`, {
    method: "DELETE",
  }).then((response) => {
    if (response.status === 200) {
      localStorage.removeItem(`userLevel-${userId}`);
      location.reload();
    } else {
      showToast(
        "Erro ao deletar usuário",
        "rgb(255, 0, 0)",
        "rgb(255, 10, 10)"
      );
    }
  });
}

function updateUserLevel(userId, level) {
  fetch("http://localhost:3030/users/updateLevel", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: userId, nivel: level }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        showToast(data.error, "rgb(255, 0 ,0)", "rgb(255, 10, 10)");
      } else {
        showToast(
          "Nível atualizado com sucesso!",
          "rgb(54, 195, 89)",
          "rgb(54, 210, 80)"
        );

        localStorage.setItem(`userLevel-${userId}`, level);

        updateButtonStyles(userId, level);
      }
    })
    .catch((error) => {
      showToast(
        "Erro ao atualizar nível!",
        "rgb(255, 0 ,0)",
        "rgb(255, 10, 10)"
      );
      console.error("Erro ao atualizar nível:", error);
    });
}

function restoreButtonStyles() {
  document.querySelectorAll("tr[data-user-id]").forEach((row) => {
    const userId = row.getAttribute("data-user-id");
    const savedLevel = localStorage.getItem(`userLevel-${userId}`);

    if (savedLevel) {
      updateButtonStyles(userId, parseInt(savedLevel));
    }
  });
}

function updateButtonStyles(userId, level) {
  const userRow = document.querySelector(`tr[data-user-id="${userId}"]`);
  if (userRow) {
    const permitBtn = userRow.querySelector(".permitBtn");
    const denyBtn = userRow.querySelector(".denyBtn");

    permitBtn.style.backgroundColor = "";
    denyBtn.style.backgroundColor = "";

    if (level === 1) {
      permitBtn.style.borderRadius = "50%";
      permitBtn.style.padding = "0 5px";
      permitBtn.style.backgroundColor = "rgba(54, 210, 80, 0.73)";
      denyBtn.style.backgroundColor = "";
    } else if (level === 2) {
      denyBtn.style.borderRadius = "50%";
      denyBtn.style.padding = "0 5px";
      denyBtn.style.backgroundColor = "rgba(255, 69, 69, 0.84)";
      permitBtn.style.backgroundColor = ""; 
    }
  }
}

document.addEventListener("DOMContentLoaded", restoreButtonStyles);
