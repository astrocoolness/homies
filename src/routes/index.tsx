import { createFileRoute } from "@tanstack/react-router";
import { HomiesApp } from "@/components/homies/HomiesApp";
import { SituationGame } from "@/components/homies/SituationGame";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <HomiesApp />
      <SituationGame />
    </>
  );
}
