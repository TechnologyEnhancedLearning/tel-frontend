export default class LhsNavigation {
  constructor($module) {
    this.$module = $module;
    this.$chevrons = $module.querySelectorAll('.tel-lhs-navigation__chevron');
    this.$toggleButtons = $module.querySelectorAll('.tel-lhs-navigation__toggle');
  }

  init() {
    if (!this.$module || this.$module.dataset.telInitialised) {
      return;
    }

    this.$chevrons.forEach(($chevron) => {
      $chevron.addEventListener('click', (event) => this.handleClick(event));
      $chevron.addEventListener('keydown', (event) => this.handleKeyDown(event));
    });

    this.$toggleButtons.forEach(($button) => {
      $button.addEventListener('click', () => this.handleToggleClick());
    });

    window.addEventListener('keydown', (event) => this.handleGlobalEscape(event));

    this.$module.dataset.telInitialised = 'true';
  }

  handleKeyDown(event) {
    if (event.key === ' ' || event.code === 'Space') {
      event.preventDefault();
      this.handleClick(event);
    }
  }

  handleGlobalEscape(event) {
    if (event.key === 'Escape' || event.key === 'Esc') {
      if (this.$module.classList.contains('tel-lhs-navigation--open')) {
        this.handleToggleClick();
      }
    }
  }

  handleToggleClick() {
    const isOpen = this.$module.classList.toggle('tel-lhs-navigation--open');

    this.$toggleButtons.forEach(($button) => {
      $button.setAttribute('aria-expanded', isOpen);
    });
  }

  handleClick(event) {
    event.preventDefault();

    const $chevron = event.currentTarget;
    const targetSelector = $chevron.getAttribute('data-toggle-target');
    const $target = this.$module.querySelector(targetSelector);

    if (!$target) {
      return;
    }

    const isExpanded = $chevron.getAttribute('aria-expanded') === 'true';

    if (isExpanded) {
      $chevron.classList.add('collapsed');
      $target.classList.add('collapsed');
    } else {
      $chevron.classList.remove('collapsed');
      $target.classList.remove('collapsed');
    }

    $chevron.setAttribute('aria-expanded', !isExpanded);
  }
}