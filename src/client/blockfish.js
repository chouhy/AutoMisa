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
}

module.exports = { suggest };
