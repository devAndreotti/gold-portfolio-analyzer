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
        <div className="absolute z-[99999] w-full mt-1 bg-slate-900/98 border border-yellow-500/40 rounded-xl shadow-2xl backdrop-blur-xl max-h-60 overflow-y-auto">
          {suggestions.map((asset, index) => (
            <div
              key={`${asset.ticker}-${index}`}
              onClick={() => handleSuggestionClick(asset)}
              className="group px-4 py-3 hover:bg-yellow-500/20 cursor-pointer border-b border-gray-700/30 last:border-b-0 transition-all duration-200 hover:backdrop-blur-sm first:rounded-t-xl last:rounded-b-xl"
            >
              <div className="flex justify-between items-center">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white group-hover:text-yellow-300 transition-colors duration-200 text-sm truncate">
                    {asset.name}
                  </div>
                  <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-200 font-mono font-medium mt-1">
                    {asset.ticker}
                  </div>
                  {asset.sector && (
                    <div className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-200 mt-1 truncate">
                      {asset.sector}
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0 ml-3">
                  <div className="text-lg">
                    {asset.type === 'stock' && (asset.ticker.includes('3') || asset.ticker.includes('4') || asset.ticker.includes('11') ? '🇧🇷' : '🇺🇸')}
                    {asset.type === 'fii' && '🏢'}
                    {asset.type === 'bond' && '💰'}
                    {asset.type === 'etf' && '📊'}
                    {asset.type === 'crypto' && '₿'}
                  </div>
                  <div className="text-xs px-2 py-1 rounded-lg bg-gradient-to-r from-yellow-500/25 to-amber-500/25 text-yellow-300 font-medium border border-yellow-500/40 group-hover:border-yellow-400/60 transition-all duration-200">
                    {asset.type.toUpperCase()}
                  </div>
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