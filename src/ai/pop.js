const {Chess} = require('chess.js')

module.exports = (fen) => {
    const chess = new Chess(fen)
    const moves = chess.moves()
    return moves.pop()
}