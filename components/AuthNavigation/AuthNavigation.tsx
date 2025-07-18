"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout as logoutUser } from "@/lib/api/clientApi"; // ✅ тепер існує
import { useAuthStore } from "@/lib/store/authStore";
import styles from "./AuthNavigation.module.css";

export default function AuthNavigation() {
  const router = useRouter();
  const { isAuthenticated, clearIsAuthenticated } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logoutUser();
      clearIsAuthenticated();
      router.push("/sign-in");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className={styles.nav}>
      {isAuthenticated ? (
        <>
          <Link href="/profile" className={styles.link}>
            Profile
          </Link>
          <button onClick={handleLogout} className={styles.button}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link href="/sign-in" className={styles.link}>
            Sign In
          </Link>
          <Link href="/sign-up" className={styles.link}>
            Sign Up
          </Link>
        </>
      )}
    </nav>
  );
}
