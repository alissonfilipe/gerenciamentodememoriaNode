class Processo {
    constructor(computacao, alocado, visitado, id) {
        // Inicializa os atributos da classe com os valores fornecidos
        this.id = id;
        this.computacao = computacao;
        this.alocado = alocado;
        this.visitado = visitado;
    }

    // Métodos para obter e definir o ID do processo
    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    // Métodos para obter e definir o tempo de computação do processo
    getComputacao() {
        return this.computacao;
    }

    setComputacao(computacao) {
        this.computacao = computacao;
    }

    // Métodos para obter e definir se o processo está alocado
    getAlocado() {
        return this.alocado;
    }

    setAlocado(alocado) {
        this.alocado = alocado;
    }

    // Métodos para obter e definir se o processo foi visitado
    getVisitado() {
        return this.visitado;
    }

    setVisitado(visitado) {
        this.visitado = visitado;
    }

    // Método para representar o objeto como uma string
    toString() {
        return `Processo [id=${this.id}, computacao=${this.computacao}, alocado=${this.alocado}, visitado=${this.visitado}]`;
    }
}

module.exports = Processo; // Exporta a classe Processo para uso externo
/*Este código define uma classe Processo com construtor e métodos para manipular atributos como o ID do processo, tempo de computação,
 se está alocado e se foi visitado, além de um método toString para representar o objeto como uma string formatada. */