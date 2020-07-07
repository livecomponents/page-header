import {
  render,
  setProfileImg,
  displayProfile,
  setCountFor,
  updateGuestName
} from '../partials/helpers.mjs';
import { ComponentStub } from './ComponentStub.mjs';

const { test, module } = QUnit;
const beforeEach = () => {
  Component = document.createElement('component-stub');
  Component.innerHTML = `
    <a href="#main-content" slot="cah:skip-link">Skip to Main Content</a>
    <a slot="cah:logo" title="CARFAX Used Car Listings and Vehicle History" href="https://www.carfax.com">
      <img src="assets/logo.svg" alt="CARFAX Logo" />
    </a>
    <a slot="cah:link-1" href="https://www.carfax.com/cars-for-sale">Used Cars for Sale</a>
    <a slot="cah:link-2" href="https://secure.carfax.com/creditCard.cfx">CARFAX Reports</a>
    <a slot="cah:link-3" href="https://www.mycarfax.com/">My Car Maintenance</a>
    <a slot="cah:link-4" href="https://www.carfax.com/value/">Used Car Values</a>
    <a slot="cah:link-5" href="https://www.carfax.com/car-research">Research</a>
    <a slot="cah:link-6" href="https://support.carfax.com">Help</a>
  `;
  document.body.appendChild(Component);
};
const afterEach = () => {
  document.querySelector('component-stub').outerHTML = '';
  Component = null;
};
let Component = null;
if(!window.customElements.get('component-stub')){
  window.customElements.define('component-stub', ComponentStub);
}

module('render()', { beforeEach, afterEach });

test('should update the rendered component state', async (assert) => {  
  assert.ok(Component.hasRendered === false);
  await render(Component, window.location.origin);
  assert.ok(Component.hasRendered === true); 
});

test('should create reference selectors', async (assert) => {
  assert.ok(Component.$ === undefined);
  assert.ok(Component.root.innerHTML === '');
  await render(Component, window.location.origin);
  assert.ok(Component.$ !== undefined);
  assert.ok(Component.$.accountName !== undefined);
});

test('should update the shadowRoot html', async (assert) => {
  await render(Component, window.location.origin);
  assert.ok(Component.root.querySelectorAll('slot').length === 8);
});

module('setProfileImg()', { beforeEach, afterEach });

test('should show the account & profile icons', async (assert) => {
  const offscreenKlass = /(offscreen)/;
  await render(Component, window.location.origin);
  await setProfileImg(Component);
  assert.ok(offscreenKlass.test(Component.$.accountIcon.className) === false);
  assert.ok(offscreenKlass.test(Component.$.profileIcon.classList) === false);
  assert.ok(offscreenKlass.test(Component.$.avatar.classList) === true)
});

test('should show the avatar icon', async (assert) => {
  const offscreenKlass = /(offscreen)/;
  await render(Component, window.location.origin);
  Component.userPhotoURL = "localhost:8090/myurl";
  Component.userName = "HolaAmigos";
  await setProfileImg(Component);
  assert.ok(offscreenKlass.test(Component.$.profileIcon.classList) === true);
  assert.ok(offscreenKlass.test(Component.$.avatar.classList) === false);
});

module('displayProfile()', { beforeEach, afterEach });

test('should display loggedout user state', async (assert) => {
  await render(Component, window.location.origin);
  await displayProfile(Component);
  assert.ok(Component.userIsLoggedIn === false);
  assert.ok(Component.$.accountName.classList.contains('offscreen') === true);
  assert.ok(Component.$.accountNameArrow.classList.contains('offscreen') === true);
  assert.ok(Component.$.signInLink.classList.contains('offscreen') === false);
  assert.ok(Component.$.signUpLink.classList.contains('offscreen') === false);
});

test('should display loggedin user state', async (assert)=> {
  Component.userName = 'TylerKilburn1234';
  await render(Component, window.location.origin);
  await displayProfile(Component);
  assert.ok(Component.userIsLoggedIn === true);
  assert.ok(Component.$.accountName.classList.contains('offscreen') === false);
  assert.ok(Component.$.accountNameArrow.classList.contains('offscreen') === false);
  assert.ok(Component.$.signInLink.classList.contains('offscreen') === true);
  assert.ok(Component.$.signUpLink.classList.contains('offscreen') === true);
});

module('setCountFor()', { beforeEach, afterEach });

test('should update the followCount', async (assert)=> {
  assert.ok(Component.userFollowCount === 0);
  await render(Component, window.location.origin);
  await setCountFor('#follow-count', '5', Component, 'follows');
  assert.ok(Component.userFollowCount === 5);
  assert.ok(Component.root.querySelector('#follow-count').innerHTML === ' (5)');
});

test('should not update with invalid selectors or counts', async (assert)=>{
  await render(Component, window.location.origin);
  await setCountFor('#follow-count', 'test', Component, 'follows');
  assert.ok(Component.userFollowCount === 0);
  assert.ok(Component.root.querySelector('#follow-count').innerHTML === '');
  await render(Component, window.location.origin);
  await setCountFor('#follow', undefined, Component, 'follows');
  assert.ok(Component.userFollowCount === 0);
  assert.ok(Component.root.querySelector('#follow-count').innerHTML === '');
  await render(Component, window.location.origin);
  await setCountFor('#follow', '5', Component, 'follows');
  assert.ok(Component.userFollowCount === 0);
  assert.ok(Component.root.querySelector('#follow-count').innerHTML === '');
});

module('updateGuestName()', { beforeEach, afterEach });

test('should update the profile name text', async (assert)=> {
  await render(Component, window.location.origin);
  const accountNameText = Component.root.querySelector('.cah__account-name');
  assert.ok(accountNameText.innerHTML === 'Hi, ');
  await updateGuestName(Component, 'Peter');
  assert.ok(accountNameText.innerHTML === 'Hi, Peter');
});

test('should update the inner account html', async (assert) => {
  await render(Component, window.location.origin);
  assert.ok(Component.$.innerAccountName.innerHTML === '');
  await updateGuestName(Component, 'Mary');
  assert.ok(Component.$.innerAccountName.innerHTML === 'Mary');
});

test('should not update with undefined names', async (assert) => {
  await render(Component, window.location.origin);
  await updateGuestName(Component, undefined);
  assert.ok(Component.$.innerAccountName.innerHTML === '');
});
