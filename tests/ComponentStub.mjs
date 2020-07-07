export class ComponentStub extends HTMLElement {
  
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

  connectedCallback() {
    this.root = this.attachShadow({ mode: 'open' });
  }

}