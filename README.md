# &lt;page-header>
## *A Simple ESM web page header Web Component*

- [Developer documentation](docs/develop.md)
- [Contribution documentation](docs/contribute.md)

## Developer Experience

**Page Header**
| *customizations* | HTML Slots |
| *install method(s)* | HTML Script Tag |
| *runtime dependencies* | `<cxd-img-icon>` (svg icon component) |
| *raw bytes* | page-header = 7.7kb(Broken down by separate module files - 1.6kb, 521b,  2.4kb, 3.2kb), and cxd-img-icon = 8.8kb(Broken down by separate module files - 1.1kb, 6.6kb, 1.1kb) |
| *bytes over the wire* | `16.5kb` |
| *compression type* | brotli (gzip for nomodule js) |
| *browser support* | IE11 (nomodule-only basic css/initial login), full support for the last 2 versions of Safari, Edge, Firefox, Mobile Safari, Chrome |
| *developer environment* | Qunit (unit testing), bread-compressor cli (for gzip and br), Pika CDN via NPM (distribution) |
| *SSR Support* | minimal HTML boilerplate, JS not loaded on server |

**Requirements**

- a target application that supports HTML, JS, and CSS

## Terminology
| **term** | **definition** | **resources** |
| --- | --- | --- |
| *Web Component* | A native 1st class browser HTML node built with a combination of Custom Elements, Shadow DOM, and HTML Template tags | [webcomponents.org](https://wwww.webcomponents.org) |
| *Custom Element* | A custom & native 1st Class browser HTML element complete with lifecycyle methods and a constructor | [Using Custom ELements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) |
| *Shadow DOM* | Native encapulation for HTML on a page similar to DOM Fragments or IFrames | |
| *Shadow Root* | The reference container for a given Shadow DOM instance |[Using Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) |
| *Slot* | Transclusion HTML Nodes for Shadow DOM that live in the 'Light' DOM but are slotted into the Shadow DOM | [Slot usage](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot), [Slots and Template Tags](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots)  |
| *Custom Properties (AKA CSS Variables)* | scoped CSS values that can pierce through Shadow DOM | [Using Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) |
| *Custom Events* | Events that are developer created and typically pass data to the evt object | [Creating and triggering Custom Events](https://javascript.info/dispatch-events) |