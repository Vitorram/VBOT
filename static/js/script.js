let roteiroAtual = [];
let cidadeAtual = "";

async function gerarRoteiro() {
    const cidade = document.getElementById('cidadeInput').value;
    const btn = document.getElementById('btnGerar');
    const actionsDiv = document.getElementById('actionButtons');
    const loading = document.getElementById('loading');
    const timeline = document.getElementById('timeline');

    if(!cidade) return alert("Por favor, digite uma cidade.");

    btn.disabled = true;
    btn.innerText = "...";
    loading.style.display = 'block';
    timeline.style.display = 'none';
    actionsDiv.style.display = 'none'; 

    try {
        const response = await fetch('/gerar-roteiro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cidade: cidade })
        });

        const data = await response.json();

        if (data.erro) {
            alert("Erro: " + data.erro);
        } else {
            roteiroAtual = data;
            cidadeAtual = cidade;
            renderizarRoteiro(data);
        }

    } catch (error) {
        alert("Erro de conexão.");
        console.error(error);
    } finally {
        btn.disabled = false;
        btn.innerText = "Gerar";
        loading.style.display = 'none';
    }
}

function renderizarRoteiro(roteiro) {
    const timeline = document.getElementById('timeline');
    const actionsDiv = document.getElementById('actionButtons');
    
    timeline.innerHTML = '';
    
    timeline.innerHTML += `<div style="text-align:center; margin-bottom:20px; font-weight:bold; display:none;" class="pdf-only">Roteiro: ${cidadeAtual}</div>`;

    roteiro.forEach(dia => {
        const card = `
            <div class="day-card">
                <div class="day-title">DIA ${dia.dia}</div>
                
                <div class="activity-group">
                    <span class="activity-label">MANHÃ</span>
                    <div class="activity-text">${dia.manha}</div>
                </div>
                <div class="activity-group">
                    <span class="activity-label">TARDE</span>
                    <div class="activity-text">${dia.tarde}</div>
                </div>
                <div class="activity-group">
                    <span class="activity-label">NOITE</span>
                    <div class="activity-text">${dia.noite}</div>
                </div>

                <div class="cost">Custo: ${dia.custo_estimado}</div>
            </div>
        `;
        timeline.innerHTML += card;
    });

    timeline.style.display = 'block';
    actionsDiv.style.display = 'flex'; 
}

function baixarPDF() {
    const elemento = document.getElementById('timeline');
    const titulos = document.querySelectorAll('.pdf-only');
    
    titulos.forEach(t => t.style.display = 'block');

    const opcoes = {
        margin: 10,
        filename: `roteiro-${cidadeAtual}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opcoes).from(elemento).save().then(() => {
        titulos.forEach(t => t.style.display = 'none');
    });
}

function copiarTexto() {
    if (!roteiroAtual.length) return;

    let texto = ` *Roteiro para ${cidadeAtual}*\nCriado via VBOT\n\n`;

    roteiroAtual.forEach(dia => {
        texto += ` *DIA ${dia.dia}*\n`;
        texto += ` Manhã: ${dia.manha}\n`;
        texto += ` Tarde: ${dia.tarde}\n`;
        texto += ` Noite: ${dia.noite}\n`;
        texto += ` Custo: ${dia.custo_estimado}\n\n`;
    });

    navigator.clipboard.writeText(texto).then(() => {
        const btn = document.getElementById('btnCopiar');
        const textoOriginal = btn.innerText;
        btn.innerText = "Copiado! ✅";
        setTimeout(() => {
            btn.innerText = textoOriginal;
        }, 2000);
    }).catch(err => {
        alert("Erro ao copiar.");
    });
}