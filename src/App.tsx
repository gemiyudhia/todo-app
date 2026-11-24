import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { useTodos } from './hooks/useTodos';

export default function App() {
  const { todos, addTodo, toggleTodo, updateTodo, deleteTodo } = useTodos();

  return (
    <main className="mx-auto max-w-xl px-4 pb-12 pt-6 sm:pt-10">
      <h1 className="mb-5 text-3xl font-semibold tracking-tight">
        Daftar Tugas Todo App
      </h1>

      <TodoForm onAdd={addTodo} />
      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onUpdate={updateTodo}
        onDelete={deleteTodo}
      />
    </main>
  );
}
