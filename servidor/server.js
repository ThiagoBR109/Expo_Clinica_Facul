// Importando as dependências necessárias
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

// Criando uma instância do Express
const app = express();

// Configurando middlewares
app.use(cors());
app.use(bodyParser.json());

// Configurando a conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',  // Sua senha do MySQL, se tiver
    database: 'clinica_db'  // Nome do banco de dados
});

// Conectando ao banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL!');
});

// Rota para adicionar um novo paciente
app.post('/pacientes', (req, res) => {
    const { nome, email, cpf, idade, celular, cep, sus, senha, genero } = req.body;

    // Verificação básica para garantir que todos os campos estão preenchidos
    if (!nome || !email || !cpf || !idade || !celular || !cep || !sus || !senha || !genero) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    // Query para inserir o paciente no banco de dados
    const query = 'INSERT INTO pacientes (paciente_nome, paciente_email, paciente_cpf, paciente_idade, paciente_celular, paciente_cep, paciente_sus, paciente_senha, paciente_genero) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [nome, email, cpf, idade, celular, cep, sus, senha, genero], (err, result) => {
        if (err) {
            console.error('Erro ao inserir paciente no banco de dados:', err);
            return res.status(500).json({ message: 'Erro ao inserir paciente.' });
        }
        res.json({ message: 'Paciente cadastrado com sucesso!' });
    });
});

// Rota para listar todos os pacientes (exemplo de GET)
app.get('/pacientes', (req, res) => {
    const query = 'SELECT * FROM pacientes';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar pacientes:', err);
            return res.status(500).json({ message: 'Erro ao buscar pacientes.' });
        }
        res.json(results);
    });
});

const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT} e acessível pela rede local`);
});

