import Service from '@ember/service';

export default Service.extend({
  list() {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get({ readingList: [] }, function (result) {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(result.readingList);
        }
      })
    });
  },

  clear() {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.clear(() => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  }
});
