import QuickFilters from './components/quick-filters/quick-filters.js';
import LhsNavigation from './components/lhs-navigation/lhs-navigation.js';
import AutoSuggestion from './components/auto-suggestion/auto-suggestion.js';
import SummaryExpander from './components/summary-expander/summary-expander.js';

// Function to initialize all TEL components
const initAll = () => {
  // 1. Find all instances of Quick Filters
  const $quickFilters = document.querySelectorAll('[data-module="tel-quick-filters"]');
  $quickFilters.forEach(($module) => {
    new QuickFilters($module).init();
  });

  // 2. Find all instances of LHS Navigation
  const $lhsNavigation = document.querySelectorAll('[data-module="tel-lhs-navigation"]');
  $lhsNavigation.forEach(($module) => {
    new LhsNavigation($module).init();
  });

  // 3. Find all instances of Auto Suggestion
  const $autoSuggestion = document.querySelectorAll('[data-module="tel-auto-suggestion"]');
  $autoSuggestion.forEach(($module) => {
    new AutoSuggestion($module).init();
  });

  // 4. Find all instances of Summary Expander
  const $summaryExpander = document.querySelectorAll('[data-module="tel-summary-expander"]');
  $summaryExpander.forEach(($module) => {
    new SummaryExpander($module).init();
  });

  // 5. Add future components here, e.g.
};

export {
  initAll,
  QuickFilters,
  LhsNavigation,
  AutoSuggestion,
  SummaryExpander
};