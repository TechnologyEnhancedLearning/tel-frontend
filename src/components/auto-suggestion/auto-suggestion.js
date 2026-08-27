export default class AutoSuggestion {
  constructor($module) {
    this.$module = $module;
  }

  init() {
    if (!this.$module || this.$module.dataset.telInitialised) {
      return;
    }

    this.initDemoConditionalRadios();

    this.$module.dataset.telInitialised = 'true';
  }

  // Helper to retrieve target ID regardless of attribute used
  getControlTarget($el) {
    return $el.getAttribute('aria-controls') || $el.getAttribute('data-aria-controls');
  }

  initDemoConditionalRadios() {
    // this function is purely used to demo the "Other" option in checkbox and radio searches on the 11ty site
    // will not be needed when running with a full v10 nhsuk-frontend
    const $inputs = this.$module.querySelectorAll('.nhsuk-radios__input, .nhsuk-checkboxes__input');
    
    $inputs.forEach(($input) => {
      $input.addEventListener('change', (e) => {
        const name = e.target.getAttribute('name');
        if (!name) return;

        // Find all inputs in the same group to toggle panels correctly
        const $groupInputs = this.$module.querySelectorAll(`input[name="${name}"]`);

        $groupInputs.forEach(($peer) => {
          const peerTargetId = this.getControlTarget($peer);
          if (!peerTargetId) return;

          const $targetPanel = document.getElementById(peerTargetId);
          if (!$targetPanel) return;

          const isChecked = $peer === e.target && e.target.checked;

          if (isChecked) {
            $targetPanel.classList.remove('nhsuk-radios__conditional--hidden', 'nhsuk-checkboxes__conditional--hidden');
            $peer.setAttribute('aria-expanded', 'true');
          } else {
            $targetPanel.classList.add('nhsuk-radios__conditional--hidden', 'nhsuk-checkboxes__conditional--hidden');
            $peer.setAttribute('aria-expanded', 'false');
          }
        });
      });
    });
  }
}