import { template } from './template.mjs'; 

const activeClassName = 'is-active';
const desktopMediaQuery = '(min-width: 1080px)';
const hiddenClassName = 'offscreen';
const icons = { close: 'close', menu: 'menu', userCircle: 'userCircle' };
const iconAttr = 'shape';

export function displayProfile(component) {
  if(component.hasRendered && component.$) {
    setProfileImg(component);
    if(component.userName) {
      component.userIsLoggedIn = !!component.userName;
      component.$.accountInActive.classList.remove(hiddenClassName);
      component.$.accountActive.classList.remove(hiddenClassName);
      component.$.accountName.classList.remove(hiddenClassName);
      component.$.accountNameArrow.classList.remove(hiddenClassName);
      component.$.signInLink.classList.add(hiddenClassName);
      component.$.signUpLink.classList.add(hiddenClassName);
      if (component.$.loggedInProfile) {
        component.$.loggedInProfile.classList.remove(hiddenClassName);
      }
    } else {
      component.userIsLoggedIn = false;
      component.userName = '';
      component.$.profileIcon.classList.remove(hiddenClassName);
      component.$.avatar.classList.add(hiddenClassName);
      component.$.accountInActive.classList.remove(hiddenClassName);
      component.$.accountActive.classList[mediaMatches(desktopMediaQuery) ? 'add' : 'remove'](hiddenClassName);
      component.$.accountName.classList.add(hiddenClassName);
      component.$.accountIcon.classList.remove(hiddenClassName);
      component.$.accountNameArrow.classList.add(hiddenClassName);
      component.$.signInLink.classList.remove(hiddenClassName);
      component.$.signUpLink.classList.remove(hiddenClassName);
      if (component.$.loggedInProfile) {
        component.$.loggedInProfile.classList.add(hiddenClassName);
      }
    }
  }
}

export function unregisterEvents(component) {
  component.$.accountActive.removeEventListener('click', profileMenuHandler.bind(component));
  component.$.overlay.removeEventListener('click', overlayHandler.bind(component));
  component.$.toggle.removeEventListener('click', navMenuHandler.bind(component)); 
  window.removeEventListener('resize', onResizeHandler.bind(component));
}

export function registerEvents(component) {
  if(mediaMatches(desktopMediaQuery)) {
    component.$.nav.classList.remove(hiddenClassName);
  }
  component.$.overlay.addEventListener('click', overlayHandler.bind(component));
  component.$.toggle.addEventListener('click',navMenuHandler.bind(component));
  component.$.accountActive.addEventListener('click', profileMenuHandler.bind(component));
  window.addEventListener('resize', onResizeHandler.bind(component));
}

export function render (component, origin) {
  if (component.root) {
    const $template = document.createElement('template');
    component.hasCustomSignUp = !!component.querySelector('[slot="ph:custom-signup"]');
    component.hasCustomSignIn = !!component.querySelector('[slot="ph:custom-signin"]');
    component.hasCustomSignOut = !!component.querySelector('[slot="ph:custom-signout"]');
    component.hasCustomDropDown = !!component.querySelectorAll('[slot^="ph:profile-item-"]') && component.querySelectorAll('[slot^="ph:profile-item-"]').length > 0
    component.root.innerHTML = '';
    $template.innerHTML = template(component, origin);
    component.root.appendChild(document.importNode($template.content, true));
    cacheSelectors(component);
    component.hasRendered = true;
  }
}

function mediaMatches(mq) {
  return window.matchMedia && window.matchMedia(mq).matches;
}

function cacheSelectors(component) {
  const $root = component.root;
  component.$ = {
    accountActive: $root.querySelector('.ph__account'),
    accountInActive: $root.querySelector('.ph__account--loggedout'),
    accountIcon: $root.querySelector('.ph__account-icon'),
    accountName: $root.querySelector('.ph__account-name'),
    accountNameArrow: $root.querySelector('.ph__account-arrow-icon'),
    avatar: $root.querySelector('.ph__account-avatar'),
    innerAccountName: $root.querySelector('.ph__nav-listitem--profile .ph__account-name--profile'),
    list: $root.querySelector('.ph__nav-list'),
    loggedInProfile: $root.querySelector('.logged-in-profile'),
    nav: $root.querySelector('.ph__nav'),
    navIcon: $root.querySelector('.ph__toggle img-icon'),
    overlay: $root.querySelector('.ph__overlay'),
    profileNav: $root.querySelector('.ph__nav--profile'),
    profileIcon: $root.querySelector('.ph__account-icon-img'),
    signInLink: component.hasCustomSignIn ? component.querySelector('[slot="ph:custom-signin"]') : $root.querySelector('.ph__account-link--sign-in'),
    signUpLink: component.hasCustomSignUp ? component.querySelector('[slot="ph:custom-signup"]') : $root.querySelector('.ph__account-link--sign-up'),
    signOutLink: component.hasCustomSignOut ? component.querySelector('[slot="ph:custom-signout"]') : $root.querySelector('.ph__account-link--sign-out'),
    toggle: $root.querySelector('.ph__toggle')
  };
}

export function setUserState(component, origin = '', newVal = '') {
  if(component) {
    render(component, origin);
    displayProfile(component);
    updateGuestName(component, newVal);
    component.dispatchEvent(new CustomEvent('ph:userchange', { detail: { userName: component.userName, userIsLoggedIn: component.userIsLoggedIn }}));
  }
};

export function updateGuestName(component, newVal) {
  if(!newVal) { return; }
  if(component.hasRendered && component.$) {
    const $accountNameProfile = component.root.querySelector('.ph__account-name');
    if($accountNameProfile) { $accountNameProfile.innerHTML = `Hi, ${newVal}`; }
    if(component.$.innerAccountName) { component.$.innerAccountName.innerHTML = newVal; }
    if(component.$.accountName) { component.$.accountName.innerHTML = `Hi, ${newVal}`; }
  }
}

export function setProfileImg(component) {
  if(component.$.accountIcon.classList.contains(hiddenClassName)) {
    component.$.accountIcon.classList.remove(hiddenClassName);
  }
  if(component.userPhotoURL && component.userName) {
    component.$.profileIcon.classList.add(hiddenClassName);
    component.$.avatar.classList.remove(hiddenClassName);
  } else {
    component.$.profileIcon.classList.remove(hiddenClassName);
    component.$.avatar.classList.add(hiddenClassName);
  }
}

export function mutationObserverCallback(mutationsList, observer) {
  for(let mutation of mutationsList) {
    if (mutation.type === 'childList') {    
      if(this.root) {
        setUserState(this, this.origin);
        this.root.querySelector('.ph__container').classList.add('fade-in');
        unregisterEvents(this);
        registerEvents(this);
      }
    }
  }
}

function onResizeHandler(evt) {
  requestAnimationFrame(() => resetElements(this));
}

function profileMenuHandler(evt) {
  evt.preventDefault();
  if(!this.userIsLoggedIn) {
    window.location.href = this.origin && !this.hasCustomSignIn ? `${this.origin}/login` : '';
    return;
  }
  const dMQ = mediaMatches(desktopMediaQuery);
  if(this.$.profileIcon && !this.$.avatar && !dMQ) {
    if($icon.getAttribute(iconAttr) === icons.userCircle) {
      $icon.setAttribute(iconAttr, icons.close);
    } else {
      $icon.setAttribute(iconAttr, icons.userCircle);
    }
  }
  this.$.accountIcon.setAttribute(iconAttr, icons.close);
  this.$.toggle.classList.toggle(hiddenClassName);
  this.$.toggle.classList.remove(activeClassName);
  this.$.navIcon.setAttribute(iconAttr, icons.menu);
  this.$.list.classList.remove(activeClassName);
  this.$.overlay.classList.toggle(activeClassName);
  this.$.profileNav.classList.toggle(hiddenClassName);
  this.$.accountActive.classList.toggle(activeClassName);
  this.$.accountInActive.classList.remove(activeClassName);

  if(!dMQ) {
    this.$.accountActive.classList.remove(hiddenClassName);
  }
}

function navMenuHandler(evt) {
  handleMenuEvent(this);
  this.$.overlay.classList.toggle(activeClassName);
}

function resetElements(component) {
  if(component.$) {
    component.$.toggle.classList.remove(activeClassName);
    component.$.toggle.classList.remove(hiddenClassName);
    component.$.navIcon.setAttribute(iconAttr, icons.menu);
    component.$.list.classList.remove(activeClassName);
    component.$.overlay.classList.remove(activeClassName);
    component.$.overlay.classList.add(hiddenClassName);
    component.$.accountActive.classList.remove(activeClassName);
    component.$.profileNav.classList.add(hiddenClassName);
    if(!mediaMatches(desktopMediaQuery)){
      component.$.nav.classList.add(hiddenClassName);
    } else {
      component.$.nav.classList.remove(hiddenClassName);
    }
    displayProfile(component);
  }
}

function overlayHandler(evt) {
  resetElements(this);
  this.$.overlay.classList.remove(activeClassName);
}

function handleMenuEvent(component) {
  const isActive = !component.$.toggle.classList.contains(activeClassName) ? 'add' : 'remove';
  component.$.toggle.classList.toggle(activeClassName);
  component.$.nav.classList.toggle(hiddenClassName);
  component.$.navIcon.setAttribute(iconAttr, component.$.navIcon.getAttribute(iconAttr) === icons.menu ? icons.close : icons.menu);
  component.$.accountActive.classList[isActive](hiddenClassName);
  if(!mediaMatches(desktopMediaQuery)) { component.$.accountInActive.classList.add(hiddenClassName); }
  component.$.list.classList.toggle(activeClassName);
}
