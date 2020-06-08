const modules = require('./modules/index')

const updateView = settings => {
    document.querySelector('#js-engine-mechanisms-badge').checked = settings.engine.mechanisms.badge
    document.querySelector('#js-engine-mechanisms-popup').checked = settings.engine.mechanisms.popup
    document.querySelector('#js-analytics-readability').checked = settings.analytics.readability.active
    document.querySelector('#js-analytics-readability-flesch').checked = settings.analytics.readability.flesch
    document.querySelector('#js-analytics-readability-fleschKincaid').checked = settings.analytics.readability.fleschKincaid
    document.querySelector('#js-analytics-readability-gunningFog').checked = settings.analytics.readability.gunningFog
    document.querySelector('#js-analytics-readability-colemanLiau').checked = settings.analytics.readability.colemanLiau
    document.querySelector('#js-analytics-readability-smog').checked = settings.analytics.readability.smog
    document.querySelector('#js-analytics-readability-automated').checked = settings.analytics.readability.automated
    document.querySelector('#js-analytics-readability-daleChall').checked = settings.analytics.readability.daleChall
    document.querySelector('#js-analytics-readability-spache').checked = settings.analytics.readability.spache
    document.querySelector('#js-analytics-readability-grade').value = settings.analytics.readability.grade
    document.querySelector('#js-analytics-readability-range').value = settings.analytics.readability.range
    document.querySelector('#js-analytics-sentiment').checked = settings.analytics.sentiment.active
    document.querySelector('#js-analytics-sentiment-threshold').value = settings.analytics.sentiment.threshold
    document.querySelector('#js-analytics-activity').checked = settings.analytics.activity.active
    document.querySelector('#js-analytics-activity-user').value = settings.analytics.activity.user
    document.querySelector('#js-analytics-activity-thread').value = settings.analytics.activity.thread
}

const save = e => {
    e.preventDefault()

    modules.settings.set({
        engine: {
            mechanisms: {
                badge: document.querySelector('#js-engine-mechanisms-badge').checked,
                popup: document.querySelector('#js-engine-mechanisms-popup').checked
            }
        },
        analytics: {
            readability: {
                active: document.querySelector('#js-analytics-readability').checked,
                flesch: document.querySelector('#js-analytics-readability-flesch').checked,
                fleschKincaid: document.querySelector('#js-analytics-readability-fleschKincaid').checked,
                gunningFog: document.querySelector('#js-analytics-readability-gunningFog').checked,
                colemanLiau: document.querySelector('#js-analytics-readability-colemanLiau').checked,
                smog: document.querySelector('#js-analytics-readability-smog').checked,
                automated: document.querySelector('#js-analytics-readability-automated').checked,
                daleChall: document.querySelector('#js-analytics-readability-daleChall').checked,
                spache: document.querySelector('#js-analytics-readability-spache').checked,
                grade: document.querySelector('#js-analytics-readability-grade').value,
                range: document.querySelector('#js-analytics-readability-range').value,
            },
            sentiment: {
                active: document.querySelector('#js-analytics-sentiment').checked,
                threshold: document.querySelector('#js-analytics-sentiment-threshold').value
            },
            activity: {
                active: document.querySelector('#js-analytics-activity').checked,
                user: document.querySelector('#js-analytics-activity-user').value,
                thread: document.querySelector('#js-analytics-activity-thread').value
            }
        }
    }).then(() => {
        alert('Settings saved')
    }).then(() => browser.runtime.reload())
}

const reset = e => {
    e.preventDefault()
    modules.settings.reset().then(restore).then(() => {
        alert('Settings restored to defaults')
    }).then(() => browser.runtime.reload())
}

const restore = () => {
    modules.settings.get().then(updateView)
}

const options = () => {
    document.addEventListener('DOMContentLoaded', restore)
    document.querySelector('form').addEventListener('submit', save)
    document.querySelector('#js-button-reset').addEventListener('click', reset)
}

options()