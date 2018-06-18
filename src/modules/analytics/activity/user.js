const activity = (comments) => {
    let now = new Date()
    let createDate = new Date(0)
    createDate.setUTCSeconds(comments[comments.length - 1].created_utc)
    let timeDiff = Math.abs(now.getTime() - createDate.getTime());

    return {
        minute: comments.length / (Math.ceil(timeDiff / (1000))),
        hour: comments.length / (Math.ceil(timeDiff / (1000 * 3600))),
        day: comments.length / (Math.ceil(timeDiff / (1000 * 3600 * 24))),
        week: comments.length / (Math.ceil(timeDiff / (1000 * 3600 * 24 * 7))),
        month: comments.length / (Math.ceil(timeDiff / (1000 * 3600 * 24 * 22))),
        year: comments.length / (Math.ceil(timeDiff / (1000 * 3600 * 24 * 22 * 12)))
    }   
    
}

module.exports = activity