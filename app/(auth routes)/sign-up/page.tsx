"use client";

import { useRouter } from "next/navigation";
import css from "./SignUp.module.css";
import { useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { register } from "@/lib/api/clientApi";
import { UserRequest } from "@/types/user";

const SignUpPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    const values: UserRequest = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      const res = await register(values);
      if (res) {
        setUser(res);
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign up</h1>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
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
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>
        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SignUpPage;
