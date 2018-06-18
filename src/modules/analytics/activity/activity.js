const activity = (createDateUTCSeconds, commentsCount) => {
    let now = new Date()
    let createDate = new Date(0)
    createDate.setUTCSeconds(createDateUTCSeconds)
    let timeDiff = now.getTime() - createDate.getTime();

    return {
        minute: commentsCount / (Math.ceil(timeDiff / (1000 * 60))), 
        hour: commentsCount / (Math.ceil(timeDiff / (1000 * 60 * 60))), 
        day: commentsCount / (Math.ceil(timeDiff / (1000 * 60 * 60 * 24))), 
        week: commentsCount / (Math.ceil(timeDiff / (1000 * 3600 * 24 * 7))), 
        month: commentsCount / (Math.ceil(timeDiff / (1000 * 3600 * 24 * 7 * 4.3))), 
        year: commentsCount / (Math.ceil(timeDiff / (1000 * 3600 * 24 * 7 * 4.3 * 12))) 
    }
    
}

module.exports = activity