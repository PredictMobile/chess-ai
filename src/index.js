const {Chess} = require('chess.js')

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let ai = require('./ai')

const play = () => {
    let round = 1
    while (Object.keys(ai).length > 1) {
        console.log(`Starting round ${round}`)
    const scores = Object.keys(ai).reduce((scores, player) => {
        scores[player] = {won: 0, lost:0, draw: 0, moves: 0}
        return scores
    }, {})
        round++
    let matches = 0
    for (let i = 1; i <= round; i++) {
        const order = Object.keys(ai)
        shuffleArray(order)
        for (const white of order) {
            for (const black of order) {
                if (black === white) {
                    continue;
                }
                matches++
                console.log(`Starting match ${matches}, ${white} vs ${black}`)
                const chess = new Chess()
                while (!chess.game_over()) {
                    const player = chess.turn() === 'w' ? white : black
                    const fen = chess.fen()
                    const move = ai[player](fen)
                    chess.move(move)
                    console.log(chess.ascii())
                    scores[player].moves++
                }
                if (chess.in_checkmate()) {
                    console.log(`${chess.turn() !== 'w' ? white : black} Won`)
                    scores[chess.turn() === 'w' ? white : black].lost += 1 // Lost
                    scores[chess.turn() !== 'w' ? white : black].won += 1 // Won
                } else {
                    console.log("Was a draw")
                    scores[white].draw += 1
                    scores[black].draw += 1
                }
            }
        }
    }
    console.log(scores)
    ai = Object.keys(scores).filter((key) => (scores[key].won - scores[key].lost) >= 0).reduce((rai, fn) => { rai[fn] = ai[fn]; return rai}, {})
}
return Object.keys(ai).pop()
}

const s = play()

console.log(`${s} is the Winner!!`)