const createCORSRequest = (method, url, done) => {
  return new Promise((resolve, reject) => {
    let e, header, ref, value;
    const xhr = new XMLHttpRequest();

    xhr.onload = () => {
      let res;
      console.log(xhr.responseText);
      
      try {
        res = JSON.parse(xhr.responseText);
      } catch (err) {
        handleError('Parse Error', reject, null, 'invalid JSON response');
        return;
      }

      return resolve({
        url: getResponseUrl(),
        status: xhr.status,
        statusText: xhr.statusText,
        responseText: xhr.response,
        headers: getHeaders(),
        xhr: xhr
      });
    };
    
    xhr.onerror = () => {
      return handleError('error', reject);
    };

    xhr.ontimeout = () => {
      return handleError('timeout', reject);
    };

    xhr.onabort = () => {
      return handleError('abort', reject);
    };

    if ("withCredentials" in xhr) {
      xhr.open(method, url, true);
      xhr.withCredentials = true;
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

      try {
        return xhr.send();
      } catch (err) {
        return handleError('send', reject, null, err.toString());
      }
    } else {
      xhr.open(method, url, true);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

      try {
        return xhr.send();
      } catch (err) {
        console.log(err.toString());
        return handleError('Send Error:', reject, null, err.toString());
      }
    }
  });
}

const handleError = (reason, reject, status, statusText) => {
  return reject({
    reason: reason,
    status: status,
    statusText: statusText,
    xhr: this.xhr
  });
};

const getResponseText = () => {
  // console.log('getResponseText');
  // let responseText = typeof xhr.responseText === 'string' ? xhr.responseText : '';
  // 
  // switch ((xhr.getResponseHeader('Content-Type') || '').split(';')[0]) {
  //   case 'application/json':
  //   case 'text/javascript':
  //     responseText = JSON.parse(responseText + '');
  // }
  //   console.log('restext parsed', responseText);
  // 
  //   return responseText;
  };

const getResponseUrl = () => {
  if (this._xhr.responseURL != null) {

    return this._xhr.responseURL;
  }
  
  if (/^X-Request-URL:/m.test(this._xhr.getAllResponseHeaders())) {

    return this._xhr.getResponseHeader('X-Request-URL');
  }

  return '';
};