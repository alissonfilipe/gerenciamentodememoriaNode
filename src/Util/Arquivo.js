const fs = require('fs');

class Arquivo {
    constructor() {
        this.escritor = null;
        this.algoritmos = new Set();
    }

    lerArquivo(FILENAME) {
        let mList = [];
        let ptList = [];
        try {
            let data = fs.readFileSync(FILENAME, 'utf8');
            let lines = data.split('\n');
            let idProceso = 1;

            lines.forEach(line => {
                if (line.trim() !== '') {
                    if (line.includes(' ')) {
                        let parts = line.split(' ');
                        let m = {
                            nome: parts[0],
                            valor1: parseInt(parts[1]),
                            valor2: parseInt(parts[2]),
                            valor3: 0
                        };
                        mList.push(m);
                    } else {
                        let p = {
                            valor: parseInt(line),
                            valor2: 0,
                            valor3: 0,
                            id: idProceso
                        };
                        ptList.push(p);
                        idProceso++;
                    }
                }
            });

            if (!mList.length) {
                return ptList;
            } else {
                return mList;
            }
        } catch (err) {
            console.error(err.message);
            return null;
        }
    }

    arquivoSaida(texto, algoritmo) {
        try {
            if (!fs.existsSync(`saida/${algoritmo}.txt`) && !this.algoritmos.has(algoritmo)) {
                fs.writeFileSync(`saida/${algoritmo}.txt`, '');
                this.escritor = fs.createWriteStream(`saida/${algoritmo}.txt`, { flags: 'a' });
                this.algoritmos.add(algoritmo);
            }
            this.escritor.write(texto + '\n');
            this.escritor.end();
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = Arquivo;