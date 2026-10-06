export default class SummaryExpander {
  constructor($module) {
    this.$module = $module;
  }

  init() {
    if (!this.$module || this.$module.dataset.telInitialised) {
      return;
    }

    this.$module.dataset.telInitialised = 'true';
  }

}