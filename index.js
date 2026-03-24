// 1. Carrega o sistema de segurança (lê o arquivo .env)
require('dotenv').config();

// 2. Importa a biblioteca do Google Gemini
const { GoogleGenerativeAI } = require("@google/generative-ai");

// 3. Verifica se a chave foi carregada corretamente
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("❌ ERRO: Chave da API não encontrada. Verifique seu arquivo .env!");
    process.exit(1);
}

// 4. Conecta com a IA usando a sua chave secreta
const genAI = new GoogleGenerativeAI(apiKey);

async function executarAgente() {
    try {
        console.log("⏳ Conectando aos servidores do Google...");

        // 5. Escolhe o modelo de IA que vamos usar
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // 6. ENGENHARIA DE PROMPT (Sua vez de brilhar!)
        const prompt = "Fale como fazer um site basico e rapido com poucas palavras com sotaque de baiano";

        // 7. Envia a pergunta e espera (await) a resposta
        const result = await model.generateContent(prompt);
        const resposta = result.response.text();
        console.log("\n🤖 [AGENTE GEMINI]:");
        console.log(resposta);
        console.log("\n✅ Missão Concluída.");

    } catch (erro) {
        console.error("❌ Ocorreu um erro na conexão:", erro.message);
    }
}

// Roda o sistema CLI (web server separado)\nconsole.log('🚀 Para usar a interface web bonita: npm run dev');\nconsole.log('Acesse http://localhost:3000');\n// executarAgente();
