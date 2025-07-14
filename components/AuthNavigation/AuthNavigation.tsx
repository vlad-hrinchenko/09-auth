"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import styles from "./AuthNavigation.module.css";

export default function AuthNavigation() {
  const router = useRouter();
  const { isAuthenticated, user, clearIsAuthenticated } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logoutUser();
      clearIsAuthenticated();
      router.push("/sign-in");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <li className={styles.navigationItem}>
          <Link
            href="/sign-in"
            prefetch={false}
            className={styles.navigationLink}
          >
            Login
          </Link>
        </li>
        <li className={styles.navigationItem}>
          <Link
            href="/sign-up"
            prefetch={false}
            className={styles.navigationLink}
          >
            Sign up
          </Link>
        </li>
      </>
    );
  }

  return (
    <>
      <li className={styles.navigationItem}>
        <Link
          href="/profile"
          prefetch={false}
          className={styles.navigationLink}
        >
          Profile
        </Link>
      </li>
      <li className={styles.navigationItem}>
        <p className={styles.userEmail}>{user?.email}</p>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </li>
    </>
  );
}
