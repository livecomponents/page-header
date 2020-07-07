(async function runModule(window, document) {
  if (typeof window === 'undefined'){ return; }
  await import('https://static.carfax.com/live-components/cxd-img-icon/v2.0.0/cxd-img-icon.mjs');
  const customElementName = 'page-header';
  const { coerceValue } = await import('./partials/utils.mjs');
  const {
    setUserState,
    mutationObserverCallback,
    registerEvents,
    updateGuestName,
    unregisterEvents,
    displayProfile
  } = await import('./partials/helpers.mjs');
  
  createBaseStyles();
  
  if (!window.customElements.get(customElementName)) {
    window.customElements.define(customElementName, class PageHeader extends HTMLElement {

      static get observedAttributes() {
        return [ 'user',  'avatar' ];
      }
    
      constructor(){
        super();
        this.root = null;
        this.hasCustomSignUp = false;
        this.hasCustomSignIn = false;
        this.hasCustomSignOut = false;
        this.hasCustomDropDown = false;
        this.userIsLoggedIn = false;
        this.userName = '';
        this.userPhotoURL = '';
        this.hasRendered = false;
      }
    
      async connectedCallback(){
        this.origin = window.location.origin;
        if (this.root === null) { this.root = this.attachShadow({ mode: "open" }); }
        await setUserState(this, this.origin, this.userName);
        this.root.querySelector('.ph__container').classList.add('fade-in');
        registerEvents(this);
        this.observer = new MutationObserver(mutationObserverCallback.bind(this));
        this.observer.observe(this, { childList: true });
      }
      
      attributeChangedCallback(name, oldVal, newVal){
        if(newVal === oldVal){ return; }
        if(name === 'user') {
          this.userName = coerceValue(newVal);
          this.userIsLoggedIn = !!this.userName;
          updateGuestName(this, this.userName);
          displayProfile(this);
          this.dispatchEvent(new CustomEvent('ph:userupdate', { userName: this.userName, userIsLoggedIn: this.userIsLoggedIn }));
        }
    
        if(name === 'avatar') {
          this.userPhotoURL = newVal;
          displayProfile(this);
        }
      }
    
      disconnectedCallback() {
        unregisterEvents(this);
        this.observer.disconnect();
      }
    
    });
  }

  function createBaseStyles(){
    injectCSS(baseCSS(), 'base__global-header-css')();
    requestAnimationFrame(injectCSS(baseCSS(), 'base__page-header-css'));
  }

  function injectCSS (targetCSS, elId) {
    return function () {
      if(!document || !!document.getElementById(elId)){ return; }
      const baseStyle = document.createElement('style');
      baseStyle.id = elId;
      baseStyle.innerHTML = targetCSS;
      document.head.appendChild(baseStyle);
    }
  }

  function baseCSS() {
    return /* css */`
      page-header a[slot] {
        color: var(--cah-color--link, #fff);
        font-weight: 500;
      }

      [slot="ph:custom-signin"]:after {
        display: inline-block;
        margin: 0 12px;
        content:"|";
      }

      [slot^="ph:"][hidden],
      [slot^="ph:"][hidden]:after {
        display: none;
      }

      [slot*="ph:"].offscreen {
        height:0;
        font-size:0;
        line-height:0;
        width:0;
        text-indent:-9000px;
        left:-100vw;
      }
    `;
  }
})(window, document);
