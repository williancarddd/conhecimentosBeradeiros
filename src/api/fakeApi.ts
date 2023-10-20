import { IMessage } from "../interfaces/IMessage";

export const  messageListData: IMessage[] = [
    {
        id: 'a',
        from: 1,
        to: 2,
        createdAt: new Date(),
        message: 'Olá',
        status: 2, // 0 enviado, 1 recebido e 2 lido
    },
    {
        id: 'b',
        from: 2,
        to: 1,
        createdAt: new Date(),
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