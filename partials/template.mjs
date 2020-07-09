export const template = (component, origin) => {
  return /*html*/`
    <style>
      ${css()}
    </style>
    <div class="ph__container">
      <div class="ph__toggle">
        <img-icon shape='menu' fill='100'></img-icon>
      </div>
      <div class="ph__logo">
        <slot id="logo-link" name="ph:logo"></slot>
      </div>
      <nav class="ph__nav offscreen">
        <slot name="ph:skip-link"></slot>
        <ul class="ph__nav-list">
          ${navList(component)}
        </ul>
      </nav>
      <div class="ph__account">
        <span class="ph__account-name offscreen">Hi, ${component.userName}</span>
        <img-icon class="ph__account-arrow-icon offscreen" shape="triangleArrowDown" fill="100"></img-icon>
        <a href="${origin}/log${component.userIsLoggedIn ? 'out' : 'in'}" class="ph__account-icon">
          <img class="ph__account-avatar offscreen" src="${component.userPhotoURL}" alt="user profile photo" />
          <img-icon class="ph__account-icon-img" shape="userCircle" fill="100"></img-icon>
        </a>
        </div>
      <div class="ph__account${component.userIsLoggedIn ? ' offscreen' :  ''} ph__account--loggedout">
        ${component.hasCustomSignIn ? '<slot name="ph:custom-signin"></slot>' : `<a href="${origin}/signin" class="ph__account-link--sign-in">Sign In</a>`}
        ${component.hasCustomSignUp ? '<slot name="ph:custom-signup"></slot>' : `<a href="${origin}/signup" class="ph__account-link--sign-up">Sign Up</a>`}
      </div>
      <nav class="ph__nav--profile offscreen">
        <ul class="ph__nav-list--profile">
          ${profileNavListHTML(component, origin)}
        </ul>
      </nav>
    </div>
    <div class="ph__overlay"></div>
  `;
};

export function profileNavListHTML(component, origin) {
  return component ? `
    ${listItemToggle(component.userName, component.userIsLoggedIn)}
    ${!component.hasCustomDropDown ? '' : profileListItems(component.querySelectorAll('[slot^="ph:profile-item-"]'), component.renderProfileSlots)} 
    ${signoutLink(origin, component.hasCustomSignOut)}
  `: '';
}

export function listItemToggle(userName, userIsLoggedIn) {
  return /* html */`
    <li class="ph__nav-listitem--profile logged-in-profile${userIsLoggedIn ? '' : ' offscreen'}">
      <a href="#" class="ph__account-icon">
        <img-icon shape="userCircle" fill="100"></img-icon>
      </a>
      <span class="ph__account-name--profile">${userName ? `Hi, ${userName}`: ''}</span>
    </li>
  `;
}

export function profileListItems(nodeList, renderProfileSlots) {
  return renderProfileSlots ? !!nodeList && Array.from(nodeList, (item) => {
    return !!item ? /* html */`
      <li class="ph__nav-listitem--profile custom">
        <slot name="${item.getAttribute('slot')}"></slot>
      </li>` : '';
  }).join('\n') : '';
}

export function navList(component) {
  const nodeList = component.querySelectorAll('[slot^="ph:link-"]')
  return !!nodeList && Array.from(nodeList, (item) => {
    return !!item ? /* html */`
      <li class="ph__nav-listitem">
        <slot name="${item.getAttribute('slot')}"></slot>
      </li>` : '';
  }).join('\n');
}

export function signoutLink(origin = '', customSignOut = false) {
  return /* html */`
    <li class="ph__nav-listitem--profile">
      ${customSignOut ? '<slot name="ph:custom-signout"></slot>' : `<a href="${origin}/logout">Sign Out</a>`}
    </li>
  `;
}

export function userLogo(origin = '', userPhotoURL = '') {
  return /* html */`
    <a href="${origin}/log${userIsLoggedIn ? 'out' : 'in'}" class="ph__account-icon">
      <img class="ph__account-avatar offscreen" src="${userPhotoURL}" alt="user profile photo" />
      <img-icon class="ph__account-icon-img" shape="userCircle" fill="100"></img-icon>
    </a>
  `;
}

export function css() {
  return /* css */`
    :host {
      --img-icon--color: var(--ph-color--link, #fff);
      height: 64px;
      z-index: 398;
      top: 0px;
      right: 0px;
      margin: 0;
      left: 0px;
    }

    :host,
    .ph__toggle {
      background-color: var(--ph-color--primary, #3777bc);
    }

    img-icon {
      width: 24px;
      height: 24px;
    }

    :host,
    .ph__overlay {
      position: fixed;
    }

    :host,
    .ph__container,
    .ph__nav-listitem,
    .ph__nav-listitem--profile,
    .ph__logo,
    .ph__account-name--profile {
      width: 100%;
    }

    .ph__container.fade-in {
      opacity: 1;
    }

    .offscreen,
    .ph__nav-list,
    .ph__account-link--sign-in,
    .ph__account-link--sign-up,
    .ph__account-link--sign-in.offscreen,
    .ph__account-link--sign-up.offscreen,
    .ph__account.offscreen,
    .ph__nav.offscreen,
    .ph__nav--profile.offscreen,
    ::slotted([slot='ph:skip-link']) {
      height: 0;
      font-size: 0;
      line-height: 0;
      width: 0;
      text-indent: -9000px;
      left: -100vw;
      position: absolute;
    }

    ::slotted([slot='ph:logo']),
    .ph__nav--profile,
    .ph__nav {
      position: absolute;
    }

    .ph__nav-list.is-active,
    .ph__nav--profile,
    .ph__account-name--profile {
      height: auto;
    }

    .ph__nav-list.is-active {
      text-indent: 0;
      left: 0;
    }

    .ph__overlay {
      z-index: 397;
    }

    .ph__container,
    .ph__logo,
    .ph__toggle,
    .ph__account,
    .logged-in-profile {
      display: flex;
      align-items: center; 
    }

    .ph__container {
      justify-content: space-between;
      max-height: 64px;
      opacity: 0;
      transition: opacity 1s ease;
    }

    .ph__toggle,
    .ph__container,
    .ph__nav-list {
      position: relative;
    }

    ::slotted([slot='ph:logo']),
    .ph__logo,
    .ph__container:after,
    .ph__account-icon,
    .ph__account-name--profile {
      display: block;
    }

    .ph__container:after {
      content: "";
      clear: both;
    }

    ::slotted([slot='ph:logo']),
    .ph__toggle {
      text-align: center;
    }

    ::slotted([slot='ph:logo']) {
      width: 155px;
      left: calc((100vw - 155px) / 2);
      top: calc((100% - 30px) / 2);
    }

    .ph__logo {
      margin: 0 auto;
    }

    ::slotted([slot='ph:logo']),
    ::slotted([slot^='ph:link']),
    ::slotted([slot='ph:custom-signup']),
    ::slotted([slot='ph:custom-signin']),
    .ph__account-link--sign-in,
    .ph__account-link--sign-up {
      color: var(--ph-color--link, #fff);
      line-height: 1;
      font-size: 14px;
      font-weight: 400;
      text-decoration: none;
    }

    ::slotted([slot='ph:logo']),
    ::slotted([slot^='ph:link']),
    ::slotted([slot='ph:custom-signup']),
    ::slotted([slot='ph:custom-signin']),
    .ph__account-link--sign-in,
    .ph__account-link--sign-up,
    .ph__toggle {
      cursor: pointer;
    }

    .is-hidden,
    .ph__account-name,
    .ph__account-arrow-icon {
      display: none;
    }

    .ph__account-name--profile {
      text-overflow: none;
      width: 100%;
      white-space: normal;
      max-width: 100%;
      text-align: left;
      text-transform: uppercase;
    }

    .ph__toggle.is-active,
    .ph__account.is-active,
    .ph__nav-list,
    .ph__nav--profile {
      background-color: var(--ph-color--secondary, #2C5F96);
    }

    .ph__nav--profile {
      right: 0;
      z-index: 400;
      box-shadow: inset 0 11px 8px -10px var(--ph-color--shadow, #1b3a5b);
      top: 64px;
    }
    .ph__nav--profile,
    .ph__nav-list {
      width: 100vw;
    }

    .ph__toggle {
      min-height: 64px;
      justify-content: center;
      z-index: 901;
      padding: 0 12px;
    }

    .ph__toggle-icon,
    .ph__toggle-icon.is-active,
    .ph__account-icon {
      width: 24px;
      height: 24px;
    }

    .ph__nav,
    .ph__nav--profile {
      top: 64px;
    }

    .ph__nav-listitem,
    .ph__nav-listitem--profile {
      border-bottom-color: var(--ph-color--listitem-border, rgba(0, 0, 0, .1));
    }

    .ph__nav-list {
      overflow-y: auto; 
      margin: 0;
      min-height: 100vh;
      padding: 0 0 10px 0;
    }

    .ph__account-avatar {
      width: 24px;
      height: 24px;
      max-width: 100%;
      border-radius: 50%;
    }

    .ph__account.is-active,
    .ph__nav-listitem,
    .ph__nav-listitem--profile {
      cursor: pointer;
    }

    .ph__nav-listitem {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      padding: 32px 16px;
      margin: 0;
    }

    .ph__account {
      position: absolute;
      right: 0;
      height: 64px;
    }

    .ph__account-icon {
      display: block;
      padding: 16px;
      height: 24px;
    }

    .ph__account-icon.is-active {
      transform: translate3d(0, 0, 0);
    }

    .ph__nav--profile {
      z-index: 400;
      height: auto;
      background-color: var(--ph-color--secondary, #2c5f96);
      box-shadow: inset 0 11px 8px -10px var(--ph-color--shadow, #1b3a5b);
      top: 64px;
    }

    .ph__nav-list--profile {
      height: 100vh;
      margin: 0;
      padding: 0;
      list-style: none;
      color: var(--ph-color--link, #fff);
    }

    .ph__nav-listitem--profile {
      padding: 19px 0 19px 14px;
      border-bottom: 1px solid rgba(0,0,0,.1);
      font-size: 16px;
      max-width: calc(100% - 14px);
    }

    .ph__nav-listitem--profile > a {
      color: var(--ph-color--link, #fff);
      text-decoration: none;
    }

    .ph__account--loggedout.ph__account {
      display: none;
    }

    @media screen and (min-width: 430px) {
      :host,
      .ph__container {
        min-height: 64px;
      }
      .ph__overlay.is-active {
        top: 64px;
        left: 0;
        width: 100vw;
        min-height: 100vh;
        height: 100vh;
        background-color: var(--ph-color--overlay, rgba(0, 0, 0, .25));
      }

      ::slotted([slot='ph:custom-signup']),
      ::slotted([slot='ph:custom-signin']),
      .ph__account-link--sign-in,
      .ph__account-link--sign-up {
        position: relative;
        height: auto;
        text-indent: 0;
        left: 0;
      }

      ::slotted([slot='ph:custom-signup']),
      ::slotted([slot='ph:custom-signin']),
      .ph__account-link--sign-in,
      .ph__account-link--sign-up,
      .ph__nav {
        z-index: 901;
        width: auto;
      }

      .ph__nav-list {
        width: 1080px;
      }

      .ph__account-link--sign-in:after {
        display: inline-block;
        margin: 0 12px;
        content: "|";
      }

      .ph__nav-listitem:hover,
      .ph__nav-listitem--profile:hover {
        background-color: var(--ph-color--primary, #3777bc);
        cursor: pointer;
      }

      .ph__nav--profile {
        width: 372px;
      }

    }

    @media screen and (min-width: 430px) and (max-width: 1080px) {
      .ph__nav-list {
        max-width: 75vw;
      }
    }

    @media screen and (min-width: 1080px) {
      :host,
      .ph__nav,
      .ph__account {
        height: 64px;
      }

      a {
        color: var(--ph-color--link, #fff);
        font-weight: 500;
      }

      .ph__account-icon {
        padding: 0;
      }

      .ph__account-name {
        flex: 1;
        line-height: 1;
        cursor: pointer;
        color: var(--ph-color--link, #fff);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: calc(100% - 11px);
        max-width: 100px;
        text-transform: uppercase;
        display: inline-block;
        text-align: right;
      }

      .ph__account-arrow-icon {
        display: unset;
      }
      
      .ph__nav {
        position: static;
        margin: 0 auto 0 0;
      }

      .ph__nav-list {
        margin: 0 auto 0 0;
        min-height: auto;
        padding: 0;
        width: 100%;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        background-color: var(--ph-color--primary, #3777bc);
      }

      ::slotted([slot^='ph:link']),
      .ph__nav-listitem {
        display: flex;
        align-items: center;
        position: static;
        width: auto;
        border-bottom: none;
        height: 64px;
        padding: 0;
        margin: 0;
        cursor: pointer;
        white-space: nowrap;
      }

      ::slotted([slot^='ph:link']) {
        margin: 0px 20px;
      }

      .ph__toggle {
        height: 0;
        font-size: 0;
        width: 0;
        text-indent: -9000px;
        left: -100vw;
      }

      .ph__nav-list,
      .ph__account {
        position: static;
        height: auto;
        width: auto;
        text-indent: 0;
        left: 0;
      }

      .ph__logo {
        display: flex;
        align-items: center;
        margin: 0;
        max-width: 137px;
      }

      .ph__nav-listitem:hover,
      .ph__account:hover,
      .ph__account.is-active {
        background-color: var(--ph-color--secondary, #2C5F96);
        cursor: pointer;
      }

      ::slotted([slot='ph:logo']) {
        position: static;
      }

      .ph__container  {
        margin: 0 auto;
        display: flex;
        width: 100%;
        max-width: 1280px;
        max-height: 64px;
        align-items: stretch;
      }

      .ph__account {
        display: flex;
      }
        
      .ph__account {
        align-items: center;
        min-height: 100%;
        max-width: calc(100% - 20px);
        padding: 0 8px;
        position: absolute;
        bottom: 0;
        right: 0;
        left: auto;
        z-index: 999;
        line-height: 1.5em;
      }

      .ph__nav-list--profile {
        height: calc(100% - 66px);
      }

      .ph__nav-listitem--profile.logged-in-profile {
        display: none;
      }

      .ph__overlay.is-active {
        top: 64px;
      }

      .ph__account--loggedout.ph__account {
        display: flex;
      }

      .ph__account--loggedout.ph__account:hover {
        background-color: var(--ph-color--primary, #3777bc); 
      }

    }
  `;
}

