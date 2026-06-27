"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RechtsanwaelteIdRedirect({ params }: { params: { id: string } }) {
  const router = useRouter();
  useEffect(() => { router.replace(`/anwalt/${params.id}`); }, []);
  return null;
}
