require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error('❌ ERRO: Chave da API não encontrada. Verifique seu arquivo .env!');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/chat', async (req, res) => {
    try {
        const { prompt, model: modelName = 'gemini-2.5-flash' } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt é obrigatório' });
        }

        const supportedModels = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-1.5-pro'];
        if (!supportedModels.includes(modelName)) {
            return res.status(400).json({ error: `Modelo inválido. Use: ${supportedModels.join(', ')}` });
        }

        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        const response = await result.response.text();

        res.json({ response, model: modelName });
    } catch (error) {
        console.error('Erro no chat:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log('Acesse a interface bonita no navegador!');
});
