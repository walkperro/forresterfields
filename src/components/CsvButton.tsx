"use client";

type Col = { key: string; label: string };

function downloadCSV(rows: Record<string, unknown>[], cols: Col[], filename: string) {
  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const header = cols.map(c => esc(c.label)).join(",");
  const body = rows.map(r => cols.map(c => esc((r as Record<string, unknown>)[c.key])).join(",")).join("\n");
  const csv = header + "\n" + body;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function CsvButton(props: {
  rows: Record<string, unknown>[];
  columns: Col[];
  filename: string;
  className?: string;
  label?: string;
}) {
  const { rows, columns, filename, className = "rounded-md border px-3 py-2 text-sm hover:bg-gray-50", label = "Download CSV" } = props;
  return (
    <button
      type="button"
      className={className}
      onClick={() => downloadCSV(rows, columns, filename)}
    >
      {label}
    </button>
  );
}
