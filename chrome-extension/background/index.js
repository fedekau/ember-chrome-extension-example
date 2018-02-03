chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    const tweet = request.tweet
    const { permalink } = tweet;

    if (permalink) {
      chrome.storage.sync.get({ readingList: []}, function (result) {
        const { readingList } = result;

        if (!readingList.includes(permalink)) {
          readingList.push(tweet);
        }

        console.log(readingList);

        chrome.storage.sync.set({ readingList }, function () {
          sendResponse({ result: 'ok' });
        });
      });
    }

    return true;
});
