# 💰 Portfolio Analyzer - Análise Inteligente de Carteiras
<p align="center">
  <!-- Licença -->
  <img alt="GitHub License" src="https://img.shields.io/github/license/devAndreotti/devAndreotti?color=FFF&labelColor=551c83&style=flat-square">
</p>

<div align="center">
  <img src="./src/project-01.png" alt="Visual do Gold Portfolio">
</div>

## 📋 Sobre o Projeto
O **Portfolio Analyzer** é uma ferramenta inteligente de análise e otimização de carteiras de investimento, construída com foco em **mercado brasileiro, diversificação inteligente e recomendações personalizadas**. A partir da composição atual do seu portfólio, a IA gera insights profundos sobre risco, retorno, diversificação setorial e métricas de performance.

Este projeto une análise quantitativa avançada com **interface intuitiva** para entregar **relatórios completos em segundos**.

## ⚙️ Funcionalidades Principais
* 📊 **Análise de Diversificação** - Score inteligente baseado na distribuição de ativos
* 🎯 **Métricas de Performance** - Retorno esperado, volatilidade e Índice Sharpe
* 🏢 **Distribuição Setorial** - Visualização detalhada por setor econômico
* 💎 **Suporte Completo** - Ações, FIIs, Renda Fixa, Criptomoedas e ETFs
* 🧠 **Recomendações Inteligentes** - Sugestões personalizadas baseadas no perfil
* 📈 **Visualizações Interativas** - Gráficos dinâmicos com Recharts

## 🛠 Tecnologias Utilizadas
* **React + TypeScript** - Base sólida e type-safe
* **Tailwind CSS** - Design system moderno e responsivo
* **shadcn/ui** - Componentes elegantes e acessíveis
* **Recharts** - Visualizações de dados interativas
* **Vite** - Build tool otimizado
* **Lovable** - Desenvolvimento acelerado com IA

## 📂 Estrutura do Projeto
```
├── src/
│   ├── components/             # Componentes reutilizáveis
│   │   ├── AnalysisResults.tsx # Relatório completo de análise
│   │   ├── HeroSection.tsx     # Seção principal com formulário
│   │   └── ui/                 # Componentes base do shadcn/ui
│   ├── types/                  # Definições TypeScript
│   │   └── portfolio.ts        # Tipos do sistema de portfólio
│   ├── pages/                  # Páginas da aplicação
│   └── integrations/           # Integrações externas
├── public/                     # Recursos estáticos
├── vite.config.ts              # Configuração do Vite
└── README.md                   # Documentação do projeto
```

## 🧭 Guia de Implementação
### 🔹 Usando o Lovable (recomendado)
1. Acesse o projeto em [Lovable](https://portfolio-analyzer.lovable.app)
2. Adicione seus ativos diretamente na interface
3. Visualize análises em tempo real
4. Publique via **Share > Publish**

### 🔹 Localmente com Node.js
```bash
git clone 
cd portfolio-analyzer
npm install
npm run dev
```

## 🧠 Como Funciona a Análise
* **Entrada de Dados** - Usuário insere ativos com percentuais de alocação
* **Processamento Inteligente** - IA analisa composição, setores e correlações
* **Cálculo de Métricas** - Algoritmos calculam risco, retorno e diversificação
* **Geração de Insights** - Sistema gera recomendações personalizadas baseadas em:
  * Perfil de risco do investidor
  * Objetivo financeiro declarado
  * Composição atual da carteira
  * Benchmarks do mercado brasileiro

## 📊 Métricas Analisadas
* **Score de Diversificação** (0-10) - Avalia distribuição entre classes e setores
* **Retorno Esperado** - Projeção anualizada baseada em dados históricos
* **Volatilidade** - Medida de risco da carteira
* **Índice Sharpe** - Relação risco-retorno otimizada
* **Distribuição Setorial** - Concentração por setor econômico
* **Alocação por Classe** - Balanceamento entre ações, FIIs, renda fixa, etc.

## 💡 Exemplo de Uso
Imagine uma carteira com **60% Bitcoin, 25% PETR4, 15% VALE3**:

✅ **Análise**: Carteira de alto risco com concentração excessiva em crypto  
✅ **Score de Diversificação**: 3/10 (baixa diversificação)  
✅ **Recomendações**: Reduzir exposição a Bitcoin, incluir renda fixa, diversificar setores  
✅ **Métricas**: Retorno esperado alto, mas volatilidade extrema  
✅ **Sugestões**: Adicionar FIIs, bonds e ações de setores defensivos

## 🎯 Perfis Suportados
* **🛡️ Conservador** - Foco em renda fixa e dividendos
* **⚖️ Moderado** - Balanceamento entre risco e retorno
* **🚀 Agressivo** - Crescimento e alta volatilidade
* **🏠 Aposentadoria** - Renda passiva e preservação de capital
* **💰 Independência Financeira** - Otimização de fluxo de caixa

## 💪 Como Contribuir
1. Faça um fork deste repositório
2. Crie uma branch: `git checkout -b feature/nova-analise`
3. Commit: `git commit -m 'feat: adiciona análise de correlação'`
4. Push: `git push origin feature/nova-analise`
5. Abra um Pull Request

## 📝 Nota
Este projeto nasceu da necessidade de **democratizar análises quantitativas** de portfólio no mercado brasileiro. Combinando algoritmos financeiros, design intuitivo e recomendações personalizadas, o **Portfolio Analyzer** é sua ferramenta para otimizar investimentos com base em dados.

<br>

---

<p align="center">
  Desenvolvido com ☕ por <a href="https://github.com/seuUsuario">Ricardo Andreotti Gonçalves</a> 🧑‍💻
</p>
