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

    wrapper.addEventListener('click', conversion, false);

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


