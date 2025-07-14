"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import styles from "./SignUp.module.css";

export default function SignUpPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const user = await registerUser(email, password);
      setUser(user);
      router.push("/profile");
    } catch (err: unknown) {
      if (err instanceof Error) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || err.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <main className={styles.mainContent}>
      <h1 className={styles.formTitle}>Sign up</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={styles.input}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={styles.input}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={styles.error}>{error}</p>}
      </form>
    </main>
  );
}
