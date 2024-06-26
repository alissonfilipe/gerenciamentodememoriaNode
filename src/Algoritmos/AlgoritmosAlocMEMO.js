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
    let tamanhoM = -1; // Inicializa tamanhoM como -1
    let auxN = new ProcessoN(); // Cria um objeto ProcessoN para armazenar processos não alocados

    for (let processo of Processos) { // Loop sobre cada processo
        for (let memoriaI of Memoria) { // Loop sobre cada bloco de memória
            tamanhoM = Math.abs(memoriaI.getTamanho()); // Obtém o tamanho absoluto do bloco de memória
            // Verifica se o bloco de memória está livre ('H'), se é grande o suficiente e se o processo não está alocado
            if (memoriaI.getEstado() === 'H' && processo.getComputacao() <= tamanhoM && processo.getAlocado() === 0) {
                memoriaI.setEstado('P'); // Define o estado do bloco de memória como 'P' (processo alocado)
                memoriaI.setIdProcesso(processo.getId()); // Define o ID do processo associado ao bloco de memória
                processo.setAlocado(1); // Define o processo como alocado
            }
        }
    }

    for (let p of Processos) { // Loop para verificar processos não alocados
        if (p.getAlocado() === 0) { // Se o processo não estiver alocado
            auxN.setId(p.getId()); // Define o ID do processo não alocado
            auxN.setTamanho(p.getComputacao()); // Define o tamanho do processo não alocado
            ProcessosNALOCADOS.push(auxN); // Adiciona o processo não alocado à lista de processos não alocados
        }
        auxN = new ProcessoN(); // Reinicia o objeto auxN para o próximo processo não alocado
    }

    escreverArquivo("FRIST-FIT"); // Chama a função escreverArquivo com o nome "FRIST-FIT"
}

function NextFIT(Memoria, Processos) {
    let tamanhoM = -1; // Inicializa tamanhoM como -1
    let auxN = new ProcessoN(); // Cria um objeto ProcessoN para armazenar processos não alocados
    let num = 0; // Inicializa num como 0 para controlar o índice da próxima iteração

    for (let processo of Processos) { // Loop sobre cada processo
        for (let i = num; i < Memoria.length; i++) { // Loop sobre os blocos de memória, começando do último índice utilizado
            tamanhoM = Math.abs(Memoria[i].getTamanho()); // Obtém o tamanho absoluto do bloco de memória
            // Verifica se o bloco de memória está livre ('H'), se é grande o suficiente e se o processo não está alocado
            if (Memoria[i].getEstado() === 'H' && processo.getComputacao() <= tamanhoM && processo.getAlocado() === 0) {
                Memoria[i].setEstado('P'); // Define o estado do bloco de memória como 'P' (processo alocado)
                Memoria[i].setIdProcesso(processo.getId()); // Define o ID do processo associado ao bloco de memória
                processo.setAlocado(1); // Define o processo como alocado
                num = i; // Atualiza num para o próximo índice de memória a ser verificado
            }
            if (i + 1 === Memoria.length) { // Se o loop atingir o final da lista de memória
                num = 0; // Reinicia num para o início da lista de memória na próxima iteração
            }
        }
    }

    for (let p of Processos) { // Loop para verificar processos não alocados
        if (p.getAlocado() === 0) { // Se o processo não estiver alocado
            auxN.setId(p.getId()); // Define o ID do processo não alocado
            auxN.setTamanho(p.getComputacao()); // Define o tamanho do processo não alocado
            ProcessosNALOCADOS.push(auxN); // Adiciona o processo não alocado à lista de processos não alocados
        }
        auxN = new ProcessoN(); // Reinicia o objeto auxN para o próximo processo não alocado
    }

    escreverArquivo("NEXT-FIT"); // Chama a função escreverArquivo com o nome "NEXT-FIT"
}


function BestFIT(Memoria, Processos) {
    let key = false; // Variável de controle para determinar se houve alocação para um processo
    let tamanhoMV = -1; // Inicializa tamanhoMV como -1
    let auxN = new ProcessoN(); // Cria um objeto ProcessoN para armazenar processos não alocados
    let MemoriaV = []; // Array para armazenar as memórias candidatas para alocação
    let auxMV = {}; // Objeto auxiliar para armazenar informações das memórias candidatas

    for (let i = 0; i < Processos.length; i++) { // Loop sobre cada processo
        for (let j = 0; j < Memoria.length; j++) { // Loop sobre cada bloco de memória
            // Verifica se o bloco de memória está livre ('H'), se é grande o suficiente e se o processo não está alocado
            if (Memoria[j].getEstado() === 'H' && Processos[i].getComputacao() <= Math.abs(Memoria[j].getTamanho()) && Processos[i].getAlocado() === 0) {
                tamanhoMV = Math.abs(Memoria[j].getTamanho()) - Processos[i].getComputacao(); // Calcula o espaço restante no bloco de memória após a alocação
                auxMV = { // Cria um objeto auxiliar com informações sobre a alocação
                    idP: Processos[i].getId(), // ID do processo
                    idm: j, // Índice do bloco de memória
                    tamanho: tamanhoMV // Espaço restante no bloco de memória
                };
                MemoriaV.push(auxMV); // Adiciona o objeto auxiliar ao array MemoriaV de memórias candidatas
                key = true; // Define key como true para indicar que houve alocação
            }
        }

        if (Processos[i].getAlocado() === 0 && key === true) { // Se o processo não foi alocado e houve alocação para ele
            auxMV = MemoriaV.reduce((min, p) => p.tamanho < min.tamanho ? p : min, MemoriaV[0]); // Seleciona a melhor memória candidata com o menor espaço restante
            Processos[i].setAlocado(1); // Define o processo como alocado
            Memoria[auxMV.idm].setIdProcesso(auxMV.idP); // Define o ID do processo associado ao bloco de memória
            Memoria[auxMV.idm].setEstado('P'); // Define o estado do bloco de memória como 'P' (processo alocado)
            MemoriaV = []; // Limpa o array MemoriaV para a próxima iteração
            key = false; // Reseta key para false
        }
    }

    for (let p of Processos) { // Loop para verificar processos não alocados
        if (p.getAlocado() === 0) { // Se o processo não estiver alocado
            auxN = new ProcessoN(p.getId(), p.getComputacao()); // Cria um novo objeto ProcessoN com o ID e o tamanho do processo não alocado
            ProcessosNALOCADOS.push(auxN); // Adiciona o processo não alocado à lista de processos não alocados
        }
    }

    escreverArquivo("BEST-FIT"); // Chama a função escreverArquivo com o nome "BEST-FIT"
}


function WorstFIT(Memoria, Processos) {
    let key = false; // Variável de controle para determinar se houve alocação para um processo
    let tamanhoMV = -1; // Inicializa tamanhoMV como -1
    let auxN = new ProcessoN(); // Cria um objeto ProcessoN para armazenar processos não alocados
    let MemoriaV = []; // Array para armazenar as memórias candidatas para alocação
    let auxMV = {}; // Objeto auxiliar para armazenar informações das memórias candidatas

    for (let i = 0; i < Processos.length; i++) { // Loop sobre cada processo
        for (let j = 0; j < Memoria.length; j++) { // Loop sobre cada bloco de memória
            // Verifica se o bloco de memória está livre ('H'), se é grande o suficiente e se o processo não está alocado
            if (Memoria[j].getEstado() === 'H' && Processos[i].getComputacao() <= Math.abs(Memoria[j].getTamanho()) && Processos[i].getAlocado() === 0) {
                tamanhoMV = Math.abs(Memoria[j].getTamanho()) - Processos[i].getComputacao(); // Calcula o espaço restante no bloco de memória após a alocação
                auxMV = { // Cria um objeto auxiliar com informações sobre a alocação
                    idP: Processos[i].getId(), // ID do processo
                    idm: j, // Índice do bloco de memória
                    tamanho: tamanhoMV // Espaço restante no bloco de memória
                };
                MemoriaV.push(auxMV); // Adiciona o objeto auxiliar ao array MemoriaV de memórias candidatas
                key = true; // Define key como true para indicar que houve alocação
            }
        }

        if (Processos[i].getAlocado() === 0 && key === true) { // Se o processo não foi alocado e houve alocação para ele
            auxMV = MemoriaV.reduce((max, p) => p.tamanho > max.tamanho ? p : max, MemoriaV[0]); // Seleciona a pior memória candidata com o maior espaço restante
            Processos[i].setAlocado(1); // Define o processo como alocado
            Memoria[auxMV.idm].setIdProcesso(auxMV.idP); // Define o ID do processo associado ao bloco de memória
            Memoria[auxMV.idm].setEstado('P'); // Define o estado do bloco de memória como 'P' (processo alocado)
            MemoriaV = []; // Limpa o array MemoriaV para a próxima iteração
            key = false; // Reseta key para false
        }
    }

    for (let p of Processos) { // Loop para verificar processos não alocados
        if (p.getAlocado() === 0) { // Se o processo não estiver alocado
            auxN = new ProcessoN(p.getId(), p.getComputacao()); // Cria um novo objeto ProcessoN com o ID e o tamanho do processo não alocado
            ProcessosNALOCADOS.push(auxN); // Adiciona o processo não alocado à lista de processos não alocados
        }
    }

    escreverArquivo("WORST-FIT"); // Chama a função escreverArquivo com o nome "WORST-FIT"
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
MemoriaV = [];
key = false;


for (let p of Processos) {
    if (p.getAlocado() === 0) {
        auxN = new ProcessoN(p.getId(), p.getComputacao());
        ProcessosNALOCADOS.push(auxN);
    }
}

escreverArquivo("WORST-FIT");


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