import { coerceValue } from '../partials/utils.mjs';
import { ComponentStub } from './ComponentStub.mjs';

const { module, test } = QUnit;

let Component = null;
if(!window.customElements.get('component-stub')){
  window.customElements.define('component-stub', ComponentStub);
}

module( "coerceValue()", {
  beforeEach: () => {
    Component = document.createElement('utils-component');
    document.body.appendChild(Component);
  },
  afterEach: () => {
    document.querySelector('utils-component').outerHTML = '';
    Component = null;
  }
});

test('should return falsey values as empty strings', (assert) => {
  const undefinedCase = coerceValue(undefined);
  const nullCase = coerceValue(null);
  const falseCase = coerceValue(false);
  const emptyCase = coerceValue('');
  assert.ok(undefinedCase === '');
  assert.ok(nullCase === '');
  assert.ok(falseCase === '');
  assert.ok(emptyCase === '');
});

test('should return 0', (assert) => {
  const val = coerceValue(0);
  assert.ok(val === 0);
});

test('should return an empty string when it is a NaN value', (assert) => {
  const val = coerceValue(NaN);
  assert.ok(val === '');
});

test('should coerce "true" to a true boolean', (assert) => {
  const val = coerceValue('true');
  assert.ok(val === true);
});

test('should return truthy values as themselves', (assert) => {
  const val = coerceValue(10);
  assert.ok(val === 10);
});
