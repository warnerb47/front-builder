export default class App extends HTMLElement{

    baseUrl = 'http://localhost:3000';
    constructor(){
        super();
    }

    connectedCallback(){
        this.getConfiguration();
    }

    setApp(templateType, justifyContent) {
        console.log(templateType);
        this.attachShadow({mode: 'open'});
        const cssText = this.setCss(templateType);
        if (templateType === 'navbar-footer') {
            const app = this.setupNavBarFooterApp(justifyContent);
            
            if (app && cssText) {
                // this.shadowRoot.innerHTML = cssText + app.outerHTML;
                this.shadowRoot.innerHTML = cssText + app;
            }
        }

        if (templateType === 'sidebar-footer') {
            const app = this.setupSidebarFooterApp();
            if (app && cssText) {
                this.shadowRoot.innerHTML = cssText + app;
            }
        }

        if (templateType === 'navbar-sidebar-footer') {
            const app = this.setupNavbarSidebarFooterApp();
            if (app && cssText) {
                this.shadowRoot.innerHTML = cssText + app;
            }
        }
    }

    setupNavBarFooterApp(justifyContent) {
        return `
            <div id="root">
                <header-component
                    justify-content=${justifyContent}
                >
                </header-component>
                <div class="app"></div>
                <footer></footer>
            </div>
        `;
    }

    setupSidebarFooterApp(){
        return `
            <div id="root">
                <div class="app">
                    <nav></nav>
                    <div class="container"></div>
                </div>
                <footer></footer>
            </div>        
        `;
    }

    setupNavbarSidebarFooterApp(){
        return `
            <div id="root">
                <nav></nav>
                <div class="container">
                    <nav></nav>
                    <div class="app"></div>
                    <footer></footer>
                </div>
            </div> 
        `;
    }

    setCss(templateType) {
        if (templateType === 'navbar-footer') {
            const style = `
            <style>
                @import "${this.baseUrl}/Components/app/styles/navBar-footer.css";
            </style>
            `;
            return style;   
        }
        if (templateType === 'sidebar-footer') {
            const style = `
            <style>
                @import "${this.baseUrl}/Components/app/styles/sidebar-footer.css";
            </style>
            `;
            return style;   
        }
        
        if (templateType === 'navbar-sidebar-footer') {
            const style = `
            <style>
                @import "${this.baseUrl}/Components/app/styles/navbar-sidebar-footer.css";
            </style>
            `;
            return style;   
        }
        return null;
    }

    async getConfiguration() {
        try {
            const configUrl = `${this.baseUrl}/json/config.json`;
            const result = await fetch(configUrl);
            const config = await result.json();
            this.setApp(config.template.type, config?.template?.navbar?.justifyContent || '');
        } catch (error) {
            console.log(error);
        }
    }

}