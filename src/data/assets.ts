// Database of popular assets for autocomplete
export const popularAssets = [
  // Ações Brasileiras
  { name: "Petrobras", ticker: "PETR4", type: "stock" as const, sector: "Energy" },
  { name: "Vale", ticker: "VALE3", type: "stock" as const, sector: "Materials" },
  { name: "Itaú Unibanco", ticker: "ITUB4", type: "stock" as const, sector: "Financial" },
  { name: "Banco do Brasil", ticker: "BBAS3", type: "stock" as const, sector: "Financial" },
  { name: "Bradesco", ticker: "BBDC4", type: "stock" as const, sector: "Financial" },
  { name: "Ambev", ticker: "ABEV3", type: "stock" as const, sector: "Consumer" },
  { name: "Magazine Luiza", ticker: "MGLU3", type: "stock" as const, sector: "Consumer" },
  { name: "JBS", ticker: "JBSS3", type: "stock" as const, sector: "Consumer" },
  { name: "Suzano", ticker: "SUZB3", type: "stock" as const, sector: "Materials" },
  { name: "WEG", ticker: "WEGE3", type: "stock" as const, sector: "Industrial" },
  { name: "B3", ticker: "B3SA3", type: "stock" as const, sector: "Financial" },
  { name: "Eletrobras", ticker: "ELET3", type: "stock" as const, sector: "Utilities" },
  { name: "Santander Brasil", ticker: "SANB11", type: "stock" as const, sector: "Financial" },
  { name: "CSN", ticker: "CSNA3", type: "stock" as const, sector: "Materials" },
  { name: "Gerdau", ticker: "GGBR4", type: "stock" as const, sector: "Materials" },
  { name: "Lojas Renner", ticker: "LREN3", type: "stock" as const, sector: "Consumer" },
  { name: "Natura", ticker: "NTCO3", type: "stock" as const, sector: "Consumer" },
  { name: "Via", ticker: "VIIA3", type: "stock" as const, sector: "Consumer" },
  { name: "Embraer", ticker: "EMBR3", type: "stock" as const, sector: "Industrial" },
  { name: "Klabin", ticker: "KLBN11", type: "stock" as const, sector: "Materials" },
  
  // Ações Americanas - Big Tech
  { name: "Apple Inc", ticker: "AAPL", type: "stock" as const, sector: "Technology" },
  { name: "Microsoft Corporation", ticker: "MSFT", type: "stock" as const, sector: "Technology" },
  { name: "Amazon.com Inc", ticker: "AMZN", type: "stock" as const, sector: "Technology" },
  { name: "Alphabet Inc (Google)", ticker: "GOOGL", type: "stock" as const, sector: "Technology" },
  { name: "Meta Platforms Inc", ticker: "META", type: "stock" as const, sector: "Technology" },
  { name: "Tesla Inc", ticker: "TSLA", type: "stock" as const, sector: "Technology" },
  { name: "NVIDIA Corporation", ticker: "NVDA", type: "stock" as const, sector: "Technology" },
  { name: "Netflix Inc", ticker: "NFLX", type: "stock" as const, sector: "Technology" },
  
  // Ações Americanas - Financeiro
  { name: "JPMorgan Chase & Co", ticker: "JPM", type: "stock" as const, sector: "Financial" },
  { name: "Bank of America Corp", ticker: "BAC", type: "stock" as const, sector: "Financial" },
  { name: "Wells Fargo & Company", ticker: "WFC", type: "stock" as const, sector: "Financial" },
  { name: "Goldman Sachs Group", ticker: "GS", type: "stock" as const, sector: "Financial" },
  { name: "Morgan Stanley", ticker: "MS", type: "stock" as const, sector: "Financial" },
  { name: "Visa Inc", ticker: "V", type: "stock" as const, sector: "Financial" },
  { name: "Mastercard Inc", ticker: "MA", type: "stock" as const, sector: "Financial" },
  
  // Ações Americanas - Saúde e Consumo
  { name: "Johnson & Johnson", ticker: "JNJ", type: "stock" as const, sector: "Healthcare" },
  { name: "Pfizer Inc", ticker: "PFE", type: "stock" as const, sector: "Healthcare" },
  { name: "Procter & Gamble Co", ticker: "PG", type: "stock" as const, sector: "Consumer" },
  { name: "Coca-Cola Company", ticker: "KO", type: "stock" as const, sector: "Consumer" },
  { name: "PepsiCo Inc", ticker: "PEP", type: "stock" as const, sector: "Consumer" },
  { name: "Nike Inc", ticker: "NKE", type: "stock" as const, sector: "Consumer" },
  { name: "McDonald's Corp", ticker: "MCD", type: "stock" as const, sector: "Consumer" },
  { name: "Walmart Inc", ticker: "WMT", type: "stock" as const, sector: "Consumer" },
  
  // Ações Americanas - Industrial e Energia
  { name: "Exxon Mobil Corp", ticker: "XOM", type: "stock" as const, sector: "Energy" },
  { name: "Chevron Corporation", ticker: "CVX", type: "stock" as const, sector: "Energy" },
  { name: "Boeing Company", ticker: "BA", type: "stock" as const, sector: "Industrial" },
  { name: "General Electric", ticker: "GE", type: "stock" as const, sector: "Industrial" },
  { name: "Caterpillar Inc", ticker: "CAT", type: "stock" as const, sector: "Industrial" },
  { name: "3M Company", ticker: "MMM", type: "stock" as const, sector: "Industrial" },
  
  // FIIs
  { name: "Kinea Indices", ticker: "KNCR11", type: "fii" as const, sector: "Real Estate" },
  { name: "Maxi Renda", ticker: "MXRF11", type: "fii" as const, sector: "Real Estate" },
  { name: "CSHG Logística", ticker: "HGLG11", type: "fii" as const, sector: "Real Estate" },
  { name: "Victória FII", ticker: "VISC11", type: "fii" as const, sector: "Real Estate" },
  { name: "BTG Pactual Logística", ticker: "XPLG11", type: "fii" as const, sector: "Real Estate" },
  { name: "Vinci Offices", ticker: "VINO11", type: "fii" as const, sector: "Real Estate" },
  { name: "RBR Alpha", ticker: "RBRR11", type: "fii" as const, sector: "Real Estate" },
  { name: "CSHG Real Estate", ticker: "HGRE11", type: "fii" as const, sector: "Real Estate" },
  { name: "Bresco Logística", ticker: "BRCO11", type: "fii" as const, sector: "Real Estate" },
  { name: "XP Log", ticker: "XPML11", type: "fii" as const, sector: "Real Estate" },
  
  // ETFs
  { name: "iShares Ibovespa", ticker: "BOVA11", type: "etf" as const, sector: "Diversified" },
  { name: "SPDR S&P 500", ticker: "SPY", type: "etf" as const, sector: "International" },
  { name: "iShares MSCI Brazil", ticker: "EWZ", type: "etf" as const, sector: "International" },
  { name: "It Now IVVB11", ticker: "IVVB11", type: "etf" as const, sector: "International" },
  { name: "SPDR Gold", ticker: "GLD", type: "etf" as const, sector: "Commodities" },
  { name: "iShares Russell 2000", ticker: "IWM", type: "etf" as const, sector: "International" },
  { name: "Vanguard Total Stock", ticker: "VTI", type: "etf" as const, sector: "International" },
  { name: "iShares MSCI EAFE", ticker: "EFA", type: "etf" as const, sector: "International" },
  
  // Cripto
  { name: "Bitcoin", ticker: "BTC", type: "crypto" as const, sector: "Cryptocurrency" },
  { name: "Ethereum", ticker: "ETH", type: "crypto" as const, sector: "Cryptocurrency" },
  { name: "Solana", ticker: "SOL", type: "crypto" as const, sector: "Cryptocurrency" },
  { name: "Cardano", ticker: "ADA", type: "crypto" as const, sector: "Cryptocurrency" },
  { name: "Binance Coin", ticker: "BNB", type: "crypto" as const, sector: "Cryptocurrency" },
  { name: "XRP", ticker: "XRP", type: "crypto" as const, sector: "Cryptocurrency" },
  { name: "Dogecoin", ticker: "DOGE", type: "crypto" as const, sector: "Cryptocurrency" },
  { name: "Polkadot", ticker: "DOT", type: "crypto" as const, sector: "Cryptocurrency" },
  
  // Renda Fixa
  { name: "Tesouro SELIC", ticker: "SELIC", type: "bond" as const, sector: "Government" },
  { name: "Tesouro IPCA+", ticker: "IPCA+", type: "bond" as const, sector: "Government" },
  { name: "CDB Banco Inter", ticker: "CDB-INTER", type: "bond" as const, sector: "Banking" },
  { name: "LCI Bradesco", ticker: "LCI-BBDC", type: "bond" as const, sector: "Banking" },
  { name: "LCA Itaú", ticker: "LCA-ITAU", type: "bond" as const, sector: "Banking" },
  { name: "Tesouro Prefixado", ticker: "TESOURO-PRE", type: "bond" as const, sector: "Government" },
  { name: "CRI Banco do Brasil", ticker: "CRI-BB", type: "bond" as const, sector: "Banking" },
];

export const searchAssets = (query: string) => {
  if (!query || query.length < 2) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return popularAssets
    .filter(asset => 
      asset.name.toLowerCase().includes(normalizedQuery) ||
      asset.ticker.toLowerCase().includes(normalizedQuery)
    )
    .slice(0, 8) // Limit to 8 results
    .sort((a, b) => {
      // Prioritize ticker matches
      const aTickerMatch = a.ticker.toLowerCase().startsWith(normalizedQuery);
      const bTickerMatch = b.ticker.toLowerCase().startsWith(normalizedQuery);
      if (aTickerMatch && !bTickerMatch) return -1;
      if (!aTickerMatch && bTickerMatch) return 1;
      
      // Then prioritize name matches
      const aNameMatch = a.name.toLowerCase().startsWith(normalizedQuery);
      const bNameMatch = b.name.toLowerCase().startsWith(normalizedQuery);
      if (aNameMatch && !bNameMatch) return -1;
      if (!aNameMatch && bNameMatch) return 1;
      
      return a.name.localeCompare(b.name);
    });
};