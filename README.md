
# ✈️ VBOT - Planejador de Viagens com IA

> Um assistente de viagens minimalista que gera roteiros turísticos completos de 3 dias, calcula custos e exporta para PDF.

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=CONCLUIDO&color=GREEN&style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
## 🧠 Sobre o Projeto

O **VBOT** é uma aplicação web que utiliza a API do **Google Gemini (Modelos 2.0 e Experimentais)** para atuar como um guia de viagens inteligente. 

Diferente de um chat comum, o VBOT estrutura os dados estritamente em **JSON**, permitindo que o Frontend renderize uma interface visual limpa (Timeline), em vez de apenas blocos de texto.

### 🚀 Principais Funcionalidades

* **Geração de Roteiros:** Criação de itinerários de 3 dias (Manhã, Tarde, Noite).
* **Estimativa de Custos:** A IA calcula uma média de gastos para o dia.
* **Resiliência a Falhas:** Sistema inteligente de *fallback*. Se o modelo principal (`gemini-exp-1206`) atingir a cota (Erro 429), o sistema tenta automaticamente modelos mais leves (`flash`) sem travar para o usuário.
* **Exportação PDF:** Geração de arquivo PDF formatado direto no navegador (Client-side).
* **Compartilhamento Fácil:** Botão para copiar o roteiro formatado com emojis para colar no WhatsApp.
* **Interface Clean:** Design minimalista focado na experiência do usuário.

## 🛠 Tecnologias Utilizadas

* **Backend:** Python 3, Flask.
* **IA:** Google Generative AI (Gemini API).
* **Frontend:** HTML5, CSS3, JavaScript (Vanilla).
* **Bibliotecas Extras:** `html2pdf.js` (para geração de PDF).

## 📂 Estrutura do Projeto

O projeto segue o padrão MVC (Model-View-Controller) simplificado do Flask:

```text
vbot-viagens/
│
├── app.py                # Lógica do Backend, Rotas e Integração com IA
├── requirements.txt      # Dependências do projeto
│
├── static/               # Arquivos Estáticos (Assets)
│   ├── css/
│   │   └── style.css     # Estilização
│   └── js/
│       └── script.js     # Lógica do Frontend (Fetch, PDF, Copy)
│
└── templates/
    └── index.html        # Estrutura HTML
🔧 Como Rodar o Projeto
Pré-requisitos
Python 3 instalado.

Uma chave de API do Google AI Studio.

Passo a Passo
Clone o repositório

Bash

git clone [https://github.com/SEU-USUARIO/vbot-viagens.git](https://github.com/SEU-USUARIO/vbot-viagens.git)
cd vbot-viagens
Instale as dependências

Bash

pip install -r requirements.txt
Configure sua API Key Abra o arquivo app.py e insira sua chave na variável:

Python

GOOGLE_API_KEY = "SUA_CHAVE_AQUI"
(Nota: Em produção, recomenda-se usar variáveis de ambiente .env)

Execute o servidor

Bash

python app.py
Acesse Abra o navegador em http://localhost:5000
