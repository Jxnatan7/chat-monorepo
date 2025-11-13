import { FlashList } from "../FlashList";
import { Message } from "../Message";

const messages = [
  {
    id: 1,
    content: "E aí, chegou bem?",
    timestamp: "14:02",
    isMyMessage: false,
  },
  {
    id: 2,
    content: "Cheguei sim, trânsito tava tranquilo hoje.",
    timestamp: "14:03",
    isMyMessage: true,
  },
  {
    id: 3,
    content: "Boa! Tá afim de resolver aquele negócio agora?",
    timestamp: "14:04",
    isMyMessage: false,
  },
  {
    id: 4,
    content: "Sim, só deixa eu tomar um café antes kkkkk",
    timestamp: "14:04",
    isMyMessage: true,
  },
  {
    id: 5,
    content: "Mano… café às 14h??",
    timestamp: "14:05",
    isMyMessage: false,
  },
  {
    id: 6,
    content: "Ué, melhor do que dormir no teclado igual ontem 😂",
    timestamp: "14:06",
    isMyMessage: true,
  },
  {
    id: 7,
    content: "Justo. Aliás, tô mandando aqui o arquivo.",
    timestamp: "14:07",
    isMyMessage: false,
  },
  {
    id: 8,
    content: "Recebido!",
    timestamp: "14:07",
    isMyMessage: true,
  },
  {
    id: 9,
    content:
      "Se der algum erro estranho me avisa, porque ontem eu mexi no schema e talvez tenha quebrado algo sem querer…",
    timestamp: "14:08",
    isMyMessage: false,
  },
  {
    id: 10,
    content:
      "Beleza. Tô testando agora. Inclusive, a tela nova tá ficando bem melhor com aqueles ajustes de layout.",
    timestamp: "14:10",
    isMyMessage: true,
  },
  {
    id: 11,
    content:
      "Ficou top mesmo. Aquela borda arredondada na mensagem fez diferença.",
    timestamp: "14:11",
    isMyMessage: false,
  },
  {
    id: 12,
    content: "Sim! Só falta animar o scroll quando entra mensagem nova.",
    timestamp: "14:12",
    isMyMessage: true,
  },
  {
    id: 13,
    content: "Boa, coloca essa tarefa no Notion pra eu não esquecer depois.",
    timestamp: "14:13",
    isMyMessage: false,
  },
  {
    id: 14,
    content:
      "Pode deixar. Aliás, vai querer comer algo mais tarde? Pode deixar. Aliás, vai querer comer algo mais tarde? Pode deixar. Aliás, vai querer comer algo mais tarde? Pode deixar. Aliás, vai querer comer algo mais tarde? Pode deixar. Aliás, vai querer comer algo mais tarde? Pode deixar. Aliás, vai querer comer algo mais tarde? Pode deixar. Aliás, vai querer comer algo mais tarde?",
    timestamp: "14:14",
    isMyMessage: true,
  },
  {
    id: 15,
    content: "Acho que sim, tô com fome desde cedo kkkkk",
    timestamp: "14:15",
    isMyMessage: false,
  },
  {
    id: 16,
    content: "Então bora pedir algo depois de terminar aqui.",
    timestamp: "14:16",
    isMyMessage: true,
  },
  {
    id: 17,
    content:
      "Fechado! Ah, e não esquece: se rodar o app no Android antigo ele crasha.",
    timestamp: "14:17",
    isMyMessage: false,
  },
  {
    id: 18,
    content: "Sério? Vou testar isso agora. Valeu pelo aviso!",
    timestamp: "14:18",
    isMyMessage: true,
  },
];

export const MessageList = () => {
  return (
    <FlashList
      variant="messages"
      data={messages}
      renderItem={({ item }: any) => (
        <Message
          content={item.content}
          isMyMessage={item.isMyMessage}
          timestamp={item.timestamp}
        />
      )}
    />
  );
};
