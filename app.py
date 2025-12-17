import os
import json
import time
from flask import Flask, render_template, request, jsonify
import google.generativeai as genai

app = Flask(__name__)

# ==========================================
#  A key fica aqui, (Se voce fizer um clone desse projeto, lembre-se de tomar cuidado com a key)
# ==========================================
GOOGLE_API_KEY = "" 

# Configura a chave globalmente
genai.configure(api_key=GOOGLE_API_KEY)

# lista de modelos para tentar (do melhor/mais provável para o backup)
MODELOS_PARA_TENTAR = [
    "gemini-exp-1206",      
    "gemini-flash-latest",   
    "gemini-1.5-flash",     
    "gemini-1.5-pro"         
]

def tentar_gerar_conteudo(prompt):
   
    erros = []
    
    for nome_modelo in MODELOS_PARA_TENTAR:
        try:
            #fica de olho no console pitbull
            print(f"Tentando usar o modelo: {nome_modelo}...")
            model = genai.GenerativeModel(nome_modelo)
            response = model.generate_content(prompt)
            print(f"Sucesso com o modelo: {nome_modelo}!")
            return response
        except Exception as e:
            erro_msg = str(e)
            print(f"Falha no {nome_modelo}: {erro_msg}")
            
           
            if "429" in erro_msg:
                time.sleep(2)
            
            erros.append(f"{nome_modelo}: {erro_msg}")
    

    raise Exception(f"Todos os modelos falharam. Detalhes: {erros}")

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/gerar-roteiro', methods=['POST'])
def gerar_roteiro():
    try:
        dados = request.get_json()
        cidade = dados.get('cidade')
        
        if not cidade:
            return jsonify({"erro": "Cidade não informada"}), 400

        print(f"\nIniciando geração de roteiro para: {cidade}")

        # Prompt para a IA 
        prompt = f"""
        Aja como um guia de viagens. Crie um roteiro de 3 dias para {cidade}.
        
        REGRAS OBRIGATÓRIAS:
        1. Responda APENAS com um JSON válido.
        2. NÃO use Markdown (sem ```json).
        3. Formato EXATO do JSON:
        [
            {{
                "dia": 1,
                "manha": "Atividade A",
                "tarde": "Atividade B",
                "noite": "Atividade C",
                "custo_estimado": "R$ 100"
            }}
        ]
        """

        # tentar vários modelos
        response = tentar_gerar_conteudo(prompt)
        
        texto_limpo = response.text.replace("```json", "").replace("```", "").strip()
        inicio = texto_limpo.find('[')
        fim = texto_limpo.rfind(']') + 1
        
        if inicio == -1:
            raise ValueError("A IA respondeu, mas não gerou um JSON válido.")
            
        json_final = json.loads(texto_limpo[inicio:fim])
        
        return jsonify(json_final)

    except Exception as e:
        erro_detalhado = str(e)
        print(f"ERRO FINAL: {erro_detalhado}")
        return jsonify({"erro": f"Erro técnico: {erro_detalhado}"}), 500

#codespaces
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)