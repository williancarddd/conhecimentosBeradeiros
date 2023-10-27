import { IMessage } from "../interfaces/IMessage";
import * as tf from '@tensorflow/tfjs';

export const  messageListData: IMessage[] = [
    {
        id: 'a',
        from: 1,
        to: 2,
        createdAt: new Date('2021-04-23'),
        message: 'Olá',
        status: 2, // 0 enviado, 1 recebido e 2 lido
    },
    {
        id: 'b',
        from: 2,
        to: 1,
        createdAt: new Date('2021-04-25'),
        message: 'Olá cara',
        status: 2, // 0 enviado, 1 recebido e 2 lido
    },
    {
        id:'c',
        from: 1,
        to: 2,
        createdAt: new Date(),
        message: 'Tudo bem ?',
        status: 2, // 0 enviado, 1 recebido e 2 lido
    },
    {
        id:'d',
        from: 2,
        to: 1,
        createdAt: new Date(),
        message: 'Sim.',
        status: 2, // 0 enviado, 1 recebido e 2 lido
    },
    {
        id: 'e',
        from: 1,
        to: 2,
        createdAt: new Date(),
        message: 'Que bom',
        status: 2, // 0 enviado, 1 recebido e 2 lido
    }
]