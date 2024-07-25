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
      style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
    />
  );
}
