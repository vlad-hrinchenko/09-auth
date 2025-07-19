import type { Metadata } from "next";
import Link from "next/link";
import { getUserFromServer } from "@/lib/api/serverApi";
import css from "./profile.module.css";
import Image from "next/image";
import { isAxiosError } from "axios";

export const metadata: Metadata = {
  title: "Profile — NoteHub",
  description: "User profile page in NoteHub app",
};

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function ProfilePage() {
  try {
    const user = await getUserFromServer();

    return (
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <div className={css.header}>
            <h1 className={css.formTitle}>Profile Page</h1>
            <Link href="/profile/edit" className={css.editProfileButton}>
              Edit Profile
            </Link>
          </div>

          <div className={css.avatarWrapper}>
            <Image
              src={user.avatar || "/default-avatar.png"}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
          </div>

          <div className={css.profileInfo}>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      // Користувач неавторизований
      return (
        <main className={css.mainContent}>
          <div className={css.profileCard}>
            <h1 className={css.formTitle}>Not Authorized</h1>
            <p>Please log in to view this page.</p>
            <Link href="/sign-in" className={css.editProfileButton}>
              Go to Login
            </Link>
          </div>
        </main>
      );
    }

    // Інша помилка
    if (process.env.NODE_ENV === "development") {
      console.error("Failed to load user:", error);
    }

    return (
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <h1 className={css.formTitle}>Error</h1>
          <p>Something went wrong. Please try again later.</p>
        </div>
      </main>
    );
  }
}
