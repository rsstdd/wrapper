const hummingtree = (() => {
  let HOST_ID;
  let URL_KEY = '';
  let slider;
  let caret;
  let logo;
  let close;
  let overlay;
  let hummingtreeDiv;

  const init = ({
    hostId = '',
  }) => {
    HOST_ID = hostId;
  };

  const _createCORSRequest = (method, url) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.onload = () => { xhr.status == 200 ? resolve(xhr.response) : reject(Error(xhr.statusText))};
      xhr.onerror = () => { reject(Error('Network Error'))};
      xhr.send();
    });
  }

  const _createWrapper = (data) => {
    const { text, link, title, imageUrl } = data;
    const docFrag = document.createDocumentFragment();
    const adTitle = document.createElement('h2');
    const adText = document.createElement('p');
    const button = document.createElement('span');
    const adLink = document.createElement('a');
    const humLink = document.createElement('a');

    caret = document.createElement('span');
    slider = document.createElement('div');
    logo = document.createElement('div');
    close = document.createElement('div');
    overlay = document.createElement('div');
    hummingtreeDiv = document.createElement('div');
    adModal = document.createElement('div');

    overlay.className = 'hummingtree-overlay hummingtree-fade-and-drop'
    adModal.className = 'hummingtree-modal hummingtree-open hummingtree-fade-and-drop'
    hummingtreeDiv.id = 'hummingtree';
    close.className = 'hummingtree-close hummingtree-hairline';
    logo.className = 'hummingtree-logo';
    slider.className = 'hummingtree-slider hummingtree-closed';
    caret.className = 'hummingtree-caret-up';
    button.className = 'hummingtree-btn';
    hummingtreeDiv.style.backgroundImage = `url(${imageUrl})`;
    adTitle.textContent = `${title}`;
    adText.textContent = `${text}`;
    adLink.href = `${link}`;
    adLink.setAttribute('target', '_blank');
    humLink.href = 'http://www.hummingtree.co/'
    humLink.setAttribute('target', '_blank');
    button.textContent = 'Learn More'
    docFrag.appendChild(hummingtreeDiv);
    hummingtreeDiv.appendChild(close);
    hummingtreeDiv.appendChild(humLink);
    humLink.appendChild(logo);
    hummingtreeDiv.appendChild(slider);
    slider.appendChild(caret);
    slider.appendChild(adTitle);
    slider.appendChild(adText);
    slider.appendChild(adLink);
    adLink.appendChild(button);
    adModal.appendChild(docFrag);
    button.addEventListener('click', _conversion, false);
    caret.addEventListener('click', _toggleSlider, false);  
    close.addEventListener('click', _closeModal, false);  
    document.body.appendChild(overlay);
    document.body.appendChild(adModal);
  }

  const _toggleSlider = () => {
    if (slider.classList.contains('hummingtree-opened')) {
      slider.classList.remove('hummingtree-opened');
      logo.classList.remove('hummingtree-hidden');
      caret.classList.remove('hummingtree-caret-down');
      slider.classList.add('hummingtree-closed');
      caret.classList.add('hummingtree-caret-up');
    } else if (slider.classList.contains('hummingtree-closed')) {
      slider.classList.remove('hummingtree-closed');
      caret.classList.remove('hummingtree-caret-up');
      logo.classList.add('hummingtree-hidden');
      slider.classList.add('hummingtree-opened');
      caret.classList.add('hummingtree-caret-down');
    }
  }

  const _closeModal = () => {
    hummingtreeDiv.classList.add('hummingtree-hidden');
    overlay.classList.remove('hummingtree-overlay');
    adModal.classList.remove('hummingtree-modal')
    adModal.classList.remove('hummingtree-open')
    adModal.classList.remove('hummingtree-fade-and-drop')
    adModal.classList.remove('hummingtree-hidden');
  }

  const _conversion = () => {
    _createCORSRequest('GET', `http://hummingtree.co/api/delivery/${URL_KEY}`)
      .catch(err => console.error(err));
  }

  const getAd = () => {
    _createCORSRequest('POST', `http://www.hummingtree.co/api/delivery/${HOST_ID}`)
      .then((data) => {
        const json = JSON.parse(data);
        URL_KEY = json.urlKey;
        _createWrapper(json);
      })
      .catch(err => console.error(err));
  };

  return {
    init: init,
    getAd: getAd
  }
})();

document.addEventListener('DOMContentLoaded', () => { 
  hummingtree.getAd()
});