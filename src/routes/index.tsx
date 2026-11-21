import { createFileRoute } from "@tanstack/react-router";
import { BoardBrief } from "@/components/board-brief";

export const Route = createFileRoute("/")({ component: BoardBrief });
