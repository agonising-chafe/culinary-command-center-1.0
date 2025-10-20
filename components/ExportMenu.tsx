"use client";

export default function ExportMenu() {
  const printPage = () => window.print();
  return (
    <button
      onClick={printPage}
      className="px-3 py-1.5 rounded-full bg-gray-800 text-white text-sm hover:bg-gray-700 transition"
    >
      Print
    </button>
  );
}
