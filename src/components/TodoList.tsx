import type { Todo } from '../types';
import TodoItem from './TodoItem';

type Props = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
  onDelete: (id: string) => void;
};

export default function TodoList({
  todos,
  onToggle,
  onUpdate,
  onDelete,
}: Props) {
  return (
    <ul className="grid gap-2 mt-5">
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
