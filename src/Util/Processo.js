class Processo {
    constructor(computacao, alocado, visitado, id) {
        this.id = id;
        this.computacao = computacao;
        this.alocado = alocado;
        this.visitado = visitado;
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getComputacao() {
        return this.computacao;
    }

    setComputacao(computacao) {
        this.computacao = computacao;
    }

    getAlocado() {
        return this.alocado;
    }

    setAlocado(alocado) {
        this.alocado = alocado;
    }

    getVisitado() {
        return this.visitado;
    }

    setVisitado(visitado) {
        this.visitado = visitado;
    }

    toString() {
        return `Processo [id=${this.id}, computacao=${this.computacao}, alocado=${this.alocado}, visitado=${this.visitado}]`;
    }
}

module.exports = Processo;