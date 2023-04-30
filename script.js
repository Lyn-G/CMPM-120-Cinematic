class Cinematic extends Phaser.Scene {
    constructor() {
        super('cinematic-lynelle');
    }

    preload(){
        this.load.image('logo', 'logo.png');
        this.load.audio('my sound', 'Sound Effect.wav');
    }

    create() {

        //create image object 
        this.imageObject = this.add.image(
            400,//x
            300,//y
            'logo',//imagename
            
        )
        this.imageObject.setScale(0.7); //resize
        this.imageObject.alpha = 0;

        this.graphics = this.add.graphics();
        // add shapes
        this.graphics.fillGradientStyle(0x099773, 0x39B18D, 0x1CA17D,0x26A783, 0.8, 1, 0.3, 0.1); 

        let tri_1 = this.graphics.fillTriangle(400, 125, 225, 125, 225, 290); //x1, y1, x2, y2, x3, y3
        let tri = this.graphics.fillTriangle(575, 325, 575, 475, 425, 475); //x1, y1, x2, y2, x3, y3
        tri.alpha = 0;
        tri_1.alpha = 0;

        let sound = this.sound.add('my sound');

        this.tweens.add({
            targets: [this.imageObject, tri, tri_1],
            alpha: 1,
            duration: 2000, // the duration of the tween in milliseconds
            ease: "Linear", // the easing function to use
            delay:1000,
            onStart: function () {
                sound.play();
              },
        });

        this.tweens.add({
            targets: this.cameras.main,
            alpha: 0,
            duration: 1000,
            ease: "Linear",
            delay: 3000, // Wait 3 seconds before starting the tween
            onComplete: function () {
              // Switch to the next scene after the fade-out is complete
              this.scene.start("SecondScene");
            },
            callbackScope: this // Ensure that the callback function is called in the scope of the current scene object
          });
    }
    update(){}
}

class SecondScene extends Phaser.Scene {
    constructor(){
        super('SecondScene');
    }
    preload(){
        this.load.image('lettuce', 'lettuce.png');
    }

    create(){
        
        //create image object 
        let image = this.add.image(
            700,//x
            280,//y
            "lettuce",//imagename
        )
        image.setScale(0.5); //resize
        image.alpha = 0;

        let first_line = this.add.text(
            50, //x
            200,//y
            "A world ", //text
            {
                font: "40px Brush Script MT",
                color: "#F0FFF0",
            } //style
        );
        first_line.alpha = 0;
        let second_line = this.add.text(
            50, //x
            300,//y
            "where everything", //text
            {
                font: "40px Brush Script MT",
                color: "#F0FFF0",
            } //style
        );
        second_line.alpha = 0;
        let third_line = this.add.text(
            50, //x
            400,//y
            "is lettuce", //text
            {
                font: "40px Brush Script MT",
                color: "#F0FFF0",
            } //style
        );
        third_line.alpha = 0;

        // create the fade in
        this.tweens.add({
            targets: first_line,
            alpha: 1,
            duration: 1000, // the duration of the tween in milliseconds
            ease: "Linear", // the easing function to use
          });
          // create the fade in for second
        this.tweens.add({
            targets: second_line,
            alpha: 1,
            duration: 2000, // the duration of the tween in milliseconds
            ease: "Linear", // the easing function to use
          });
          // create the fade in for third
        this.tweens.add({
            targets: [third_line,image],
            alpha: 1,
            duration: 3000, // the duration of the tween in milliseconds
            ease: "Linear", // the easing function to use
        });

        this.tweens.add({
            targets: image,
            angle: 360,
            duration: 1500,
            ease: "Linear",
            delay: 1000
        })

        const rect = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000);
        rect.setOrigin(0, 0);
        rect.setAlpha(0);

        this.tweens.add({
            targets: rect,
            alpha: 1,
            delay: 3000,
            duration: 1000,
            ease: "Linear",
            onComplete: function () {
                // Switch to the next scene after the fade-out is complete
                this.scene.start("ThirdScene");
            },
            callbackScope: this
        });

          
    }
    update(){
        this.cameras.main.backgroundColor.setTo(51, 113, 71);
    }
}

class ThirdScene extends Phaser.Scene {
    constructor(){
        super('ThirdScene');
    }
    preload(){
        this.load.image('main', 'main menu.png');
        this.load.audio('bird', 'Background Noise.wav');
    }
    create(){
        const rect = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000);
        rect.setOrigin(0, 0);
        rect.setAlpha(1);

        this.tweens.add({
            targets: rect,
            alpha: 0,
            duration: 1000,
            ease: "Linear",
        });

        let sound = this.sound.add('bird');

        this.graphics = this.add.graphics();
        this.graphics.fillGradientStyle(0x099773, 0x39B18D, 0x1CA17D,0x26A783, 0.8, 1, 0.3, 0.1); 
        let idk = this.graphics.fillCircle(400, 100,
            200, 278,
            340, 430,
            650, 80);
        idk.setScale(0.1);
        idk.setPosition(225,125);

        let main_menu = this.add.image(550,300,"main");
        main_menu.setScale(0.35);
        let y = 100;
        
        let text = "Play\nOptions\nCredits\nSettings";
        let lines = text.split("\n");

        for (let i = 0; i < lines.length; i++){
            let line = this.add.text(30, y, lines[i], {font: "60px Brush Script MT", fill: "#ffffff"})
            line.alpha = 0;

            this.tweens.add({
                targets: line,
                alpha: 1,
                duration: 1000,
                ease: "Linear",
                delay: i *500,
            });

            y += 100;
        }

        this.tweens.add({
            targets: main_menu,
            duration: 2000, // duration of the tween in milliseconds
            scale: 0.5, // the scale of the image at the end of the tween
            alpha: 0, // the alpha value of the image at the end of the tween
            delay: 2700,
            ease: 'Linear',
            onStart: function () {
                sound.play();
            },
            onComplete: function () {
                image.destroy(); // remove the image from the scene after the tween is complete
            }
        });

       this.tweens.add({
        targets: idk,
        alpha: 0,
        duration: 500,
        ease: 'Linear',
        loop: -1,
        yoyo: false,
        delay: 700
       });
    }
    update(){
        this.cameras.main.backgroundColor.setTo(61, 139, 55);
    }
}

let config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    backgroundColor: 0x6a8455,
    scene: [Cinematic, SecondScene, ThirdScene],
}

let game = new Phaser.Game(config);