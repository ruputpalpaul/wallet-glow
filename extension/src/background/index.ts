
// Background script to handle opening the dashboard
chrome.runtime.onMessage.addListener((request, sender) => {
    if (request.action === "open_dashboard") {
        const dashboardUrl = chrome.runtime.getURL("index.html#dashboard");
        chrome.tabs.create({ url: dashboardUrl });
    }
    if (request.action === "close_tab" && sender.tab && sender.tab.id) {
        chrome.tabs.remove(sender.tab.id);
    }
});
