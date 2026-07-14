import Container from "@/components/ui/Container";
import ButtonLink from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <main>
      <Container className="flex flex-col items-start gap-4 py-24">
        <p className="text-sm font-semibold text-accent">404</p>
        <h1 className="text-3xl font-bold text-foreground">
          お探しのページが見つかりませんでした
        </h1>
        <p className="text-muted-foreground">
          URLが変更または削除された可能性があります。お手数ですが、トップページからお探しください。
        </p>
        <ButtonLink href="/" className="mt-2">
          トップページに戻る
        </ButtonLink>
      </Container>
    </main>
  );
}
