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
app.use(bodyParser.urlencoded({ extended: true })); // Middleware adicionado para permitir requisições URL-encoded

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
        res.setHeader('Content-Type', 'application/json');  // Garantindo que a resposta seja JSON
        res.json(results);
    });
});

app.put('/pacientes/:id', (req, res) => {
    const pacienteId = req.params.id;
    const { nome, email, cpf, idade, celular, cep, sus, senha, genero, paciente_pdf } = req.body;

    // Query para atualizar os dados do paciente no banco de dados
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
    console.log("Link recebido:", pdfLink);  // Verificação do valor recebido

    const query = 'UPDATE pacientes SET paciente_pdf = ? WHERE paciente_id = ?';
    db.query(query, [pdfLink, paciente_id], (err, result) => {
        if (err) {
            console.error("Erro ao atualizar PDF:", err);
            return res.status(500).json({ message: 'Erro ao atualizar PDF.' });
        }

        // Adicione esta linha para garantir que o cabeçalho Content-Type seja JSON
        res.setHeader('Content-Type', 'application/json');

        res.status(200).json({ message: 'PDF atualizado com sucesso.' });
    });
});

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
