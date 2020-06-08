const defaultSettings = {
    settings: {
        engine: {
            mechanisms: {
                badge: true,
                popup: true
            }
        },
        analytics: {
            readability: {
                active: true,
                flesch: true,
                fleschKincaid: true,
                gunningFog: true,
                colemanLiau: true,
                smog: true,
                automated: true,
                daleChall: true,
                spache: true,
                grade: 8,
                range: 8
            },
            sentiment: {
                active: true,
                threshold: 0.5
            },
            activity: {
                active: true,
                user: 'hour',
                thread: 'minute'
            }
        }
    }
}

const get = () => {
    return browser.storage.local.get('settings').then(result => {
        if (result && result.settings) {
            return result.settings
        } else {
            set(defaultSettings)
            return defaultSettings.settings
        }
    })
}

const set = (settings) => browser.storage.local.set({
    settings: settings
})

const reset = () => browser.storage.local.set(defaultSettings)

module.exports = {
    get,
    set,
    reset
}