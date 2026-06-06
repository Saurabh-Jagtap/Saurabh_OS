"use client";

import { useEffect } from "react";
import { trpc } from "~/trpc/client";

export default function VisitorInitializer() {
  const identifyVisitor = trpc.visitor.identify.useMutation();

  useEffect(() => {
    async function initializeVisitor() {
      const existing = localStorage.getItem("visitor_id");

      if (existing) return;

      const visitor = await identifyVisitor.mutateAsync({
        visitorId: undefined,
      });

      localStorage.setItem("visitor_id", visitor.id);
    }

    void initializeVisitor();
  }, []);

  return null;
}