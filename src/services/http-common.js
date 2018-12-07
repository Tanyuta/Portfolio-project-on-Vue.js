import axios from 'axios';
import { Observable } from 'rxjs';

class HttpService {
  constructor() {
    this.http = axios.create({ baseURL: 'http://api.vegan.local/wp-json/wp/v2' });
  }

  makeRequest(method, url, data = null, options = null) {
    let request;
    switch (method) {
      case 'GET':
        request = this.http.get(url, options);
        break;
      case 'POST':
        request = this.http.post(url, data, options);
        break;
      case 'PUT':
        request = this.http.put(url, data, options);
        break;
      case 'PATCH':
        request = this.http.patch(url, data, options);
        break;
      case 'DELETE':
        request = this.http.delete(url, options);
        break;
      default:
        throw new Error('Method not supported');
    }

    return new Observable((subscriber) => {
      request.then((response) => {
        if (response.data.status in response.data) {
          if (response.data.status === 'error') {
            subscriber.error(new Error(response.data.error, response.data.message));
          } else subscriber.next(response.data);
        } else subscriber.next(response.data);
        subscriber.complete();
      }).catch((err) => {
        if (err.response) {
          if (err.response.data) {
            if (err.response.status) {
              subscriber.error(new Error(err.response.data.error, err.response.data.message));
            } else subscriber.error(err);
          } else subscriber.error(err);
        } else subscriber.error(err);
        subscriber.complete();
      });
    });
  }

  get(url, options = null) {
    return this.makeRequest('GET', url, null, options);
  }

  post(url, data = null, options = null) {
    return this.makeRequest('POST', url, data, options);
  }

  put(url, data = null, options = null) {
    return this.makeRequest('PUT', url, data, options);
  }

  patch(url, data = null, options = null) {
    return this.makeRequest('PATCH', url, data, options);
  }

  delete(url, options = null) {
    return this.makeRequest('DELETE', url, null, options);
  }
}

export default new HttpService();
