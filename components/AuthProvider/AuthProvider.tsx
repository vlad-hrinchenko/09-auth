"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkSession, getUser } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const { setUser, clearIsAuthenticated } = useAuthStore();

  useEffect(() => {
    const verifySession = async () => {
      try {
        const session = await checkSession();

        if (session?.valid) {
          const user = await getUser();
          if (user?.email) {
            setUser(user);
          } else {
            clearIsAuthenticated();
            router.push("/sign-in");
          }
        } else {
          clearIsAuthenticated();
          router.push("/sign-in");
        }
      } catch {
        clearIsAuthenticated();
        router.push("/sign-in");
      } finally {
        setIsChecking(false);
      }
    };

    verifySession();
  }, [setUser, clearIsAuthenticated, router]);

  if (isChecking) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}
