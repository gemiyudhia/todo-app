import { useState } from 'react';
import type { Filter } from './types';
import TodoForm from './components/TodoForm';
import TodoFilter from './components/TodoFilter';
import TodoList from './components/TodoList';
import { useTodos } from './hooks/useTodos';

export default function App() {
  const { todos, addTodo, toggleTodo, updateTodo, deleteTodo, clearDone } =
    useTodos();
  const [filter, setFilter] = useState<Filter>('all');

  const visible = todos.filter((t) =>
    filter === 'all' ? true : filter === 'active' ? !t.done : t.done,
  );
  const remaining = todos.filter((t) => !t.done).length;
  const doneCount = todos.length - remaining;

  return (
    <main className="mx-auto max-w-xl px-4 pb-12 pt-6 sm:pt-10">
      <h1 className="mb-5 text-3xl font-semibold tracking-tight">
        Daftar Tugas
      </h1>

      <TodoForm onAdd={addTodo} />
      <TodoFilter filter={filter} remaining={remaining} onChange={setFilter} />
      <TodoList
        todos={visible}
        totalCount={todos.length}
        onToggle={toggleTodo}
        onUpdate={updateTodo}
        onDelete={deleteTodo}
      />

      {doneCount > 0 && (
        <button
          onClick={clearDone}
          className="mx-auto mt-5 block text-sm text-stone-500 underline hover:text-red-700"
        >
          Hapus {doneCount} tugas yang selesai
        </button>
      )}
    </main>
  );
}
