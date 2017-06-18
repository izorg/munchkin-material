/* global munchkin */

function selectBannerVisible(state) {
  return state.app.bannerVisible;
}

function observeStore(store, select, onChange) {
  let currentState;

  function handleChange() {
    const nextState = select(store.getState());

    if (nextState !== currentState) {
      currentState = nextState;

      onChange(currentState);
    }
  }

  const unsubscribe = store.subscribe(handleChange);

  handleChange();

  return unsubscribe;
}

function onBannerVisibilityChange(bannerVisible) {
  let container = document.getElementById('banner-container');

  if (bannerVisible && !container) {
    container = document.createElement('div');
    container.id = 'banner-container';

    document.body.appendChild(container);

    container.innerHTML = `
      <ins 
        class="adsbygoogle"
        style="display:block;width:320px;height:50px;margin:0 auto;"
        data-ad-client="ca-pub-8911738675751781"
        data-ad-slot="4838760545"
      />`;
    (adsbygoogle = window.adsbygoogle || []).push({}); // eslint-disable-line no-undef
  } else if (!bannerVisible && container) {
    container.remove();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('app');
  const munchkinApp = munchkin.init(el);

  if (process.env.NODE_ENV === 'development') {
    window.store = munchkinApp.store;
  }

  observeStore(munchkinApp.store, selectBannerVisible, onBannerVisibilityChange);
});
