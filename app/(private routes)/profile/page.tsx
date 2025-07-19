// app/(private routes)/profile/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { getUserFromServer } from "@/lib/api/serverApi";
import css from "./profile.module.css";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Profile — NoteHub",
  description: "User profile page in NoteHub app",
};

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function ProfilePage() {
  let user = null;

  try {
    user = await getUserFromServer();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Failed to load user:", error);
    }

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
}
