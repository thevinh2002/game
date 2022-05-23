const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: "./img/background.png"
})
const shop = new Sprite({
    position: {
        x: 600,
        y: 128
    },
    imageSrc: "./img/shop.png",
    scale: 2.75,
    framesMax: 6
})


const player = new Fighter({
    position: {
        x: 0,
        y: 0,
    },
    velocity: {
        x: 0,
        y: 10,
    },
    offset: {
        x: 0,
        y: 0,
    },
    imageSrc: "./img/samuraiMack/Idle.png",
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y: 160 - 3
    },
    Sprites: {
        idle: {
            imageSrc: "./img/samuraiMack/Idle.png",
            framesMax: 8
        },
        run: {
            imageSrc: "./img/samuraiMack/Run.png",
            framesMax: 8
        },
        jump: {
            imageSrc: "./img/samuraiMack/Jump.png",
            framesMax: 2
        },
        fall: {
            imageSrc: "./img/samuraiMack/Fall.png",
            framesMax: 2
        },
        attack1: {
            imageSrc: "./img/samuraiMack/Attack1.png",
            framesMax: 6
        },
        takehit: {
            imageSrc: "./img/samuraiMack/Take Hit - white silhouette.png",
            framesMax: 4
        },
        death: {
            imageSrc: "./img/samuraiMack/Death.png",
            framesMax: 6
        },


    },
    attackBox: {
        offset: {
            x: 100,
            y: 50
        },
        width: 150,
        height: 50
    }

});

const player2 = new Fighter({
    position: {
        x: 400,
        y: 100,
    },
    velocity: {
        x: 0,
        y: 0,
    },
    color: "blue",
    offset: {
        x: -50,
        y: 0,
    },
    imageSrc: "./img/kenji/Idle.png",
    framesMax: 4,
    scale: 2.5,
    offset: {
        x: 215,
        y: 167
    },
    Sprites: {
        idle: {
            imageSrc: "./img/kenji/Idle.png",
            framesMax: 4
        },
        run: {
            imageSrc: "./img/kenji/Run.png",
            framesMax: 8
        },
        jump: {
            imageSrc: "./img/kenji/Jump.png",
            framesMax: 2
        },
        fall: {
            imageSrc: "./img/kenji/Fall.png",
            framesMax: 2
        },
        attack1: {
            imageSrc: "./img/kenji/Attack1.png",
            framesMax: 4
        },
        takehit: {
            imageSrc: "./img/kenji/Take Hit.png",
            framesMax: 3
        },
        death: {
            imageSrc: "./img/kenji/Death.png",
            framesMax: 7
        },
    },
    attackBox: {
        offset: {
            x: -150,
            y: 50
        },
        width: 150,
        height: 50
    }
});

console.log(player);

const keys = {
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
    w: {
        pressed: false,
    },
    ArrowRight: {
        pressed: false,
    },
    ArrowLeft: {
        pressed: false,
    },
    ArrowUp: {
        pressed: false,
    },
};



decreaseTimer()


function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    c.fillStyle = 'rgba(255,255,255,0.15)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    player2.update()
    player.velocity.x = 0
    player2.velocity.x = 0

    //play1 move

    if (keys.a.pressed && player.lastkey === "a") {
        player.velocity.x = -6
        player.switchsprite('run')
    } else if (keys.d.pressed && player.lastkey === "d") {
        player.velocity.x = 6
        player.switchsprite('run')
    } else {
        player.switchsprite('idle')
    }
    //jump
    if (player.velocity.y < 0) {
        player.switchsprite('jump')
    } else if (player.velocity.y > 0) {
        player.switchsprite('fall')
    }


    //play2 move
    if (keys.ArrowLeft.pressed && player2.lastkey === "ArrowLeft") {
        player2.velocity.x = -5
        player2.switchsprite('run')

    } else if (keys.ArrowRight.pressed && player2.lastkey === "ArrowRight") {
        player2.velocity.x = 5
        player2.switchsprite('run')

    } else {
        player2.switchsprite('idle')
    }
    //jump
    if (player2.velocity.y < 0) {
        player2.switchsprite('jump')
    } else if (player2.velocity.y > 0) {
        player2.switchsprite('fall')
    }

    //detect for collission
    if (
        rectangularCollision({
            rectangle1: player,
            rectangle2: player2
        }) &&
        player.isAttacking && player.framesCurrent === 4
    ) {
        player2.takehit()
        player.isAttacking = false

        gsap.to('#player2health', {
            width: player2.health + '%'
        })
    }
    //player miss
    if (player.isAttacking && player.framesCurrent === 4) {
        player.isAttacking = false

    }



    if (
        rectangularCollision({
            rectangle1: player2,
            rectangle2: player
        }) &&
        player2.isAttacking && player2.framesCurrent === 2
    ) {
        player.takehit()
        player2.isAttacking = false;

        gsap.to('#playerhealth', {
            width: player.health + '%'
        })
    }
    if (player2.isAttacking && player2.framesCurrent === 2) {
        player2.isAttacking = false

    }


    //end the game
    if (player2.health <= 0 || player.health <= 0) {
        determinerWinner({ player, player2, timerID })
    }

}
animate();

window.addEventListener("keydown", (event) => {
        if (!player.death) {

            switch (event.key) {
                case "d":
                    keys.d.pressed = true
                    player.lastkey = "d"
                    break;
                case "a":
                    keys.a.pressed = true
                    player.lastkey = "a"
                    break;
                case "w":
                    player.velocity.y = -20
                    break;
                case "s":
                    player.attack()
                    break;

            }
        }
        if (!player2.death) {
            switch (event.key) {

                case "ArrowRight":
                    keys.ArrowRight.pressed = true
                    player2.lastkey = "ArrowRight"
                    break;
                case "ArrowLeft":
                    keys.ArrowLeft.pressed = true
                    player2.lastkey = "ArrowLeft"
                    break;
                case "ArrowUp":
                    player2.velocity.y = -20;
                    break;
                case "ArrowDown":
                    player2.attack()
                    break;
            }
        }

    }),

    window.addEventListener("keyup", (event) => {
        // player keys
        switch (event.key) {
            case "d":
                keys.d.pressed = false

                break;
            case "a":
                keys.a.pressed = false
                break;
        }
        // player2 keys
        switch (event.key) {
            case "ArrowRight":
                keys.ArrowRight.pressed = false

                break;
            case "ArrowLeft":
                keys.ArrowLeft.pressed = false
                break;
        }

    })