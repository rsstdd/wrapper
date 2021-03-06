const hummingtree = (() => {

  let config = {};
  let URL_KEY = '';
  
 const init = ({
    height = '500px',
    width = '400px',
    hostId = ''
  }) => {
    config.HEIGHT = height;
    config.WIDTH = width;
    config.HOST_ID = hostId;
  };

  createCORSRequest = (method, url) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.onload = () => { xhr.status == 200 ? resolve(xhr.response) : reject(Error(xhr.statusText))};
      xhr.onerror = () => { reject(Error("Network Error"))};
      xhr.send();
    });
  }

  const conversion = () => {
    createCORSRequest('GET', `http://hummingtree.co/api/delivery/${URL_KEY}`)
      .catch((err) => {
        console.error(err);
      });
  }

  const createWrapper = (data) => {
    const { text, link, title, imageUrl } = data;

    const style = document.createElement('style');
    style.type = 'text/css'
    document.head.appendChild(style);
    sheet = style.sheet;
    console.log(style);
    console.log(sheet);

    const hummingtree = document.getElementById('hummingtree');
    const wrapper = document.createElement('div');
    const adTitle = document.createElement('h2');
    const adText = document.createElement('p');
    const aTag = document.createElement('a');

    sheet.addRule('.hum-wrapper::before', 'content: ');
    sheet.addRule('.hum-wrapper::before', 'display: block');
    sheet.addRule('.hum-wrapper::before', 'content: absolute');
    sheet.addRule('.hum-wrapper::before', 'top: 0');
    sheet.addRule('.hum-wrapper::before', 'left: 0');
    sheet.addRule('.hum-wrapper::before', 'right: 0');
    sheet.addRule('.hum-wrapper::before', 'bottom: 0');
    sheet.addRule('.hum-wrapper::before', 'background: #000');
    sheet.addRule('.hum-wrapper::before', 'opacity: 0.35');
    sheet.addRule('.hum-wrapper::before', 'z-index: 1');

    sheet.insertRule('.hum-wrapper::before { content:  }', 0);
    sheet.insertRule('.hum-wrapper::before { display: block }', 0);
    sheet.insertRule('.hum-wrapper::before { content: absolute }', 0);
    sheet.insertRule('.hum-wrapper::before { top: 0 }', 0);
    sheet.insertRule('.hum-wrapper::before { left: 0 }', 0);
    sheet.insertRule('.hum-wrapper::before { right: 0 }', 0);
    sheet.insertRule('.hum-wrapper::before { botto  m: 0 }', 0);
    sheet.insertRule('.hum-wrapper::before { background: #000 }', 0);
    sheet.insertRule('.hum-wrapper::before { opacity: 0.55 }', 0);
    sheet.insertRule('.hum-wrapper::before { z-index: 1 }', 0);

    hummingtree.style.display = 'inline-block';
    hummingtree.style.verticalAlign = 'top';
    hummingtree.style.position = 'fixed';
    hummingtree.style.justifyContent = 'left';
    hummingtree.style.color = 'black';
    hummingtree.style.fontFamily = 'Lato';
    hummingtree.style.cursor = 'pointer';

    wrapper.class = 'hum-wrapper';
    wrapper.style.height = `${config.HEIGHT}`;
    wrapper.style.width = `${config.WIDTH}`;
    wrapper.style.padding = '10px';
    wrapper.style.backgroundColor = '#000';
    wrapper.style.color = 'white';
    wrapper.style.backgroundImage = `url(${imageUrl})`;
    wrapper.style.backgroundRepeat = 'no-repeat';
    wrapper.style.backgroundPosition = 'center';
    wrapper.style.backgroundSize = 'cover';
    wrapper.style.overflow = 'hidden';

    adTitle.textContent = `${title}`;
    adTitle.style.width = '80%';
    adTitle.style.paddingTop = '10%';
    adTitle.style.display = 'block';
    adTitle.style.position = 'absolute';
    adTitle.style = '8% 15%';
    adTitle.style.left = '0';
    adTitle.style.color = '#fff';
    adTitle.style.fontSize = '2em';
    adTitle.style.lineHeight = '70px';
    adTitle.style.textAlign = 'left';
    adTitle.style.margin = '0';
    adTitle.style.zIndex = '9';

    adText.textContent = `${text}`;
    adText.style.width = '75%';
    adText.style.paddingLeft.width = '10%';
    adText.style.position.width = 'absolute';
    adText.style.top.width = '30%';
    adText.style.left.width = '0';
    adText.style.color.width = '#fff';
    adText.style.textDecoration.width = 'none';

    aTag.style.textDecoration = 'none';

    wrapper.addEventListener('click', conversion, false);

    document.body.appendChild(wrapper);
    wrapper.appendChild(adTitle);
    wrapper.appendChild(aTag);
    aTag.appendChild(adText);
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

  return {
    init: init,
    getAd: getAd
  }
})();