"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { useSocket } from "./providers/socket-provider";

type Props = {};

const SocketIndicator = (props: Props) => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <Badge
        variant={"outline"}
        className="bg-yellow-600 text-white border-none px-3"
      >
        Fallback: Polling every 1s
      </Badge>
    );
  }
  return (
    <Badge
      variant={"outline"}
      className="bg-emerald-600 text-white border-none px-3"
    >
      live: Real-time update
    </Badge>
  );
};

export default SocketIndicator;
