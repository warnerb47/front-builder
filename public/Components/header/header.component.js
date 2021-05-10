
export default class Header extends HTMLElement{

    baseUrl = 'http://localhost:3000';
    constructor(){
        super();
    }

    connectedCallback(){
        this.attachShadow({mode: 'open'});

        const cssText = this.setCss(this.getCssAttribute());
        const app = this.setApp();
        if (app && cssText) {
            this.shadowRoot.innerHTML = cssText + app;
        }
    }



    // async getConfiguration() {
    //     try {
    //         const configUrl = `${this.baseUrl}/json/config.json`;
    //         const result = await fetch(configUrl);
    //         const config = await result.json();
    //         this.setApp(config.template.type);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    setCss(cssAttributes) {
        const style = `
        <style>
            @import "${this.baseUrl}/Components/header/header.component.css";

            header{
                --justifyContent: ${cssAttributes?.justifyContent};
                --position: ${cssAttributes?.position};
                --paddingTop: ${cssAttributes?.paddingTop}vh;
                --paddingBottom: ${cssAttributes?.paddingBottom}vh;
            }
        </style>
        `;
        console.log(style);
        return style;
    }

    getCss() {
        return `@import "${this.baseUrl}/Components/header/header.component.css";`;
    }

    setApp(){
        return `
        <header>
            <h1>
                <label for="nav-toggle">
                    <span class="las la-bars"></span>
                </label>
                Dashboard
            </h1>

            <div class="search-wrapper">
                <span class="las la-search"></span>
                <input type="search" placeholder="Rechercher"/>
            </div>

            <div class="user-wrapper">
                <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" alt="user" />
                <div>
                    <h4>John Doe</h4>
                    <small>super admin</small>
                </div>
            </div>
        </header>
        `;
    }

    isvalidJustifyContent(attribute) {
        const values = [
            'center',
            'start',
            'end',
            'flex-start',
            'flex-end',
            'left',
            'right',
            'normal',
            'space-between',
            'space-around',
            'space-evenly',
            'stretch',
            'safe center',
            'unsafe center',
            'inherit',
            'initial',
            'unset',
        ];
        return values.indexOf(attribute) !== -1;
    }

    isvalidPosition(attribute) {
        const values = [
            'static',
            'absolute',
            'fixed',
            'relative',
            'sticky',
            'inherit',
            'initial',
        ];
        return values.indexOf(attribute) !== -1;
    }

    getCssAttribute(){
        const style = {
            justifyContent: 'space-evenly',
            position: 'fixed',
            paddingTop: 1,
            paddingBottom: 1,
        };

        const justifyContent = this.getAttribute('justify-content') || 'space-evenly';
        if (!this.isvalidJustifyContent(justifyContent)) {
            style.justifyContent = 'space-evenly';
        }else {
            style.justifyContent = justifyContent;
        }

        const position = this.getAttribute('position') || 'fixed';
        if (!this.isvalidPosition(position)) {
            style.position = 'fixed';
        }else {
            style.position = position;
        }

        const paddingTop = this.getAttribute('paddingTop') || 'fixed';
        if (isNaN(paddingTop)) {
            style.paddingTop = 1;
        } else {
            style.paddingTop = paddingTop;
        }
        
        const paddingBottom = this.getAttribute('paddingBottom') || 'fixed';
        if (isNaN(paddingBottom)) {
            style.paddingBottom = 1;
        } else {
            style.paddingBottom = paddingBottom;
        }

        return style;

    }

}