import * as corpusTools from "https://cdn.skypack.dev/corpus_tools@1.0.0";
const ct = corpusTools;

let text = document.getElementById('text').value;
document.getElementById("btn-tokens").addEventListener("click", tokenizer);
document.getElementById("btn-concordance").addEventListener("click", concordance);
document.getElementById("btn-ngram").addEventListener("click", ngram);

function tokenizer() {
    text = document.getElementById('text').value;

    const boxes = document.getElementsByName('tokenizer');
    document.getElementById('res').innerHTML = ``;

    boxes.forEach(box => {
        if (box.checked) {
            if (box.value == 'tokens') {
                document.getElementById('res').innerHTML += `
                    <div class="col-4">
                        <h4>List of tokens</h4>
                        <ol>${ct.tokens(text).map(token => listTokens(token)).join('')}</ol>
                    </div>`;
            } else if (box.value == 'types') {
                document.getElementById('res').innerHTML += `
                    <div class="col-4">
                        <h4>Types frecuency</h4>
                        <table>
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Frecuency</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${Object.entries(ct.types(text)).map(token => listTypes(token)).join('')}
                            </tbody>
                        </table>
                    </div>`; 
            } else if (box.value == 'richness') {
                document.getElementById('res').innerHTML += `
                    <div class="col-4">
                        <h5><strong>Lexical Richness:</strong> ${ct.richness(text)}</h5>
                    </div>`
            }
        }
    }) 
}

function listTokens(item) {
    return `<li>${item}</li>`
}


function listTypes(item) {
    return `
    <tr>
        <td>${item[0]}</td>
        <td>${item[1]}</td>
    </tr>`
}

function concordance() {
    text = document.getElementById('text').value;
    const word = document.getElementById('word').value;

    document.getElementById('res').innerHTML = ``;
    document.getElementById('res').innerHTML += `
        <div class="col-12">
            <h4>Concocordance Results</h4>
            <ol>${ct.concordance(text, word).map(token => listTokens(styleConcordance(token, word))).join('')}</ol>
        </div>`;
}

function styleConcordance(str, w) {
    const reg = new RegExp(w, 'i')
    return str.replace(reg, `<strong>$&</strong>`)
}

function ngram() {
    text = document.getElementById('text').value;

    const radios = document.getElementsByName('n-grams');

    radios.forEach(radio => {
        if(radio.checked) {
            if(radio.value == 'bigram'){
                document.getElementById('res').innerHTML = `
                    <div class="col-12">
                        <h4>List of 2-grams</h4>
                        <ol>${ct.n_gram(text, 2).map(ngram => listTokens(ngram)).join('')}</ol>
                    </div>`;
            } else if(radio.value == 'trigram'){
                document.getElementById('res').innerHTML = `
                <div class="col-12">
                    <h4>List of 3-grams</h4>
                    <ol>${ct.n_gram(text, 3).map(ngram => listTokens(ngram)).join('')}</ol>
                </h4>`;
            }
        }
    });
}