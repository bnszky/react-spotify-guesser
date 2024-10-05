import React, { useState, useEffect } from 'react';

interface SearchInputProps {
  choices: string[];
  onChange: (value: string) => void;
  value: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ choices, onChange, value }) => {
  const [filteredChoices, setFilteredChoices] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    if (searchValue) {
      const filtered = choices.filter(choice =>
        choice.toLowerCase().startsWith(searchValue.toLowerCase())
      );
      setFilteredChoices(filtered);
    } else {
      setFilteredChoices([]);
    }
  }, [searchValue, choices]);

  const handleSelect = (choice: any) => {
    onChange(choice.target.value);
  };

  return (
    <div className="flex flex-col relative gap-3">
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="Search"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>

        <select className="select w-full max-w-xs" value={value} onChange={handleSelect}>
            <option value="">Pick searching song</option>
            {filteredChoices.map((choice) => <option key={choice} value={choice}>{choice}</option>)} 
        </select>

    </div>
  );
};

export default SearchInput;