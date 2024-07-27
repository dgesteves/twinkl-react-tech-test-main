import { ChangeEvent } from 'react';

type SearchInputProps = {
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function SearchInput({ placeholder, onChange }: SearchInputProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      className="shrink-0 border border-gray-300 rounded-md p-3 m-3 md:mx-auto md:w-1/3 hover:shadow-lg hover:border-gray-400 caret-gray-600 outline-none focus:border-gray-600 focus:shadow-lg"
    />
  );
}
