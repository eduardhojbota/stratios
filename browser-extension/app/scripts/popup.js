const api = require('./api/index')
const utils = require('./utils/index')
const modules = require('./modules/index')

const updateView = (data, type) => {
    modules.settings.get().then(settings => {

        modules.score.split(data, type).then(domains => {
            for(let domain in domains){
                if(settings.analytics[domain].active){
                    document.querySelector('#js-analytics-' + domain + '-score').appendChild(document.createTextNode(parseFloat(domains[domain].score || 0).toFixed(2)))
                }
            }
            if(settings.analytics.readability.active){
                document.querySelector('#js-analytics-readability-flesch').appendChild(document.createTextNode(parseFloat(data.readability.flesch).toFixed(2)))
                document.querySelector('#js-analytics-readability-fleschKincaid').appendChild(document.createTextNode(parseFloat(data.readability.fleschKincaid).toFixed(2)))
                document.querySelector('#js-analytics-readability-gunningFog').appendChild(document.createTextNode(parseFloat(data.readability.gunningFog).toFixed(2)))
                document.querySelector('#js-analytics-readability-colemanLiau').appendChild(document.createTextNode(parseFloat(data.readability.colemanLiau).toFixed(2)))
                document.querySelector('#js-analytics-readability-smog').appendChild(document.createTextNode(parseFloat(data.readability.smog).toFixed(2)))
                document.querySelector('#js-analytics-readability-automated').appendChild(document.createTextNode(parseFloat(data.readability.automated).toFixed(2)))
                document.querySelector('#js-analytics-readability-daleChall').appendChild(document.createTextNode(parseFloat(data.readability.daleChall).toFixed(2)))
                document.querySelector('#js-analytics-readability-spache').appendChild(document.createTextNode(parseFloat(data.readability.spache).toFixed(2)))
                let numberOfDomains = 0;
                let score = 0;
                ['flesch','fleschKincaid', 'gunningFog', 'colemanLiau', 'smog', 'automated', 'daleChall', 'spache'].forEach(domain => {
                    if(settings.analytics.readability[domain]){
                        numberOfDomains++;
                        score += data.readability[domain]
                    }
                })
                document.querySelector('#js-analytics-readability-score-average').appendChild(document.createTextNode(parseFloat(score/numberOfDomains).toFixed(2)))
            } else {
                document.querySelector('#js-analytics-readability').style.display = "none" 
            }
    
    
            if(settings.analytics.sentiment.active){
                if (data.sentiment.score === 0) {
                    document.querySelector('#js-analytics-sentiment-score-interpretation').appendChild(document.createTextNode('Negative'))
                } else if (data.sentiment.score === 100) {
                    document.querySelector('#js-analytics-sentiment-score-interpretation').appendChild(document.createTextNode('Positive'))
                } else {
                    document.querySelector('#js-analytics-sentiment-score-interpretation').appendChild(document.createTextNode('Neutral'))
                }
                document.querySelector('#js-analytics-sentiment-positive').appendChild(document.createTextNode(Object.keys(data.sentiment.words.positive).join(', ')))
                document.querySelector('#js-analytics-sentiment-negative').appendChild(document.createTextNode(Object.keys(data.sentiment.words.negative).join(', ')))
            } else {
                document.querySelector('#js-analytics-sentiment').style.display = "none" 
            }
    
            if(settings.analytics.activity.active){ 
                document.querySelector('#js-analytics-activity-year').appendChild(document.createTextNode(parseFloat(data.activity.year).toFixed(2)))
                document.querySelector('#js-analytics-activity-month').appendChild(document.createTextNode(parseFloat(data.activity.month).toFixed(2)))
                document.querySelector('#js-analytics-activity-week').appendChild(document.createTextNode(parseFloat(data.activity.week).toFixed(2)))
                document.querySelector('#js-analytics-activity-day').appendChild(document.createTextNode(parseFloat(data.activity.day).toFixed(2)))
                document.querySelector('#js-analytics-activity-hour').appendChild(document.createTextNode(parseFloat(data.activity.hour).toFixed(2)))
                document.querySelector('#js-analytics-activity-minute').appendChild(document.createTextNode(parseFloat(data.activity.minute).toFixed(2)))
            } else {
                document.querySelector('#js-analytics-activity').style.display = "none" 
            }
            
            document.querySelector('#js-analytics').style.display = "block" 
        })




    })
}

const processPopupScore = (tab) => {
    let page = utils.url.process(tab)
    page.data.level = 1
    switch (page.type) {
        case 'thread':
            api.thread(page.data).then(data => {
                updateView(data.data, 'thread')
            })
            break
        case 'user':
            api.user(page.data).then(data => {
                updateView(data.data, 'user')
            })
            break
    }
}

const updatePopupState = (tabs) => {
    let url = new URL(tabs[0].url)
    if (url.hostname.match(/reddit\.com/g)) {
        processPopupScore(tabs[0])
    } else {
        document.querySelector('#js-analytics').style.display = "none"
    }
}

const popup = () => {
    modules.settings.get().then(settings => {
        if (settings.engine.mechanisms.popup) {
            if (chrome) {
                chrome.tabs.query({
                    currentWindow: true,
                    active: true
                }, updatePopupState)
            } else {
                browser.tabs.query({
                    currentWindow: true,
                    active: true
                }, updatePopupState)
            }
        }
    })
}

popup()