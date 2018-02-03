console.log('Listening for messages from Twitter ...');

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.addToReadingList) {
      console.log(`Message received: ${request.addToReadingList}`);

      sendResponse({ result: 'ok' });
    }
});
