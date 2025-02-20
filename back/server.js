const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "bd_hakaton"
});

connection.getConnection((err, conn) => {
    if (err) {
        console.error("Erro ao conectar ao MySQL:", err);
    } else {
        console.log("Conectado ao MySQL com sucesso!");
        conn.release();
    }
});

const app = new express();
app.listen(3030, () => {
  console.log('Servidor Iniciado');
});

app.use(cors());
app.use(express.json());

//ROTAS ----------------------------------------
app.get("/", (req, res) => {
  res.send("Olá Mundo!");
});

//BUSCA TODOS OS USUARIOS
app.get("/users", (req, res) => {
    connection.query("SELECT * from users", (err, results) => {
        if (err) {
            return res.status(500).send('MySQL Connection error');
        }
        res.json(results);
    });
});

//SELECIONA TUDO DE USERS DE UM LOGIN ESPECIFICO
app.get("/users/:login", (req, res) => {
  connection.query("SELECT * from users where login = ?", [req.params.login], (err, results) => {
      if (err) {
          return res.status(500).send('MySQL Connection error');
      }
      res.json(results);
  });
});

// SELECIONA TUDO DE UM USER COM ID ESPECIFICO
app.get("/users/userId/:idUser", (req, res) => {
  connection.query("SELECT * from users where id = ?", [req.params.idUser], (err, results) => {
      if (err) {
          return res.status(500).send('MySQL Connection error');
      }
      res.json(results);
  });
});

// ATUALIZA O NÍVEL DE UM USUÁRIO
app.put("/users/updateLevel", (req, res) => {
    const { id, nivel } = req.body;

    if (!id || (nivel !== 1 && nivel !== 2)) {
        return res.status(400).json({ error: "ID do usuário e nível válido são obrigatórios!" });
    }

    connection.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
        if (err) {
            console.error("Erro ao buscar usuário:", err);
            return res.status(500).json({ error: "Erro ao buscar usuário" });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ error: "Usuário não encontrado!" });
        }

        connection.query(
            "UPDATE users SET nivel = ? WHERE id = ?",
            [nivel, id],
            (err, updateResults) => {
                if (err) {
                    console.error("Erro ao atualizar nível do usuário:", err);
                    return res.status(500).json({ error: "Erro ao atualizar nível do usuário" });
                }

                if (updateResults.affectedRows === 0) {
                    return res.status(400).json({ error: "Nenhuma alteração feita!" });
                }

                res.json({ message: "Nível do usuário atualizado com sucesso!" });
            }
        );
    });
});


 
//SELECIONA TUDO DE TASKS DE UM ID_USER ESPECIFICO
app.get("/tasks/:id_user", (req, res) => {
  connection.query("SELECT * from tasks where id_user = ?", [req.params.id_user], (err, results) => {
      if (err) {
          return res.status(500).send('MySQL Connection error');
      }
      res.json(results);
  });
});

//SELECIONA UMA TAREFA EM ESPECIFICO
app.get("/task/:idTask", (req, res) => {
  connection.query("SELECT * from tasks WHERE id = ?", [req.params.idTask], (err, results) => {
      if (err) {
          return res.status(500).send('MySQL Connection error');
      }
      res.json(results);
  });
});

//POSTA UM USUARIO NA TABELA USER
app.post("/create/user", (req, res) => {
  const { login, nome, senha } = req.body;

  if (!login || !nome || !senha) {
      return res.status(400).send("Todos os campos são obrigatórios");
  }

  connection.query("INSERT INTO users (login, nome, senha) VALUES (?, ?, ?)", [login, nome, senha], (err, results) => {
          if (err) {
              return res.status(500).send("MySQL Connection error");
          }
          res.json({ message: "Usuário criado com sucesso!", userId: results.insertId });
      }
  );
});


//CRIA UMA NOVA TASK
app.post("/create/task", (req, res) => {
  const { id_user, title, descricao, status, responsavel, prioridade, prazo } = req.body;

  if (!id_user || !title || !descricao || !status || !responsavel || !prioridade || !prazo) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  connection.query("INSERT INTO tasks (id_user, title, descricao, status, responsavel, prioridade, prazo) VALUES (?, ?, ?, ?, ?, ?, ?)", [id_user, title, descricao, status, responsavel, prioridade, prazo], (err, results) => {
          if (err) {
              return res.status(500).send("MySQL Connection error");
          }
          res.json({ message: "Task Criada Com Sucesso!", userId: results.insertId });
      }
  );
});

//ATUALIZA (UPDATE) UMA NOVA TAREFA
app.post("/tasks/updateTask", (req, res) => {
    connection.query("UPDATE tasks SET title = ?, descricao = ?, status = ?, responsavel = ?, prioridade = ?, prazo = ? WHERE id = ?",
        [req.body.inputTaskName, req.body.inputMessage, req.body.status, req.body.inputResponsible, req.body.priority, req.body.inputDeadline, req.body.source],
        (err, results) => {
            if (err) {
                console.error('MySQL Connection error:', err);
                return res.status(500).send('MySQL Connection error');
            }
            res.json('ok');
        }
    );
});

// DELETA UM USUÁRIO PELO LOGIN
app.delete("/delete/user/:login", (req, res) => {
  const { login } = req.params;

  connection.query("DELETE FROM users WHERE id = ?", [login], (err, results) => {
      if (err) {
          return res.status(500).send("MySQL Connection eerror");
      }
      if (results.affectedRows === 0) {
          return res.status(404).send("Usuário não encontrado");
      }
      res.json({ message: "Usuário deletado com sucesso!" });
  });
});

// DELETA UMA TAREFA PELO ID
app.delete("/delete/task/:idTask", (req, res) => {
  const { idTask } = req.params;

  connection.query("DELETE FROM tasks WHERE id = ?", [idTask], (err, results) => {
      if (err) {
          return res.status(500).send("MySQL Connection error");
      }
      if (results.affectedRows === 0) {
          return res.status(404).send("Tarefa não encontrada");
      }
      res.json({ message: "Tarefa deletada com sucesso!" });
  });
});
