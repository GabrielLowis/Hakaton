document.getElementById("btn-login").addEventListener("click", () => {
  const valueLogin = document.getElementById("input-email").value;
  const valueSenha = document.getElementById("input-passwrd").value;

  valueLogin && valueSenha
    ? showToast("Entrando...", "rgb(14, 105, 255)", "rgb(54, 124, 255)")
    : showToast(
        "Preencha os dados corretamente",
        "rgb(255, 0 ,0)",
        "rgb(255, 10, 10)"
      );

  fetch(`http://localhost:3030/users/${valueLogin}`)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
      }
    })
    .then((dados) => {
      if (dados.length === 0) {
        showToast("Usuário não existe", "rgb(255, 0 ,0)", "rgb(255, 10, 10)");
      } else {
        const passwrd = dados[0].senha;
        if (valueSenha === passwrd) {
          let id = dados[0].id;

          localStorage.setItem("idUser", id);

          window.location.href = "http://localhost:5500/front/pages/tasks.html";
        } else {
          showToast("Senha incorreta", "rgb(255, 0 ,0)", "rgb(255, 10, 10)");
        }
      }
    });
});

document.getElementById("sign-up").addEventListener("click", (event) => {
  event.preventDefault();
  
  const inputNome = document.getElementById("input-nome").value;
  const inputEmailCadastro = document.getElementById(
    "input-email-cadastro"
  ).value;
  const inputSenhaCadastro = document.getElementById(
    "input-passwrd-cadastro"
  ).value;

  inputNome && inputEmailCadastro && inputSenhaCadastro
    ? showToast(
        "Cadastrando Usuário...",
        "rgb(14, 105, 255)",
        "rgb(54, 124, 255)"
      )
    : showToast(
        "Preencha os dados corretamente",
        "rgb(255, 0 ,0)",
        "rgb(255, 10, 10)"
      );

  fetch("http://localhost:3030/create/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      login: inputEmailCadastro,
      nome: inputNome,
      senha: inputSenhaCadastro,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      showToast("Usuário Cadastrado com Sucesso!", "rgb(54, 195, 89)", "rgb(54, 210, 80)");
      
      setTimeout(() => {
        window.location.href = "http://localhost:5500/front/";
      }, 2000);
    })
    .catch((error) => {
      console.error("Erro:", error);
      // showToast("Erro ao cadastrar usuário", "rgb(255, 0 ,0)", "rgb(255, 10, 10)");
    });
});
