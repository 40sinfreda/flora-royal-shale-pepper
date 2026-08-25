import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/spots")({
  component: SpotsLayout,
});

function SpotsLayout() {
  return <Outlet />;
}
