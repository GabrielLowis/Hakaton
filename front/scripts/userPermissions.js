document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".deleteBtn").forEach(button => {
        button.addEventListener("click", (event) => {
            // Captura a linha (tr) onde o botão foi clicado
            const row = event.target.closest("tr");
            const userEmail = row.querySelector(".userLogin").textContent.trim(); // Captura o e-mail do usuário

            // Confirmação antes de deletar
            if (!confirm(`Tem certeza que deseja excluir o usuário ${userEmail}?`)) {
                return;
            }

            // Faz a requisição DELETE
            fetch(`http://localhost:3030/users/${userEmail}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro ao excluir usuário.");
                }
                return response.json();
            })
            .then(() => {
                // Remove a linha da tabela após exclusão bem-sucedida
                row.remove();
                alert(`Usuário ${userEmail} foi excluído com sucesso.`);
            })
            .catch(error => {
                console.error("Erro:", error);
                alert("Erro ao excluir usuário.");
            });
        });
    });
});
