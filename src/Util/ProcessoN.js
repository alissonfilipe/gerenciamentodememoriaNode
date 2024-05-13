class ProcessoN {
    constructor(id, tamanho) {
        this.id = id;
        this.tamanho = tamanho;
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getTamanho() {
        return this.tamanho;
    }

    setTamanho(tamanho) {
        this.tamanho = tamanho;
    }

    toString() {
        return `id: ${this.id}, tamanho: ${this.tamanho}`;
    }
}

module.exports = ProcessoN;