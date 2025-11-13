import { Container } from "@/components/theme/Container";
import { MessageList } from "@/components/theme/MessageList";

export default function Test() {
  return (
    <Container variant="screen" hideHeader>
      <MessageList />
    </Container>
  );
}
