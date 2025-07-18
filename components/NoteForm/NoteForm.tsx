"use client";

import { useRouter } from "next/navigation";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "./NoteForm.module.css";
import { createNote } from "@/lib/api/clientApi";
import type { FormEvent } from "react";

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const mutation = useMutation({
    mutationFn: () => createNote(draft),
    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.back();
    },
    onError: (err) => {
      console.error("Error creating note", err);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!draft.title.trim()) return;
    mutation.mutate();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label}>
        Title
        <input
          type="text"
          className={styles.input}
          value={draft.title}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
          required
        />
      </label>

      <label className={styles.label}>
        Content
        <textarea
          className={styles.textarea}
          value={draft.content}
          onChange={(e) => setDraft({ ...draft, content: e.target.value })}
        />
      </label>

      <label className={styles.label}>
        Tag
        <select
          className={styles.select}
          value={draft.tag}
          onChange={(e) =>
            setDraft({ ...draft, tag: e.target.value as typeof draft.tag })
          }
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </label>

      <div className={styles.actions}>
        <button
          type="submit"
          className={styles.button}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Creating..." : "Create note"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className={styles.cancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
