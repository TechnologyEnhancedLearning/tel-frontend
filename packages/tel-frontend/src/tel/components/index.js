import { createAll } from 'nhsuk-frontend';
import HelloWorld from './hello-world/hello-world.js';
// import other components here
// import AnotherComponent from './another-component/another-component.js';

const components = [HelloWorld /*, AnotherComponent */];

components.forEach(Component => createAll(Component));

export { HelloWorld /*, AnotherComponent */ };
