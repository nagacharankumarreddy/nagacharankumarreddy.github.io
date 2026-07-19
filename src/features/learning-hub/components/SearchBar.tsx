interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="learning-hub-search">
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search articles by title, category, or content..."
        aria-label="Search Learning Hub articles"
        className="learning-hub-search-input"
      />
    </div>
  );
};
