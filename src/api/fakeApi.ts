import { IMessage } from "../interfaces/IMessage";

export const messageListData: IMessage[] = [
  {
    id: "a",
    from: 1,
    to: 2,
    createdAt: new Date(),
    message: "Oi!!, meu nome é Roberinho(Robô Ribeirinho)",
    status: 2, // 0 enviado, 1 recebido e 2 lido
  },
  {
    id: "b",
    from: 1,
    to: 2,
    createdAt: new Date(),
    message:
      "Vou te dar algums dicas de como você pode me usar de maneira mais eficaz",
    status: 2, // 0 enviado, 1 recebido e 2 lido
  },
  {
    id: "c",
    from: 1,
    to: 2,
    createdAt: new Date(),
    message:
      "Tente utilizar uma das categorias para podermos selecionar as melhores respostas",
    status: 2, // 0 enviado, 1 recebido e 2 lido
  },
  {
    id: "d",
    from: 1,
    to: 2,
    createdAt: new Date(),
    message:
      "Sempre que quiser você pode entrar na aba Comunidade e nos ajudar a coletar informações",
    status: 2, // 0 enviado, 1 recebido e 2 lido
  },
];
