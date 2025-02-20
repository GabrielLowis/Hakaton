document.getElementById("btn-login").addEventListener("click", () => {
  const valueLogin = document.getElementById("input-email").value;
  const valueSenha = document.getElementById("input-passwrd").value;

  console.log(valueLogin);
  console.log(valueSenha);

  valueLogin && valueSenha
    ? showToast(
        "Entrando...",
        "rgb(14, 105, 255)",
        "rgb(54, 124, 255)"
      )
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
        console.log("nok");
      }
    })
    .then((dados) => {
      if (dados.length === 0) {
        showToast("Usuário não existe", "rgb(255, 0 ,0)", "rgb(255, 10, 10)");
      } else {
        console.log(dados);
        console.log("ID DO USUARIO: " + dados[0].id);

        const passwrd = dados[0].senha;

        if (valueSenha === passwrd) {
          console.log("Senha correta");
          let id = dados[0].id;
          // nivel = dados[0].nivel

          console.log("TESTE: " + id);

          localStorage.setItem("idUser", id);

          // localStorage.setItem('nivel', nivel)

          // if (dados[0].nivel === 1) {
          window.location.href = "http://localhost:5500/front/pages/tasks.html";
          // } else if (dados[0].nivel === 2) {
          // window.location.href = 'http://localhost:5500/front/pages/tasks.html';
          // }
        } else {
          showToast("Senha incorreta", "rgb(255, 0 ,0)", "rgb(255, 10, 10)");
        }
      }
    });
});

document.getElementById("sign-up").addEventListener("click", () => {
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

  // console.log(inputNome);
  // console.log(inputEmailCadastro);
  // console.log(inputSenhaCadastro);

  fetch(`http://localhost:3030/create/user`, {
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
    .then((data) => console.log(data))
    .catch((error) => console.error("Erro:", error));
});
