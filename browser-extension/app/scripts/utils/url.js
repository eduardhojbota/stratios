const process = (tab) => {
    let url = new URL(tab.url);
    let params = url.pathname.split('/');
    params.shift();
    switch (params[0]) {
        case 'r':
            if (params[2] === 'comments' ) {
                return {
                    type: 'thread',
                    data: {
                        threadId: params[3]
                    }
                }
            } else {
                return {
                    type: 'unknown'
                }
            }
            break;
        case 'user':
            return {
                type: 'user',
                data: {
                    username: params[1],
                }
            }
        default:
            return {
                type: 'unknown'
            }
    }
}


module.exports = {
    process
}