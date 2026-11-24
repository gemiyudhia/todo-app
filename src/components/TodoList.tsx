import type { Todo } from '../types';
import TodoItem from './TodoItem';

type Props = {
  todos: Todo[];
  totalCount: number;
  onToggle: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
  onDelete: (id: string) => void;
};

export default function TodoList({
  todos,
  totalCount,
  onToggle,
  onUpdate,
  onDelete,
}: Props) {
  if (todos.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-stone-300 px-4 py-8 text-center text-stone-500">
        {totalCount === 0
          ? 'Belum ada tugas. Tambahkan tugas pertama di atas.'
          : 'Tidak ada tugas pada filter ini.'}
      </p>
    );
  }

  return (
    <ul className="grid gap-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
