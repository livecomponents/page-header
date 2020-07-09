(function (document, window) {
  // initialization on core look and feel for IE11 and crappy browsers
  if (typeof window === 'undefined'){ return; }
  window.addEventListener('load', function onload(){
    injectCSS();
    updateLogin(document.querySelector('page-header'))
  });n
    
  function injectCSS () {
    if(!document || !!document.getElementById('backup__page-header-css')){ return; }
    const baseStyle = document.createElement('style');
    baseStyle.id = 'backup__page-header-css';
    baseStyle.innerHTML = [
      'page-header{align-items: center;justify-content: center;display: flex;background: #3777bc;height: 64px;}'
      , '[slot="ph:logo"]{display: flex;margin: 0;align-items: center;}'
      , '[slot="ph:logo"] img,[slot="cah:logo"] {max-width: 137px;}'
      , 'page-header a, #logout, #page-header-user {font-size: 14px; padding: 0 8px;color: #fff;font-weight: 500;}'
      , 'a[slot="ph:skip-link"] {height: 0;font-size: 0;line-height: 0;width: 0;text-indent: -9000px;left: -100vw;}'
    ].join('');
    document.head.appendChild(baseStyle);
  }

  function updateLogin(component) {
    if(!!component.getAttribute('user')) {
      var appHeader = document.querySelector('page-header'),
          user = document.createElement('span'),
          logout = document.createElement('a');

      [].forEach.call(appHeader.querySelectorAll('> *'), function(el) {
        if(el.getAttribute('slot') && !(/(cah:link-)/.test(el.getAttribute('slot')))) {
          el.parentNode.removeChild(el);
        }
      });

      user.id = 'page-header-user';
      user.innerText = component.getAttribute('user');

      logout.setAttribute('href', '/signout');
      logout.id = 'logout';
      logout.innerText = 'Sign Out';
      
      component.appendChild(user);
      component.appendChild(logout);
    }
  }

})(document, window);
