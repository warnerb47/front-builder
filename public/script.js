import ConfigLoader from './configLoader.js';
import  Components from './Components/index.js';

getConfiguration();

customElements.define('app-component', Components.App);
customElements.define('header-component', Components.Header);

async function getConfiguration() {
    try {
        const configUrl = 'http://localhost:3000/json/config.json';
        const result = await new ConfigLoader().fetchJsonFile(configUrl);
        const config = await result.json();
        setTitle(config.template.name);
        // setApp(config.template);
    } catch (error) {
        console.log(error);
    }
}

function setTitle(title) {
    document.getElementsByTagName('title')[0].innerHTML = title;
}

function setApp(template) {
    if (template.type) {
        const root = document.getElementById('root');
        root.classList.add(template.type);
    }
}
