const fs = require('fs');

class Arquivo {
    constructor() {
        this.escritor = null;
        this.algoritmos = new Set();
    }

    lerArquivo(FILENAME) {
        let mList = []; // Inicializa uma lista vazia para objetos tipo 'm'
        let ptList = []; // Inicializa uma lista vazia para objetos tipo 'p'
        try {
            let data = fs.readFileSync(FILENAME, 'utf8'); // Lê o conteúdo do arquivo especificado
            let lines = data.split('\n'); // Divide o conteúdo do arquivo em linhas
            let idProceso = 1; // Inicializa um contador para IDs dos objetos 'p'

            lines.forEach(line => { // Itera sobre cada linha do arquivo
                if (line.trim() !== '') { // Verifica se a linha não está vazia
                    if (line.includes(' ')) { // Verifica se a linha contém um espaço
                        let parts = line.split(' '); // Divide a linha em partes separadas por espaço
                        let m = { // Cria um objeto 'm' com os valores lidos
                            nome: parts[0], // O primeiro valor é o nome
                            valor1: parseInt(parts[1]), // O segundo valor é convertido para inteiro e armazenado em valor1
                            valor2: parseInt(parts[2]), // O terceiro valor é convertido para inteiro e armazenado em valor2
                            valor3: 0 // Inicializa valor3 como 0
                        };
                        mList.push(m); // Adiciona o objeto 'm' à lista mList
                    } else {
                        let p = { // Cria um objeto 'p' com os valores lidos
                            valor: parseInt(line), // Converte o valor da linha para inteiro e armazena em valor
                            valor2: 0, // Inicializa valor2 como 0
                            valor3: 0, // Inicializa valor3 como 0
                            id: idProceso // Atribui o ID atual
                        };
                        ptList.push(p); // Adiciona o objeto 'p' à lista ptList
                        idProceso++; // Incrementa o contador de ID
                    }
                }
            });

            if (!mList.length) { // Verifica se mList está vazia
                return ptList; // Retorna ptList se mList estiver vazia
            } else {
                return mList; // Retorna mList caso contrário
            }
        } catch (err) {
            console.error(err.message); // Exibe a mensagem de erro no console
            return null; // Retorna null em caso de erro
        }
    }


    arquivoSaida(texto, algoritmo) {
        try {
            // Verifica se o arquivo de saída ainda não existe e se o algoritmo ainda não foi registrado
            if (!fs.existsSync(`saida/${algoritmo}.txt`) && !this.algoritmos.has(algoritmo)) {
                // Cria o arquivo de saída vazio
                fs.writeFileSync(`saida/${algoritmo}.txt`, '');
                // Cria um escritor para o arquivo de saída em modo de anexo
                this.escritor = fs.createWriteStream(`saida/${algoritmo}.txt`, { flags: 'a' });
                // Adiciona o algoritmo à lista de algoritmos registrados
                this.algoritmos.add(algoritmo);
            }
            // Escreve o texto no arquivo de saída, seguido de uma quebra de linha
            this.escritor.write(texto + '\n');
            // Fecha o escritor
            this.escritor.end();
        } catch (err) {
            console.error(err); // Exibe qualquer erro ocorrido no console
        }
    }
}

module.exports = Arquivo; // Exporta a classe Arquivo para uso externo