"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { register } from "@/lib/api/clientApi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./SignUp.module.css";

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

export default function SignUpPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SignUpSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            const user = await register(values);
            setUser(user);
            router.push("/profile"); // редірект після успішної реєстрації
          } catch {
            setErrors({ email: "Registration failed. Please try again." });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            <div className={css.formGroup}>
              <label htmlFor="email">Email</label>
              <Field
                id="email"
                name="email"
                type="email"
                className={css.input}
                required
              />
              <ErrorMessage name="email" component="p" className={css.error} />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="password">Password</label>
              <Field
                id="password"
                name="password"
                type="password"
                className={css.input}
                required
              />
              <ErrorMessage
                name="password"
                component="p"
                className={css.error}
              />
            </div>

            <div className={css.actions}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={css.submitButton}
              >
                {isSubmitting ? "Signing up..." : "Register"}
              </button>
            </div>

            {/* Помилка реєстрації */}
            <ErrorMessage name="email" component="p" className={css.error} />
          </Form>
        )}
      </Formik>
    </main>
  );
}
