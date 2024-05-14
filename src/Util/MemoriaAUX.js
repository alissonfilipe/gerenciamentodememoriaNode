class MemoriaAUX {
    constructor(idp, tamanho, idm) {
        // Inicializa os atributos da classe com os valores fornecidos
        this.idP = idp;
        this.idM = idm;
        this.tamanho = tamanho;
    }

    // Métodos para obter e definir o ID do processo associado à memória
    getIdp() {
        return this.idP;
    }

    setIdP(id) {
        this.idP = id;
    }

    // Métodos para obter e definir o ID da memória associada ao processo
    getIdm() {
        return this.idM;
    }

    setIdm(id) {
        this.idM = id;
    }

    // Métodos para obter e definir o tamanho da memória
    getTamanho() {
        return this.tamanho;
    }

    setTamanho(tamanho) {
        this.tamanho = tamanho;
    }

    // Método para representar o objeto como uma string
    toString() {
        return `MemoriaAUX [idP=${this.idP}, idM=${this.idM}, tamanho=${this.tamanho}]`;
    }
}

module.exports = MemoriaAUX; // Exporta a classe MemoriaAUX para uso externo

/* Este código define uma classe MemoriaAUX com construtor e métodos para manipular atributos como o ID do processo associado à memória, 
o ID da memória associada ao processo e o tamanho da memória, além de um método toString para representar o objeto como uma string formatada. */