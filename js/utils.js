function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
        rectangle2.posotion.x &&
        rectangle1.attackBox.position.x <= rectangle2.posotion.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
        rectangle2.posotion.y &&
        rectangle1.attackBox.position.y <= rectangle2.posotion.y + rectangle2.height &&
        rectangle1.isAttacking
    );
}

function determinerWinner({ player, player2, timerID }) {
    clearTimeout(timerID)
    document.querySelector('#displayText').style.display = 'flex'

    if (player.health === player2.health) {

        document.querySelector('#displayText').innerHTML = 'Tie'
    } else if (player.health > player2.health) {
        document.querySelector('#displayText').innerHTML = 'winner Player1'
    } else if (player.health < player2.health) {
        document.querySelector('#displayText').innerHTML = 'winner Player2'
    }
}



let timer = 60

let timerID

function decreaseTimer() {
    if (timer > 0) {
        timerID = setTimeout(decreaseTimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    }

    if (timer === 0) {
        determinerWinner({ player, player2 })
    }
}