import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { searchAssets } from "@/data/assets";
import { Asset } from "@/types/portfolio";
import { Search } from "lucide-react";

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
  const [suggestions, setSuggestions] = useState<ReturnType<typeof searchAssets>>([]);

  useEffect(() => {
    // Sempre mostrar todas as sugestões disponíveis
    const results = searchAssets(""); // Busca vazia retorna todos
    setSuggestions(results);
  }, []);

  const handleAssetSelect = (assetKey: string) => {
    const selectedAsset = suggestions.find(asset => 
      `${asset.name}-${asset.ticker}` === assetKey
    );
    
    if (selectedAsset) {
      onChange(selectedAsset.name);
      onAssetSelect?.(selectedAsset);
    }
  };

  const getAssetIcon = (type: Asset['type'], ticker: string) => {
    switch (type) {
      case 'stock':
        return ticker.includes('3') || ticker.includes('4') || ticker.includes('11') ? '🇧🇷' : '🇺🇸';
      case 'fii':
        return '🏢';
      case 'bond':
        return '💰';
      case 'etf':
        return '📊';
      case 'crypto':
        return '₿';
      default:
        return '📈';
    }
  };

  const getAssetTypeLabel = (type: Asset['type']) => {
    switch (type) {
      case 'stock':
        return 'STOCK';
      case 'fii':
        return 'FII';
      case 'bond':
        return 'RENDA FIXA';
      case 'etf':
        return 'ETF';
      case 'crypto':
        return 'CRIPTO';
      default:
        return 'ASSET';
    }
  };

  return (
    <div className="relative z-50">
      <Label htmlFor={id} className="text-sm font-medium text-gray-300 mb-2 block">
        {label}
      </Label>
      <Select value={value ? `${value}-${suggestions.find(s => s.name === value)?.ticker || ''}` : ""} onValueChange={handleAssetSelect}>
        <SelectTrigger className={`${className} bg-black/30 border-yellow-500/20 text-white h-11 rounded-xl focus:border-yellow-400`}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-slate-900/98 border-yellow-500/40 backdrop-blur-xl max-h-60">
          {suggestions.map((asset, index) => (
            <SelectItem 
              key={`${asset.ticker}-${index}`} 
              value={`${asset.name}-${asset.ticker}`}
              className="hover:bg-yellow-500/20 focus:bg-yellow-500/20 cursor-pointer transition-colors py-3"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex-1 min-w-0 mr-3">
                  <div className="font-semibold text-white text-sm truncate">
                    {asset.name}
                  </div>
                  <div className="text-xs text-gray-400 font-mono font-medium mt-1">
                    {asset.ticker}
                  </div>
                  {asset.sector && (
                    <div className="text-xs text-gray-500 mt-1 truncate">
                      {asset.sector}
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <div className="text-lg">
                    {getAssetIcon(asset.type, asset.ticker)}
                  </div>
                  <div className="text-xs px-2 py-1 rounded-lg bg-gradient-to-r from-yellow-500/25 to-amber-500/25 text-yellow-300 font-medium border border-yellow-500/40">
                    {getAssetTypeLabel(asset.type)}
                  </div>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default AssetAutocomplete;