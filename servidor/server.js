const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',  
    database: 'clinica_db'  
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL!');
});

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

app.get('/pacientes/:id/pdf', (req, res) => {
    const pacienteId = req.params.id;

    const query = 'SELECT paciente_pdf FROM pacientes WHERE paciente_id = ?';
    db.query(query, [pacienteId], (err, results) => {
        if (err) {
            console.error('Erro ao buscar PDF do paciente:', err);
            return res.status(500).json({ message: 'Erro ao buscar PDF do paciente.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Paciente não encontrado ou PDF não disponível.' });
        }

        res.json({ pdfLink: results[0].paciente_pdf });
    });
});

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

function handleDisconnect() {
    db.connect((err) => {
        if (err) {
            console.error('Erro ao reconectar ao banco de dados:', err);
            setTimeout(handleDisconnect, 2000); 
        } else {
            console.log('Reconectado ao banco de dados MySQL.');
        }
    });
}

db.on('error', (err) => {
    console.error('Erro no banco de dados:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        handleDisconnect();
    } else {
        throw err;
    }
});

const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT} e acessível pela rede local`);
});
