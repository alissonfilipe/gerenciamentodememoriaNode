class Memoria {
    constructor(id, estado, inicio, tamanho) {
        this.idProcesso = id;
        this.estado = estado;
        this.inicio = inicio;
        this.tamanho = tamanho;
    }

    getIdProcesso() {
        return this.idProcesso;
    }

    setIdProcesso(id) {
        this.idProcesso = id;
    }

    getEstado() {
        return this.estado;
    }

    setEstado(estado) {
        this.estado = estado;
    }

    getInicio() {
        return this.inicio;
    }

    setInicio(inicio) {
        this.inicio = inicio;
    }

    getTamanho() {
        return this.tamanho;
    }

    setTamanho(tamanho) {
        this.tamanho = tamanho;
    }

    toString() {
        return `(id processo: ${this.idProcesso}), ${this.estado}, ${this.inicio}, ${this.tamanho}`;
    }
}

module.exports = Memoria;