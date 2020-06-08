const api = require('./api/index')
const utils = require('./utils/index')
const modules = require('./modules/index')

const processBadgeScore = (tab) => {
    let page = utils.url.process(tab)
    switch (page.type) {
        case 'thread':
            utils.badge.set(tab.tabId, '↻');
            api.thread(page.data).then(data => {
                modules.score.index(data.data, 'thread').then(score => {
                    utils.badge.set(tab.tabId, score);
                })
            });
            break
        case 'user':
            utils.badge.set(tab.tabId, '↻');
            api.user(page.data).then(data => {
                modules.score.index(data.data, 'user').then(score => {
                    utils.badge.set(tab.tabId, score);
                })
            })
            break
        case 'unknown':
            utils.badge.reset(tab.tabId)
            break
    }
}

const navigated = (tab) => {
    processBadgeScore(tab);
}

const background = () => {
    modules.settings.get().then(settings => {
        if (settings.engine.mechanisms.badge) {
            browser.webNavigation.onCompleted.addListener(navigated, {
                url: [{
                    hostContains: "reddit.com"
                }]
            });
        }
    })
    browser.webNavigation.onCompleted.addListener((tab) => {
        if(tab.url && tab.url.indexOf('reddit.com') !== -1){
            let page = utils.url.process(tab)
            if(page.type !== 'unknown'){
                browser.browserAction.enable(tab.tabId);
            } else {
                browser.browserAction.disable(tab.tabId);
            }
        } else {
            browser.browserAction.disable(tab.tabId);
        }
    });
    browser.tabs.onActivated.addListener((tab) => {
        chrome.tabs.query({"currentWindow": true, "active" : true}, (tabs) => {
            let tab = tabs[0];
            if(tab.url && tab.url.indexOf('reddit.com') !== -1){
                let page = utils.url.process(tab)
                if(page.type !== 'unknown'){
                    browser.browserAction.enable(tab.tabId);
                } else {
                    browser.browserAction.disable(tab.tabId);
                }
            } else {
                browser.browserAction.disable(tab.tabId);
            }
        });
    });
}

background()