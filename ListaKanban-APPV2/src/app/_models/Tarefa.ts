import { Usuario } from './Usuario';

export interface Tarefa {
    id: number;
    titulo: string
    dataPrevInicio: Date;
    dataPrevTermino: Date;
    dataRealInicio: Date;
    dataRealTermino: Date;
    esforcoPrev: number;
    esforcoReal: number;
    status: number;
    prioridade: number;
    responsavel: Usuario;
    usuarioId: number;
}
