export class ComponentStub extends HTMLElement {
  
  constructor(){
    super();
    this.root = null;
    this.hasCustomSignUp = false;
    this.hasCustomSignIn = false;
    this.hasCustomSignOut = false;
    this.hasCustomDropDown = false;
    this.userIsLoggedIn = false;
    this.userFollowCount = 0;
    this.userName = '';
    this.userPhotoURL = '';
    this.userSearchCount = 0;
    this.hasRendered = false;
  }

  connectedCallback() {
    this.root = this.attachShadow({ mode: 'open' });
  }

}