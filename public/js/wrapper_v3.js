const _hummingtree = (() => {

  let config = {};
  let URL_KEY = '';
  let AdModal;
  
 const init = ({
    height = '300px',
    width = '200px',
    hostId = '',
    autoOpen = false,
    className = 'fade-and-drop',
    closeButton =  true,
    overlay =  true
  }) => {
    config.HEIGHT = height;
    config.WIDTH = width;
    config.HOST_ID = hostId;
    config.AUTO_OPEN = autoOpen;
    config.CLASS_NAME = className;
    config.CLOSE_BUTTON = closeButton;
    config.OVERLAY = overlay;
  };

  const createCORSRequest = (method, url) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.onload = () => { xhr.status == 200 ? resolve(xhr.response) : reject(Error(xhr.statusText))};
      xhr.onerror = () => { reject(Error('Network Error'))};
      xhr.send();
    });
  }

  const createWrapper = (data) => {
    const { text, link, title, imageUrl } = data;
    console.log(data);

    const hummingtree = document.getElementById('hummingtree');
    const wrapper = document.createElement('div');
    const adTitle = document.createElement('h2');
    const adText = document.createElement('p');
    const aTag = document.createElement('a');

    wrapper.id = 'hum-wrapper';
    wrapper.style.height = `${config.HEIGHT}`;
    wrapper.style.width = `${config.WIDTH}`;
    wrapper.style.backgroundImage = `url(${imageUrl})`;
    adTitle.textContent = `${title}`;
    adText.textContent = `${text}`;

    // wrapper.addEventListener('click', conversion, false);

    hummingtree.appendChild(wrapper);
    wrapper.appendChild(adTitle);
    wrapper.appendChild(aTag);
    aTag.appendChild(adText);
  }

  const conversion = () => {
    createCORSRequest('GET', `http://hummingtree.co/api/delivery/${URL_KEY}`)
      .catch((err) => {
        console.error(err);
      });
  }

  const getAd = () => {
    createCORSRequest('POST', `http://www.hummingtree.co/api/delivery/${config.HOST_ID}`)
      .then((data) => {
        const json = JSON.parse(data);
        URL_KEY = json.urlKey;
        createWrapper(json);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  this.Modal = function() {

    this.closeButton = null;
    this.modal = null;
    this.overlay = null;
    this.transitionEnd = transitionSelect();

    if (arguments[0] && typeof arguments[0] === 'object') {
      this.options = extendDefaults(defaults, arguments[0]);
    }

    if(config.autoOpen === true) this.open();
  }

  // Public Methods

  Modal.prototype.close = function() {
    const _ = this;
    this.modal.className = this.modal.className.replace(' hum-open', '');
    this.overlay.className = this.overlay.className.replace(' hum-open', '');
    this.modal.addEventListener(this.transitionEnd, () => {
      _.modal.parentNode.removeChild(_.modal);
    });
    this.overlay.addEventListener(this.transitionEnd, () => {
      if (_.overlay.parentNode) _.overlay.parentNode.removeChild(_.overlay);
    });
  }

  Modal.prototype.open = function() {
    buildOut.call(this);
    initializeEvents.call(this);
    window.getComputedStyle(this.modal).height;
    this.modal.className = this.modal.className +
      (this.modal.offsetHeight > window.innerHeight ?
        ' hum-open hum-anchored' : ' hum-open');
    this.overlay.className = this.overlay.className + ' hum-open';
  }

  function buildOut() {

    let content;
    let contentHolder;
    let docFrag;

    if (typeof this.options.content === 'string') {
      content = this.options.content;
    } else {
      content = this.options.content.innerHTML;
    }

    docFrag = document.createDocumentFragment();

    this.modal = document.createElement('div');
    this.modal.className = 'hum-modal ';
    this.modal.style.minWidth = `${config.WIDTH}px`;
    this.modal.style.maxWidth = `${config.HEIGHT}px`;

    this.closeButton = document.createElement('button');
    this.closeButton.className = 'hum-close close-button';
    this.closeButton.innerHTML = '&times;';
    this.modal.appendChild(this.closeButton);

    // If overlay is true, add one
    if (config.OVERLAY === true) {
      this.overlay = document.createElement('div');
      this.overlay.className = 'hum-overlay ';
      docFrag.appendChild(this.overlay);
    }

    // Create content area and append to modal
    contentHolder = document.createElement('div');
    contentHolder.className = 'hum-content';
    contentHolder.innerHTML = content;
    this.modal.appendChild(contentHolder);

    // Append modal to DocumentFragment
    docFrag.appendChild(this.modal);

    // Append DocumentFragment to body
    document.body.appendChild(docFrag);
  }

  function initializeEvents() {
    if (this.closeButton) this.closeButton.addEventListener('click', this.close.bind(this));
    if (this.overlay) this.overlay.addEventListener('click', this.close.bind(this));
  }

  const transitionSelect = () => {
    const el = document.createElement('div');
    if (el.style.WebkitTransition) return 'webkitTransitionEnd';
    if (el.style.OTransition) return 'oTransitionEnd';
    return 'transitionend';
  }

  const getHummingtree = () => {
    const hummingtree = document.getElementById('hummingtree');
  // const myContent = document.getElementById('content');

    AdModal = new Modal();

    hummingtree.addEventListener('click', () => {
      myModal.open();
    });
  }

  return {
    init: init,
    getAd: getAd,
    getHummingtree: getHummingtree
  }
})();


