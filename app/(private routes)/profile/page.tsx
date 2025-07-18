import type { Metadata } from "next";
import Link from "next/link";
import { getCurrentUser } from "@/lib/api/serverApi";
import css from "./profile.module.css";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Profile — NoteHub",
  description: "User profile page in NoteHub app",
};

export default async function ProfilePage() {
  const user = await getCurrentUser();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          {/* Використання Link замість a */}
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
