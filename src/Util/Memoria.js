class Memoria {
    constructor(id, estado, inicio, tamanho) {
        // Inicializa os atributos da classe com os valores fornecidos
        this.idProcesso = id;
        this.estado = estado;
        this.inicio = inicio;
        this.tamanho = tamanho;
    }

    // Métodos para obter e definir o ID do processo
    getIdProcesso() {
        return this.idProcesso;
    }

    setIdProcesso(id) {
        this.idProcesso = id;
    }

    // Métodos para obter e definir o estado da memória
    getEstado() {
        return this.estado;
    }

    setEstado(estado) {
        this.estado = estado;
    }

    // Métodos para obter e definir o início da memória
    getInicio() {
        return this.inicio;
    }

    setInicio(inicio) {
        this.inicio = inicio;
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
        return `(id processo: ${this.idProcesso}), ${this.estado}, ${this.inicio}, ${this.tamanho}`;
    }
}

module.exports = Memoria; // Exporta a classe Memoria para uso externo

/*Este código define uma classe Memoria com construtor e métodos para manipular atributos como o ID do processo, estado, 
início e tamanho da memória, além de um método toString para representar o objeto como uma string formatada. */