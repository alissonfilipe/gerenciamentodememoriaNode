const Arquivo = require('../Util/Arquivo');
const Memoria = require('../Util/Memoria');
const Processo = require('../Util/Processo');
const ProcessoN = require('../Util/ProcessoN');



const txtMemoria = 'C:\\Users\\A368324\\Desktop\\gerenciamentodememoria\\entrada\\entrada-memoria.txt';
const txtProcessos = 'C:\\Users\\A368324\\Desktop\\gerenciamentodememoria\\entrada\\entrada-processos.txt';

const a = new Arquivo();
let MemoriaLIDA = [];
let ProcessosLIDOS = [];
let ProcessosNALOCADOS = [];

function main() {
    console.log("PARA RODAR NOVAMENTE O PROGRAMA");
    console.log("DELETE TODOS OS ARQUIVOS DE SAIDA");
    console.log("");

    resetDATA();
    console.log("Rodando Frist Fit...");
    FristFIT(MemoriaLIDA, ProcessosLIDOS);
    console.log("Terminado");
    console.log("");
    resetDATA();
    console.log("Rodando Next Fit...");
    NextFIT(MemoriaLIDA, ProcessosLIDOS);
    console.log("Terminado");
    console.log("");
    resetDATA();
    console.log("Rodando Best Fit...");
    BestFIT(MemoriaLIDA, ProcessosLIDOS);
    console.log("Terminado");
    console.log("");
    resetDATA();
    console.log("Rodando Worst Fit...");
    WorstFIT(MemoriaLIDA, ProcessosLIDOS);
    console.log("Terminado");

    console.log("");
    resetDATA();

    console.log("PARA RODAR NOVAMENTE O PROGRAMA");
    console.log("DELETE TODOS OS ARQUIVOS DE SAIDA");
}

function FristFIT(Memoria, Processos) {
    let tamanhoM = -1;
    let auxN = new ProcessoN();

    for (let processo of Processos) {
        for (let memoriaI of Memoria) {
            tamanhoM = Math.abs(memoriaI.getTamanho());
            if (memoriaI.getEstado() === 'H' && processo.getComputacao() <= tamanhoM && processo.getAlocado() === 0) {
                memoriaI.setEstado('P');
                memoriaI.setIdProcesso(processo.getId());
                processo.setAlocado(1);
            }
        }
    }

    for (let p of Processos) {
        if (p.getAlocado() === 0) {
            auxN.setId(p.getId());
            auxN.setTamanho(p.getComputacao());
            ProcessosNALOCADOS.push(auxN);
        }
        auxN = new ProcessoN();
    }

    escreverArquivo("FRIST-FIT");
}

function NextFIT(Memoria, Processos) {
    let tamanhoM = -1;
    let auxN = new ProcessoN();
    let num = 0;

    for (let processo of Processos) {
        for (let i = num; i < Memoria.length; i++) {
            tamanhoM = Math.abs(Memoria[i].getTamanho());
            if (Memoria[i].getEstado() === 'H' && processo.getComputacao() <= tamanhoM && processo.getAlocado() === 0) {
                Memoria[i].setEstado('P');
                Memoria[i].setIdProcesso(processo.getId());
                processo.setAlocado(1);
                num = i;
            }
            if (i + 1 === Memoria.length) {
                num = 0;
            }
        }
    }

    for (let p of Processos) {
        if (p.getAlocado() === 0) {
            auxN.setId(p.getId());
            auxN.setTamanho(p.getComputacao());
            ProcessosNALOCADOS.push(auxN);
        }
        auxN = new ProcessoN();
    }

    escreverArquivo("NEXT-FIT");
}

function BestFIT(Memoria, Processos) {
    let key = false;
    let tamanhoMV = -1;
    let auxN = new ProcessoN();
    let MemoriaV = [];
    let auxMV = {};

    for (let i = 0; i < Processos.length; i++) {
        for (let j = 0; j < Memoria.length; j++) {
            if (Memoria[j].getEstado() === 'H' && Processos[i].getComputacao() <= Math.abs(Memoria[j].getTamanho()) && Processos[i].getAlocado() === 0) {
                tamanhoMV = Math.abs(Memoria[j].getTamanho()) - Processos[i].getComputacao();
                auxMV = {
                    idP: Processos[i].getId(),
                    idm: j,
                    tamanho: tamanhoMV
                };
                MemoriaV.push(auxMV);
                key = true;
            }
        }

        if (Processos[i].getAlocado() === 0 && key === true) {
            auxMV = MemoriaV.reduce((min, p) => p.tamanho < min.tamanho ? p : min, MemoriaV[0]);
            Processos[i].setAlocado(1);
            Memoria[auxMV.idm].setIdProcesso(auxMV.idP);
            Memoria[auxMV.idm].setEstado('P');
            MemoriaV = [];
            key = false;
        }
    }

    for (let p of Processos) {
        if (p.getAlocado() === 0) {
            auxN = new ProcessoN(p.getId(), p.getComputacao());
            ProcessosNALOCADOS.push(auxN);
        }
    }

    escreverArquivo("BEST-FIT");
}

function WorstFIT(Memoria, Processos) {
    let key = false;
    let tamanhoMV = -1;
    let auxN = new ProcessoN();
    let MemoriaV = [];
    let auxMV = {};

    for (let i = 0; i < Processos.length; i++) {
        for (let j = 0; j < Memoria.length; j++) {
            if (Memoria[j].getEstado() === 'H' && Processos[i].getComputacao() <= Math.abs(Memoria[j].getTamanho()) && Processos[i].getAlocado() === 0) {
                tamanhoMV = Math.abs(Memoria[j].getTamanho()) - Processos[i].getComputacao();
                auxMV = {
                    idP: Processos[i].getId(),
                    idm: j,
                    tamanho: tamanhoMV
                };
                MemoriaV.push(auxMV);
                key = true;
            }
        }

        if (Processos[i].getAlocado() === 0 && key === true) {
            auxMV = MemoriaV.reduce((max, p) => p.tamanho > max.tamanho ? p : max, MemoriaV[0]);
            Processos[i].setAlocado(1);
            Memoria[auxMV.idm].setIdProcesso(auxMV.idP);
            Memoria[auxMV.idm].setEstado('P');
            MemoriaV = [];
            key = false;
        }
    }

    for (let p of Processos) {
        if (p.getAlocado() === 0) {
            auxN = new ProcessoN(p.getId(), p.getComputacao());
            ProcessosNALOCADOS.push(auxN);
        }
    }

    escreverArquivo("WORST-FIT");
}

function escreverArquivo(algoritmo) {
    a.arquivoSaida(`Algoritmo ${algoritmo}\r\n`, algoritmo);
    for (let m of MemoriaLIDA) {
        a.arquivoSaida(m.toString(), algoritmo);
    }
    a.arquivoSaida('\r\nPROCESSOS NÃO ALOCADOS / TAMANHO', algoritmo);
    for (let pnl of ProcessosNALOCADOS) {
        a.arquivoSaida(pnl.toString(), algoritmo);
    }
}

function resetDATA() {
    MemoriaLIDA = a.lerArquivo(txtMemoria);
    ProcessosLIDOS = a.lerArquivo(txtProcessos);
    ProcessosNALOCADOS = [];
}

main();