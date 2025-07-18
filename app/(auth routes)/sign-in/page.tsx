"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import type { CreateUserData } from "@/types/user";
import css from "./SignIn.module.css";

export default function SignIn() {
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData: CreateUserData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      const user = await login(userData);
      if (user) {
        setUser(user);
        router.replace("/profile"); // редірект після успішного логіну
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      setError("Login failed, please try again");
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} onSubmit={handleSubmit} noValidate>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
            autoComplete="email"
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
            autoComplete="current-password"
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
