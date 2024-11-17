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
app.use(bodyParser.urlencoded({ extended: true })); // Middleware para permitir requisições URL-encoded

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

// Rota para login
app.post('/login', (req, res) => {
    const { cpf, senha } = req.body;

    if (!cpf || !senha) {
        return res.status(400).json({ message: 'CPF e senha são obrigatórios.' });
    }

    const query = 'SELECT * FROM pacientes WHERE paciente_cpf = ? AND paciente_senha = ?';
    db.query(query, [cpf, senha], (err, results) => {
        if (err) {
            console.error('Erro ao fazer login:', err);
            return res.status(500).json({ message: 'Erro ao fazer login.' });
        }

        if (results.length > 0) {
            res.json({ message: 'Login bem-sucedido', paciente: results[0] });
        } else {
            res.status(401).json({ message: 'CPF ou senha incorretos.' });
        }
    });
});

// Rota para adicionar um novo paciente
app.post('/pacientes', (req, res) => {
    const { nome, email, cpf, idade, celular, cep, sus, senha, genero } = req.body;

    if (!nome || !email || !cpf || !idade || !celular || !cep || !sus || !senha || !genero) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const query = 'INSERT INTO pacientes (paciente_nome, paciente_email, paciente_cpf, paciente_idade, paciente_celular, paciente_cep, paciente_sus, paciente_senha, paciente_genero) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [nome, email, cpf, idade, celular, cep, sus, senha, genero], (err, result) => {
        if (err) {
            console.error('Erro ao inserir paciente no banco de dados:', err);
            return res.status(500).json({ message: 'Erro ao inserir paciente.' });
        }
        res.json({ message: 'Paciente cadastrado com sucesso!' });
    });
});

// Rota para listar todos os pacientes
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

// Rota para atualizar os dados do paciente
app.put('/pacientes/:id', (req, res) => {
    const pacienteId = req.params.id;
    const { nome, email, cpf, idade, celular, cep, sus, senha, genero, paciente_pdf } = req.body;

    const query = `
        UPDATE pacientes SET 
        paciente_nome = ?, 
        paciente_email = ?, 
        paciente_cpf = ?, 
        paciente_idade = ?, 
        paciente_celular = ?, 
        paciente_cep = ?, 
        paciente_sus = ?, 
        paciente_senha = ?, 
        paciente_genero = ?, 
        paciente_pdf = ? 
        WHERE paciente_id = ?`;

    const valores = [nome, email, cpf, idade, celular, cep, sus, senha, genero, paciente_pdf, pacienteId];

    db.query(query, valores, (err, result) => {
        if (err) {
            console.error('Erro ao atualizar paciente:', err);
            return res.status(500).json({ message: 'Erro ao atualizar paciente' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Paciente não encontrado.' });
        }

        res.json({ message: 'Paciente atualizado com sucesso' });
    });
});

// Rota para atualizar o link PDF do paciente
app.post('/atualizarPDF', (req, res) => {
    const { paciente_id, pdfLink } = req.body;

    const query = 'UPDATE pacientes SET paciente_pdf = ? WHERE paciente_id = ?';
    db.query(query, [pdfLink, paciente_id], (err, result) => {
        if (err) {
            console.error("Erro ao atualizar PDF:", err);
            return res.status(500).json({ message: 'Erro ao atualizar PDF.' });
        }

        res.json({ message: 'PDF atualizado com sucesso.' });
    });
});

// Rota para deletar um paciente
app.delete('/pacientes/:id', (req, res) => {
    const pacienteId = req.params.id;

    const query = 'DELETE FROM pacientes WHERE paciente_id = ?';
    db.query(query, [pacienteId], (err, result) => {
        if (err) {
            console.error('Erro ao deletar paciente:', err);
            return res.status(500).json({ message: 'Erro ao deletar paciente.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Paciente não encontrado.' });
        }

        res.json({ message: 'Paciente deletado com sucesso!' });
    });
});

// Função para reconectar ao MySQL em caso de perda de conexão
function handleDisconnect() {
    db.connect((err) => {
        if (err) {
            console.error('Erro ao reconectar ao banco de dados:', err);
            setTimeout(handleDisconnect, 2000); // Tentar reconectar após 2 segundos
        } else {
            console.log('Reconectado ao banco de dados MySQL.');
        }
    });
}

// Detectando desconexão do MySQL e tentando reconectar
db.on('error', (err) => {
    console.error('Erro no banco de dados:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        handleDisconnect();
    } else {
        throw err;
    }
});

// Iniciando o servidor
const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT} e acessível pela rede local`);
});
