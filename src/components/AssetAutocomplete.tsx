import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { searchAssets } from "@/data/assets";
import { Asset } from "@/types/portfolio";
import { ChevronDown, Search } from "lucide-react";

interface AssetAutocompleteProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onAssetSelect?: (asset: { name: string; ticker: string; type: Asset['type'] }) => void;
  className?: string;
  id?: string;
}

const AssetAutocomplete = ({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  onAssetSelect,
  className = "",
  id 
}: AssetAutocompleteProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<ReturnType<typeof searchAssets>>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value && value.length >= 2) {
      const results = searchAssets(value);
      setSuggestions(results);
      setIsOpen(results.length > 0);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = (asset: typeof suggestions[0]) => {
    onChange(asset.name);
    setIsOpen(false);
    onAssetSelect?.(asset);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setIsOpen(true);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <Label htmlFor={id} className="text-sm font-medium text-gray-300 mb-2 block">
        {label}
      </Label>
      <div className="relative">
        <Input
          ref={inputRef}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className={`${className} pr-8`}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          {value && suggestions.length > 0 ? (
            <Search className="h-4 w-4 text-gray-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-400" />
          )}
        </div>
      </div>
      
      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-[9999] w-full mt-1 bg-slate-800 border border-yellow-500/30 rounded-xl shadow-xl backdrop-blur-sm max-h-60 overflow-y-auto">
          {suggestions.map((asset, index) => (
            <div
              key={`${asset.ticker}-${index}`}
              onClick={() => handleSuggestionClick(asset)}
              className="px-4 py-3 hover:bg-yellow-500/10 cursor-pointer border-b border-gray-700 last:border-b-0 transition-colors"
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-white">{asset.name}</div>
                  <div className="text-sm text-gray-400">{asset.ticker}</div>
                </div>
                <div className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400">
                  {asset.type === 'stock' && '📈'}
                  {asset.type === 'fii' && '🏢'}
                  {asset.type === 'bond' && '💰'}
                  {asset.type === 'etf' && '📊'}
                  {asset.type === 'crypto' && '₿'}
                  {' '}
                  {asset.type.toUpperCase()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssetAutocomplete;