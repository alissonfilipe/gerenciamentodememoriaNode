class MemoriaAUX {
    constructor(idp, tamanho, idm) {
        this.idP = idp;
        this.idM = idm;
        this.tamanho = tamanho;
    }

    getIdp() {
        return this.idP;
    }

    setIdP(id) {
        this.idP = id;
    }

    getIdm() {
        return this.idM;
    }

    setIdm(id) {
        this.idM = id;
    }

    getTamanho() {
        return this.tamanho;
    }

    setTamanho(tamanho) {
        this.tamanho = tamanho;
    }

    toString() {
        return `MemoriaAUX [idP=${this.idP}, idM=${this.idM}, tamanho=${this.tamanho}]`;
    }
}

module.exports = MemoriaAUX;