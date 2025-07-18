import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/api/serverApi";
import css from "./profile.module.css";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Profile — NoteHub",
  description: "User profile page in NoteHub app",
};

export default async function ProfilePage() {
  const userResponse = await getCurrentUser();
  const user = userResponse.data;

  return (
    <main className={css.mainContent}>
      {/* ... */}
      <Image
        src={user.avatar || "/default-avatar.png"}
        alt="User Avatar"
        width={120}
        height={120}
        className={css.avatar}
      />
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      {/* ... */}
    </main>
  );
}
