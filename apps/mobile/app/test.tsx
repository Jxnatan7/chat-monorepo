import Container from "@/components/theme/Container";
import { FlashList } from "@/components/theme/FlashList";
import { ListItem } from "@/components/theme/ListItem";

const data = [
  { title: "Casa de baixo", subtitle: "Condomínio do Lago" },
  { title: "Casa de baixo", subtitle: "Condomínio do Lago" },
  { title: "Casa de baixo", subtitle: "Condomínio do Lago" },
];

const renderItem = ({ item }: any) => {
  return <ListItem title={item.title} subtitle={item.subtitle} />;
};

export default function Test() {
  return (
    <Container variant="screen">
      <FlashList
        data={[...data, ...data, ...data, ...data, ...data, ...data]}
        renderItem={renderItem}
      />
    </Container>
  );
}
