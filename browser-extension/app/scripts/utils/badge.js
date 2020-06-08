const setAll = (text) => {
    browser.browserAction.setBadgeText({
        text: text + ''
    })
}

const set = (tabId, text) => {
    browser.browserAction.setBadgeText({
        text: text + '',
        tabId: tabId
    })
}

const reset = (tabId) => {
    set(tabId, '');
}

module.exports = {
    setAll,
    set,
    reset
}