chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    const { permalink } = request;

    if (permalink) {
      chrome.storage.sync.get({ readingList: []}, function (result) {
        const { readingList } = result;

        if (!readingList.includes(permalink)) {
          readingList.push(permalink);
        }

        console.log(readingList);

        chrome.storage.sync.set({ readingList }, function () {
          sendResponse({ result: 'ok' });
        });
      });
    }

    return true;
});
