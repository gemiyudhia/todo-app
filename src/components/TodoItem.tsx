import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { Todo } from '../types';


const focus =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700';
const btn = `min-h-11 rounded-lg border border-stone-300 bg-white px-3.5 text-sm hover:border-stone-500 ${focus}`;
const btnPrimary = `min-h-11 rounded-lg border border-teal-700 bg-teal-700 px-3.5 text-sm text-white hover:brightness-110 ${focus}`;
const textInput = `min-w-0 rounded-lg border border-stone-300 bg-white px-3 py-2.5 ${focus}`;

type Props = {
  todo: Todo;
  onToggle: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
  onDelete: (id: string) => void;
};

export default function TodoItem({
  todo,
  onToggle,
  onUpdate,
  onDelete,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  function startEdit() {
    setDraft(todo.text);
    setEditing(true);
  }

  function save() {
    const value = draft.trim();
    if (value) onUpdate(todo.id, value);
    setEditing(false);
  }

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') save();
    if (e.key === 'Escape') setEditing(false);
  }

  const textSize = 'basis-[calc(100%-2rem)] sm:flex-1 sm:basis-auto';
  const actions = 'flex w-full justify-end gap-1.5 sm:w-auto';

  return (
    <li className="flex flex-wrap items-center gap-3 rounded-xl border border-stone-200 bg-white px-3 py-2.5 sm:flex-nowrap">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        aria-label={`Tandai "${todo.text}" selesai`}
        className="size-5 shrink-0 cursor-pointer accent-teal-700"
      />

      {editing ? (
        <>
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKey}
            aria-label="Ubah teks tugas"
            autoFocus
            className={`${textInput} ${textSize}`}
          />
          <div className={actions}>
            <button className={btnPrimary} onClick={save}>
              Simpan
            </button>
            <button className={btn} onClick={() => setEditing(false)}>
              Batal
            </button>
          </div>
        </>
      ) : (
        <>
          <span
            className={`min-w-0 wrap-break-word ${textSize} ${
              todo.done ? 'text-stone-400 line-through' : ''
            }`}
          >
            {todo.text}
          </span>
          <div className={actions}>
            <button className={btn} onClick={startEdit}>
              Edit
            </button>
            <button
              className={`${btn} text-red-700`}
              onClick={() => onDelete(todo.id)}
            >
              Hapus
            </button>
          </div>
        </>
      )}
    </li>
  );
}
