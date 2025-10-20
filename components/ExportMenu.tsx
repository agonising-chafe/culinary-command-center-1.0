"use client";

export default function ExportMenu() {
  const printPage = () => window.print();
  return (
    <div className="absolute top-4 right-4">
      <button onClick={printPage} className="px-4 py-2 bg-gray-800 text-white rounded-lg">Print</button>
    </div>
  );
}

