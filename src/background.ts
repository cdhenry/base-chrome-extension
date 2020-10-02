chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === "complete" && tab?.url?.includes("http")) {
        console.log(tab.url);
        chrome.tabs.executeScript(tabId, { file: "./inject-script.ts" }, function () {
            chrome.tabs.executeScript(tabId, { file: "./foreground.bundle.js" }, function () {
                console.log("INJECTED AND EXECUTED");
            });
        });
    }
});
