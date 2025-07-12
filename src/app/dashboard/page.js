// app/dashboard/page.js
"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading session...</p>;
  }

  if (session) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Welcome, {session.user?.name || session.user?.email}!</h1>
        <p>You are logged in.</p>
        <button onClick={() => signOut({ callbackUrl: "/" })} style={{ padding: "10px 20px" }}>
          Sign Out
        </button>
      </div>
    );
  }

  return null;
}