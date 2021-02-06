function suggest(stacker, callback) {
    let request = {
        config: {
            nodeLimit: 20000,
            suggestionLimit: 1,
        },
        snapshot: {
            hold: stacker.hold,
            queue: stacker.piece.type + stacker.queue,
            matrix: stacker.matrix,
        },
    };
    let xhr = new XMLHttpRequest;
    xhr.open('POST', '/blockfish');
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            let response;
            try {
                response = JSON.parse(xhr.responseText);
            } catch(e) {
                console.log(xhr.responseText);
                console.error(e);
                return;
            }
            if (xhr.status !== 200) {
                let err = new Error(response.message);
                callback(null, err);
            } else {
                callback(response, null);
            }
        }
    };
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(request));
}

module.exports = { suggest };
