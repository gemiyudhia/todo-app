import type { Filter } from '../types';

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Semua' },
  { value: 'active', label: 'Belum selesai' },
  { value: 'done', label: 'Selesai' },
];

type Props = {
  filter: Filter;
  remaining: number;
  onChange: (filter: Filter) => void;
};

export default function TodoFilter({ filter, remaining, onChange }: Props) {
  return (
    <div className="mb-3 mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
      <div
        className="flex flex-wrap gap-1.5"
        role="group"
        aria-label="Filter tugas"
      >
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            aria-pressed={filter === f.value}
            onClick={() => onChange(f.value)}
            className={`rounded-full border px-3 py-1 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 ${
              filter === f.value
                ? 'border-stone-800 bg-stone-800 text-white'
                : 'border-stone-300 text-stone-500 hover:border-stone-500'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <span className="text-sm text-stone-500">{remaining} tugas tersisa</span>
    </div>
  );
}
