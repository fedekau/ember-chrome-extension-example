// http://ryanmorr.com/using-mutation-observers-to-watch-for-element-availability/

(function(win) {
  'use strict';

  var listeners = [],
  doc = win.document,
  MutationObserver = win.MutationObserver || win.WebKitMutationObserver,
  observer;

  function ready(selector, fn) {
      // Store the selector and callback to be monitored
      listeners.push({
          selector: selector,
          fn: fn
      });
      if (!observer) {
          // Watch for changes in the document
          observer = new MutationObserver(check);
          observer.observe(doc.documentElement, {
              childList: true,
              subtree: true
          });
      }
      // Check if the element is currently in the DOM
      check();
  }

  function check() {
      // Check the DOM for elements matching a stored selector
      for (var i = 0, len = listeners.length, listener, elements; i < len; i++) {
          listener = listeners[i];
          // Query for elements matching the specified selector
          elements = doc.querySelectorAll(listener.selector);
          for (var j = 0, jLen = elements.length, element; j < jLen; j++) {
              element = elements[j];
              // Make sure the callback isn't invoked with the
              // same element more than once
              if (!element.ready) {
                  element.ready = true;
                  // Invoke the callback with the element
                  listener.fn.call(element, element);
              }
          }
      }
  }

  // Expose `ready`
  win.ready = ready;

})(this);

function createReadingListButton(tweet) {
  const div = document.createElement('div');

  div.classList.add('ProfileTweet-action');
  div.classList.add('ProfileTweet-action--add');

  div.innerHTML = `
    <button class="ProfileTweet-actionButton u-textUserColorHover js-actionButton" type="button">
      <div class="IconContainer js-tooltip" data-original-title="Add to reading list">
        <span class="Icon Icon--medium Icon--add"></span>
        <span class="u-hiddenVisually">Add to reading list</span>
      </div>
    </button>
  `

  div.onclick = () => {
    const permalink = `https://twitter.com${tweet.dataset.permalinkPath}`;
    const text = tweet.querySelector('.tweet-text').innerText;

    chrome.runtime.sendMessage({ tweet: { permalink, text }}, (response) => {
      const icon = div.querySelector('span.Icon');

      icon.classList.remove('Icon--add');

      if (response.result === 'ok') {
        icon.classList.add('Icon--check')
      }
    });
  }

  return div;
}

ready('div.tweet', (tweet) => {
  const actions = tweet.querySelector('div.ProfileTweet-actionList');

  if (actions) {
    actions.appendChild(createReadingListButton(tweet));
  }
});
