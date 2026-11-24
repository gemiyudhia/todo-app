import { useState } from "react";
import type { FormEvent } from "react";

type Props = {
  onAdd: (text: string) => void;
};

export default function TodoForm({ onAdd }: Props) {
  const [text, setText] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    onAdd(value);
    setText("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Tulis tugas baru"
        aria-label="Tugas baru"
        className="min-w-0 flex-1 rounded-lg border border-stone-300 bg-white px-3 py-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
      />
      <button
        type="submit"
        className="min-h-11 rounded-lg border border-teal-700 bg-teal-700 px-3.5 text-sm text-white hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
      >
        Tambah
      </button>
    </form>
  );
}