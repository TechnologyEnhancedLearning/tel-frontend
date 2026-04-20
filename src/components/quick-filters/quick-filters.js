export default class QuickFilters {
  constructor($module) {
    this.$module = $module;
    this.$buttons = $module.querySelectorAll('.tel-quick-filters__button');
    this.$allButton = $module.querySelector('[data-filter-value="all"]');
  }

  init() {
    if (!this.$module || this.$module.dataset.telInitialised) {
      return;
    }

    this.$buttons.forEach(($button) => {
      // 1. Handle Mouse Clicks
      $button.addEventListener('click', (event) => this.handleClick(event));

      // 2. Handle Keyboard (Space Bar fix for <a> tags)
      $button.addEventListener('keydown', (event) => this.handleKeyDown(event));
    });

    this.$module.dataset.telInitialised = 'true';
  }

  handleKeyDown(event) {
    // If Space is pressed (code 'Space' or key ' ')
    if (event.key === ' ' || event.code === 'Space') {
      // Prevent the default browser behavior (scrolling the page)
      event.preventDefault();
      // Manually trigger the click logic
      this.handleClick(event);
    }
  }

  handleClick(event) {
    const $clickedButton = event.currentTarget;
    event.preventDefault();

    const isAllButton = $clickedButton === this.$allButton;

    if (isAllButton) {
      // Logic for "All": It is sticky (cannot be unticked by clicking itself)
      // and it clears all other categories.
      this.resetToAll();
    } else {
      // Logic for specific categories: Toggle the clicked button
      this.toggleCategory($clickedButton);
    }

    this.dispatchChangeEvent();
  }

  resetToAll() {
    this.$buttons.forEach(($btn) => {
      const isAll = $btn === this.$allButton;
      this.setButtonState($btn, isAll);
    });
  }

  toggleCategory($button) {
    const isCurrentlyActive = $button.getAttribute('aria-pressed') === 'true';

    // Toggle the state of the clicked category
    this.setButtonState($button, !isCurrentlyActive);

    // If a category is active, "All" must be inactive
    if (this.$allButton) {
      this.setButtonState(this.$allButton, false);
    }

    // "Sticky All" fallback: If nothing is selected, force "All" back on
    const activeCategories = Array.from(this.$buttons).filter(
      $btn => $btn !== this.$allButton && $btn.getAttribute('aria-pressed') === 'true'
    );

    if (activeCategories.length === 0 && this.$allButton) {
      this.setButtonState(this.$allButton, true);
    }
  }

  setButtonState($btn, isActive) {
    $btn.classList.toggle('tel-quick-filters__button--active', isActive);
    $btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  }

  dispatchChangeEvent() {
    const activeValues = Array.from(this.$buttons)
      .filter($btn => $btn.getAttribute('aria-pressed') === 'true')
      .map($btn => $btn.getAttribute('data-filter-value'));

    const event = new CustomEvent('tel.quick-filters.change', {
      detail: { filters: activeValues }
    });

    this.$module.dispatchEvent(event);
  }
}
