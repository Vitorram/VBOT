
#aqui vai listar os modelos que voce tem disponivel para usar, tem que gerar uma key antes

import google.generativeai as genai

#Coloca ela aqui
genai.configure(api_key="")

print("--- LISTA DE MODELOS DISPONÍVEIS NA SUA CONTA ---")
try:
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(f"Nome encontrado: {m.name}")
except Exception as e:
    print(f"Erro ao listar: {e}")
print("------------------------------------------------")