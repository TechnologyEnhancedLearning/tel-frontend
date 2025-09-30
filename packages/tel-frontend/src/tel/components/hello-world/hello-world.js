// packages/tel-frontend/src/components/hello-world/hello-world.js

/**
 * HelloWorld component
 * Example: Highlight the component when clicked
 */

export default class HelloWorld {
  constructor($module) {
    this.$module = $module;
  }

  init() {
    if (!this.$module) return;

    // Example behaviour: toggle highlight class on click
    this.$module.addEventListener('click', () => {
      this.$module.classList.toggle('hello-world--highlight');
    });
  }
}
