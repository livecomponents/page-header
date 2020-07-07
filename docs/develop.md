- [Main documentation](../README.md)
- [Contribution documentation](docs/contribute.md)

# Development
### Setup
To initialize this component for all supported browsers, you must add scripts to the head of the document that point to their location on the CDN. 
ONLY use one app header instance per page. This component is not meant for multiple instantiation on a single page.

#### Initialization HTML
```html
<!-- OPTIONAL: preloaded dependency for a performance boost -->
<link rel="preload" crossorigin href="https://unpkg.com/@live-components/page-header@1.1.0/partials/utils.mjs" crossorigin as="script"/>

<!-- REQUIRED: main module for modern Evergreen browsers  (Safari, Edge, Chrome, Mobile Safari, and Firefox) -->
<script crossorigin type="module" src="https://unpkg.com/@live-components/page-header@1.1.0/page-header.mjs"></script>

<!-- OPTIONAL: fallback module if basic styling and function support for older browsers is needed (IE11) -->
<script crossorigin nomodule type="text/javascript" src="https://unpkg.com/@live-components/page-header@1.1.0/page-header.js"></script>
```

#### Minimal HTML Content (for SEO)*
This is the HTML required to be on page before Google can scan the page for their indexing algorithm. This is usually achieved via `prerendering` or `server side rendering (SSR)`. None of the JavaScript or CSS for the `<page-header />` is necessary for the page to be indexed. Conversely, the HTML navigtion links MUST be on the page.

```html
  <page-header>
    <a href="#main-content" slot="cah:skip-link">Skip to Main Content</a>
    <a slot="ph:link-1" href="https://www.example.com/">Home</a>
    <a slot="ph:link-2" href="https://www.example.com/products">Products</a>
    <a slot="ph:link-3" href="https://www.example.com/services">Services</a>
    <a slot="ph:link-4" href="https://www.example.com/innovations">Innovations</a>
    <a slot="ph:link-5" href="https://www.example.com/testimonials">Testimonials</a>
    <a slot="ph:link-6" href="https://support.example.com/">Help</a>
  </page-header>
```
(*) Link `href` values may vary

### Theming
Set these values to get different themes.

| **Variable Name** | **Default Value** |
| --- | --- |
| `--ph-color--primary` | `var(--basic--blue, #3777bc)` |
| `--ph-color--secondary` | `var(--basic--blue-dark, #2C5F96)` |
| `--ph-color--link` | `var(--basic--white, #fff)` |
| `--ph-color--shadow` | `#1b3a5b` |
| `--ph-color--listitem-border` | `rgba(0, 0, 0, .1)` |

### Attributes
| **name** | **summary** | **expected value** |
| --- | --- | --- |
| `avatar` | 'avatar' is the profile image for the user to be displayed when they are logged in | an image URL string |
| `user` | this is the user display name | a name or email string |

### Slots
| **name** | **summary** | **type** | **SEO Requirement** |
| --- | --- | --- | --- |
| `ph:link-*` | These are the main navigation links | dynamic | ✅ |
| `ph:profile-item-*` | These are the profile links for logged in users | dynamic | ❌ |
| `ph:skip-link` | This is a offscreen element typically used by screen readers for accessibility | static | ❌ |
| `ph:logo` | This is the logo link usually containing a `<img>` html element as its only child | static | ✅ |
| `ph:custom-signin` | This is a custom replacement for the default sign in link | static | ❌ |
| `ph:custom-signup` | This is a custom replacement for the default sign up link | static | ❌ |
| `ph:custom-signout` | This is a custom replacement for the default sign out link | static | ❌ |
*(*) can be multiple elements - each incremented by an integer starting with `1`*

### Custom Event Hooks
| **name** | **detail data** | **summary** |
| --- | --- | --- |
| `ph:userchange` | `{ userIsLoggedIn: boolean, userName: string }` | triggers when user name is updated |

## Dependencies
| **name** | **location** | **type** | **reason** | **swappable** |
| --- | --- | --- | --- | --- |
| `<cxd-img-icon>` | `https://static.carfax.com/live-components/cxd-img-icon/master/cxd-img-icon.mjs` | External Custom Element | provides svg based icons | ❌ |

## Customization

### Profile Dropdown Navigation Links
The standard `carfax.com` profile navigation consists of several HTML Anchor links related to the user's account. If the default values are not what is needed for your application, add slots with the name pattern `ph:profile-item-*` as seen in the example below...

```html
<page-header>
  <!-- other slots can go here ... -->
  <a href="/example-1" slot="ph:profile-item-1">Example 1</a>
  <a href="/example-2" slot="ph:profile-item-2">Example 2</a>
</page-header>
```
Note that the login & signout link still remain when adding these slots. You can customize the signout link as well by additionally by using the `ph:custom-signout` slot.

### Skip Link
Skip links are a main page navigation accessibility feature that enables sight-impaired users to move past the navigation section of a page that can potentially be repeated over and over by the screen readers. Use the `ph:skip-link` to add this to your application.   

```html
<page-header>
  <!-- other slots can go here ... -->
  <a href="#main-content" slot="ph:skip-link">Skip to main content</a>
</page-header>
<!-- add a named link outside your 'cxd-app-header' that the skip links can link to -->
<a name="main-content"></a>
<!-- main HTML content goes here -->
```

### Sign Up, Sign In, and Sign Out
If you need a custom sign in, sign up, or sign out link you can use their respective slot elements to add those to your header...

```html
<page-header>
  <!-- other slots can go here ... -->
  <a href="/login" slot="ph:custom-signup">Sign Me Up</a>
  <a href="/logout" slot="ph:custom-signout">I'm Out!</a>
  <a href="/logout" slot="ph:custom-signin">Let me In!</a>
</page-header>
```

### Hiding Slots
There might be times where you want to hide a slot but remove the default value. To do this you must add the slot as normal but add an additional `hidden` attribute to it.
```html
<page-header>
  <!-- other slots can go here ... -->
  <a href="/login" hidden slot="ph:custom-signup">Sign Me Up</a>
</page-header>
```

### Main Navigation
It is required for all consumer-facing web applications on the `carfax.com` domain to use ALL 6 (and ONLY 6) `ph:link-*` slots for the required links. It is recommended for all other applications you use no more than 6 slots and no less than 1 slot in your HTML. All of the main navigation slots are expected to be HTML Anchor tags.


## Base CSS
Please note that some CSS is injected to the head of the document on initialization of this codebase (ONLY once). This is done to insure that some styling for slots does not get broken by any CSS reset the application.

## NPM Scripts
| **command** | **summary** |
| --- | --- |
| `npm run build` | handles compression. The main file is compressed to brotli and the fallback file (or 'nomodule' file) is compressed to gzip |
| `npm run test` | runs unit tests | 
| `npm run start` | runs an dev server to test the component (port 5000) |
