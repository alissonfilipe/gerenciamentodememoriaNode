class ProcessoN {
    constructor(id, tamanho) {
        // Inicializa os atributos da classe com os valores fornecidos
        this.id = id;
        this.tamanho = tamanho;
    }

    // Métodos para obter e definir o ID do processo
    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    // Métodos para obter e definir o tamanho do processo
    getTamanho() {
        return this.tamanho;
    }

    setTamanho(tamanho) {
        this.tamanho = tamanho;
    }

    // Método para representar o objeto como uma string
    toString() {
        return `id: ${this.id}, tamanho: ${this.tamanho}`;
    }
}

module.exports = ProcessoN; // Exporta a classe ProcessoN para uso externo

/**Este código define uma classe ProcessoN com construtor e métodos para 
manipular atributos como o ID e o tamanho do processo, além de um método toString para representar o objeto como uma string formatada. */