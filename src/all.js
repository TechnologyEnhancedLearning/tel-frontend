import QuickFilters from './components/quick-filters/quick-filters.js';
import LhsNavigation from './components/lhs-navigation/lhs-navigation.js';
import AutoSuggestion from './components/auto-suggestion/auto-suggestion.js';

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

  // 4. Add future components here, e.g.
};

export {
  initAll,
  QuickFilters,
  LhsNavigation,
  AutoSuggestion
};