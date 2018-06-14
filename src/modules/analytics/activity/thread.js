const activity = (thread) => {
    let now = new Date()
    let createDate = new Date(0)
    createDate.setUTCSeconds(thread.created_utc)
    let timeDiff = Math.abs(now.getTime() - createDate.getTime());

    return {
        minute: thread.num_comments / (Math.ceil(timeDiff / (1000))),
        hour: thread.num_comments / (Math.ceil(timeDiff / (1000 * 3600))),
        day: thread.num_comments / (Math.ceil(timeDiff / (1000 * 3600 * 24))),
        week: thread.num_comments / (Math.ceil(timeDiff / (1000 * 3600 * 24 * 7))),
        month: thread.num_comments / (Math.ceil(timeDiff / (1000 * 3600 * 24 * 22))),
        year: thread.num_comments / (Math.ceil(timeDiff / (1000 * 3600 * 24 * 22 * 12)))
    }   
    
}

module.exports = activity