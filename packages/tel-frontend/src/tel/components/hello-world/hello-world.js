// packages/tel-frontend/src/components/hello-world/hello-world.js

/**
 * Hello World component JS
 * This is where you add interactive behaviour for your component.
 * 
 * Example: Highlight the component when it is clicked.
 */

function HelloWorld($module) {
  this.$module = $module;
}

HelloWorld.prototype.init = function () {
  if (!this.$module) {
    return;
  }

  // Example behaviour: toggle a highlight class on click
  this.$module.addEventListener('click', () => {
    this.$module.classList.toggle('hello-world--highlight');
  });
};

export default HelloWorld;
