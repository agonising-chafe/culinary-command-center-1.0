import { useState } from 'react';

export default function Dropdown({ options, onSelect }: { options: string[]; onSelect: (option: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  function handleSelect(option: string) {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  }

  return (
    <div className="dropdown">
      <button onClick={() => setIsOpen(!isOpen)} className="dropdown-toggle">
        {selected || 'Select an option'}
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option) => (
            <li key={option} onClick={() => handleSelect(option)} className="dropdown-item">
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
