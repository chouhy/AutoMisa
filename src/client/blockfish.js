function suggest(stacker, callback) {
    let xhr = new XMLHttpRequest;
    xhr.open('POST', '/blockfish');
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            let response = JSON.parse(xhr.responseText);
            if (xhr.status !== 200) {
                let err = new Error(response.message);
                callback(null, err);
            } else {
                callback(response, null);
            }
        }
    };
    xhr.send({
        config: {
            nodeLimit: 100000,
            suggestionLimit: 1,
        },
        snapshot: {
            hold: stacker.hold,
            queue: stacker.piece.type + stacker.queue,
            matrix: stacker.matrix,
        },
    });
}

module.exports = { suggest };
