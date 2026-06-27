"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AnwaelteIdRedirect({ params }: { params: { id: string } }) {
  const router = useRouter();
  useEffect(() => { router.replace(`/rechtsanwaelte/${params.id}`); }, []);
  return null;
}
