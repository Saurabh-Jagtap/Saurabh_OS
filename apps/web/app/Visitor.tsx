"use client"
import React, { useEffect } from 'react'
import { trpc } from '~/trpc/client';

const VisitorPage = () => {
    const identifyVisitor = trpc.visitor.identify.useMutation();

    useEffect(() => {
    async function initializeVisitor() {
      const visitorId = localStorage.getItem("visitor_id");

      const visitor = await identifyVisitor.mutateAsync({
        visitorId: visitorId ?? undefined,
      });

      localStorage.setItem("visitor_id", visitor.id);
    }

    void initializeVisitor();
  }, []);


    return (
        <div>

        </div>
    )
}

export default VisitorPage
