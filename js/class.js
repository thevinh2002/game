class Sprite {
    constructor({
        position,
        imageSrc,
        scale = 1,
        framesMax = 1,
        offset = { x: 0, y: 0 },
    }) {
        this.posotion = position;
        this.width = 50;
        this.height = 150;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
        this.offset = offset;
    }

    draw() {
        c.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.posotion.x - this.offset.x,
            this.posotion.y - this.offset.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
        );
    }
    ainmeteFrames() {
        this.framesElapsed++;
        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++;
            } else {
                this.framesCurrent = 0;
            }
        }
    }

    update() {
        this.draw();
        this.ainmeteFrames();
    }
}

class Fighter extends Sprite {
    constructor({
        position,
        velocity,
        color = "red",
        imageSrc,
        scale = 1,
        framesMax = 1,
        offset = { x: 0, y: 0 },
        Sprites,
        attackBox = { offset: {}, width: undefined, height: undefined },
    }) {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset,
        });
        this.velocity = velocity;
        this.width = 50;
        this.height = 150;
        this.lastkey;
        this.attackBox = {
            position: {
                x: this.posotion.x,
                y: this.posotion.y,
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height,
        };
        this.color = color;
        this.isAttacking;
        this.health = 100;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
        this.Sprites = Sprites;
        this.death = false

        for (const Sprite in this.Sprites) {
            Sprites[Sprite].image = new Image();
            Sprites[Sprite].image.src = Sprites[Sprite].imageSrc;
        }
    }

    update() {
        this.draw();
        if (!this.death) this.ainmeteFrames();

        //attack box
        this.attackBox.position.x = this.posotion.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.posotion.y + this.attackBox.offset.y;
        //draw attack box
        // c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)

        this.posotion.x += this.velocity.x;
        this.posotion.y += this.velocity.y;
        //gravity
        if (this.posotion.y + this.height + this.velocity.y >= canvas.height - 96) {
            this.velocity.y = 0;
            this.posotion.y = 330;
        } else this.velocity.y += gravity;
    }

    attack() {
        this.isAttacking = true;
        this.switchsprite("attack1");
    }
    takehit() {

        this.health -= 20;
        if (this.health <= 0) {
            this.switchsprite("death")
        } else this.switchsprite('takehit')
    }
    switchsprite(Sprite) {
        if (this.image === this.Sprites.death.image) {
            if (this.framesCurrent === this.Sprites.death.framesMax - 1)
                this.death = true
            return;
        }
        // overriding all other animations with the attack animation

        if (
            this.image === this.Sprites.attack1.image &&
            this.framesCurrent < this.Sprites.attack1.framesMax - 1
        )
            return;

        // overriding when fighter get hit
        if (
            this.image === this.Sprites.takehit.image &&
            this.framesCurrent < this.Sprites.takehit.framesMax - 1
        )
            return;

        switch (Sprite) {
            case "idle":
                if (this.image !== this.Sprites.idle.image) {
                    this.image = this.Sprites.idle.image;
                    this.framesMax = this.Sprites.idle.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case "run":
                if (this.image !== this.Sprites.run.image) {
                    this.image = this.Sprites.run.image;
                    this.framesMax = this.Sprites.run.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case "jump":
                if (this.image !== this.Sprites.jump.image) {
                    this.image = this.Sprites.jump.image;
                    this.framesMax = this.Sprites.jump.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case "fall":
                if (this.image !== this.Sprites.fall.image) {
                    this.image = this.Sprites.fall.image;
                    this.framesMax = this.Sprites.fall.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case "attack1":
                if (this.image !== this.Sprites.attack1.image) {
                    this.image = this.Sprites.attack1.image;
                    this.framesMax = this.Sprites.attack1.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case "takehit":
                if (this.image !== this.Sprites.takehit.image) {
                    this.image = this.Sprites.takehit.image;
                    this.framesMax = this.Sprites.takehit.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case "death":
                if (this.image !== this.Sprites.death.image) {
                    this.image = this.Sprites.death.image;
                    this.framesMax = this.Sprites.death.framesMax;
                    this.framesCurrent = 0;
                }
                break;
        }
    }
}