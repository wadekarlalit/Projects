
import { App } from "./react-app.js";

// React ko yahi jagah di hai jaha UI render hoga
const reactRoot = document.getElementById('react-root');

// Ye React 18 ka method hai. div(reactRoot) ka control React ko diya.
// means React, ab tum is div ke andar jo bhi hoga usko manage karo.
// <div> = ek khaali room. 
// React = interior designer
const root = ReactDOM.createRoot(reactRoot);

// CDN me JSX nahi chalta directly.isiliye - React.createElement()
// React components ko Virtual DOM me convert karta hai
root.render(React.createElement(App))

console.log('reactRoot', reactRoot);
console.log('root', root);
