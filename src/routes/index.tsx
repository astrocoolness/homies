import { createFileRoute } from "@tanstack/react-router";
import { HomiesApp } from "@/components/homies/HomiesApp";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return <HomiesApp />;
}
