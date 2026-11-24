import { useEffect, useState } from 'react';
import type { Todo } from '../types';

const STORAGE_KEY = 'todo-app:tasks';

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Todo[]) : [];
  } catch {
    return [];
  }
}

function newId(): string {
  return (
    crypto.randomUUID?.() ??
    Date.now().toString(36) + Math.random().toString(36).slice(2)
  );
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {}
  }, [todos]);

  const addTodo = (text: string) =>
    setTodos((prev) => [{ id: newId(), text, done: false }, ...prev]);

  const toggleTodo = (id: string) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );

  const updateTodo = (id: string, text: string) =>
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)));

  const deleteTodo = (id: string) =>
    setTodos((prev) => prev.filter((t) => t.id !== id));

  const clearDone = () => setTodos((prev) => prev.filter((t) => !t.done));

  return { todos, addTodo, toggleTodo, updateTodo, deleteTodo, clearDone };
}
