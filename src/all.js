import QuickFilters from './components/quick-filters/quick-filters.js';

// Function to initialize all TEL components
const initAll = () => {
  // 1. Find all instances of Quick Filters
  const $quickFilters = document.querySelectorAll('[data-module="tel-quick-filters"]');
  $quickFilters.forEach(($module) => {
    new QuickFilters($module).init();
  });

  // 2. Add future components here, e.g.

};

export {
  initAll,
  QuickFilters
};
