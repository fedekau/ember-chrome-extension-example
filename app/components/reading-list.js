import Component from '@ember/component';

export default Component.extend({
  actions: {
    openPermalink(permalink) {
      chrome.tabs.create({ url: permalink });
    }
  }
});
