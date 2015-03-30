window.onload = function()
{
    var game = new Phaser.Game(1900, 950, Phaser.AUTO, '', { preload: preload, create: create, update: update });
    var fond = false;
    var vaisseau = false;
    /*var vaiss = false;*/
    var cursors = false;
    var laser;
    var lasers;
    var laserTime = 0;
/*    var lasvai;
    var lasvais;
    var lasvaisTime = 0;*/
    var astes;
    /*var snd;*/

    function preload()
    {
        game.load.image('fond', 'img/fond.png');
        game.load.image('vaisseau', 'img/vaisseau.png');
        game.load.image('laser', 'img/bullet.png');
       /* game.load.image('lasvai', 'img/laservai2.png');*/
        game.load.spritesheet('astes', 'img/Asteroid.png');
        /*game.load.image('vaiss', 'img/vaisseau2.png');*/
        /*game.load. ('snd', 'sounds/sdl.mp3');*/
    }

    function create()
    {
        fond = game.add.tileSprite(0, 0, 2000, 2000, 'fond');
        vaisseau = game.add.sprite(0, 0, 'vaisseau');
        vaisseau.anchor.setTo(0.1, 0.1);
        /*vaiss = game.add.sprite(0, 0, 'vaiss');
        vaiss.anchor.setTo(0.2, 0.2);*/

        game.physics.enable(vaisseau, Phaser.Physics.ARCADE);
        /*game.physics.enable(vaiss, Phaser.Physics.ARCADE);*/

        game.world.setBounds(0, 0, 2000, 2000);

        game.camera.follow(vaisseau);
        /*game.camera.follow(vaiss);*/

        cursors = game.input.keyboard.createCursorKeys();
        game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN,
            Phaser.Keyboard.SPACEBAR
            ]);

        astes = game.add.group();
        astes.enableBody = true;
        astes.physicsBodyType = Phaser.Physics.ARCADE;

        for(var i = 0; i < 30; i++)
        {
            var c = astes.create(game.world.randomX, game.world.randomY, 'astes', game.rnd.integerInRange(0, 36));
            c.name = 'ast' + i;
            c.body.immovable = true;
        }

        lasers = game.add.group();
        lasers.enableBody = true;
        lasers.physicsBodyType = Phaser.Physics.ARCADE;
        
        for(var i = 0; i < 25; i++)
        {
            var b = lasers.create(0, 0, 'laser');
            b.name = 'laser' + i;
            b.exists = false;
            b.visible = false;
            b.checkWorldBounds = true;
            b.events.onOutOfBounds.add(resetLaser, this);
        }

        /*for(var i = 0; i < 25; i++)
        {
            var b = lasvais.create(0, 0, 'lasvai');
            b.name = 'lasvai' + i;
            b.exists = false;
            b.visible = false;
            b.checkWorldBounds = true;
            b.events.onOutOfBounds.add(resetLasvai, this);
        }*/
        vaisseau.body.collideWorldBounds = true;
    }

    function update()
    {
        game.physics.arcade.overlap(lasers, astes, collisionHandler, null, this);
        if(cursors.up.isDown)
        {
            vaisseau.body.velocity.y = -300;
        }
        else if(cursors.down.isDown)
        {
            vaisseau.body.velocity.y = 300;
        }
        else
        {
            vaisseau.body.velocity.y=0;
        }
        if(cursors.left.isDown)
        {
            vaisseau.body.velocity.x = -300;
        }
        else if(cursors.right.isDown)
        {
            vaisseau.body.velocity.x = 300;
        }
        else
        {
            vaisseau.body.velocity.x=0;
        }
        if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
        {
            fireLaser();
        }
        game.physics.arcade.overlap(vaisseau, astes, astesCollide, null, this);

        /*game.physics.arcade.overlap(lasvais, astes, collisionHandler, null, this);
        if(cursors.up.isDown)
        {
            vaiss.body.velocity.y = -300;
        }
        else if(cursors.down.isDown)
        {
            vaiss.body.velocity.y = 300;
        }
        else
        {
            vaiss.body.velocity.y=0;
        }
        if(cursors.left.isDown)
        {
            vaiss.body.velocity.x = -300;
        }
        else if(cursors.right.isDown)
        {
            vaiss.body.velocity.x = 300;
        }
        else
        {
            vaiss.body.velocity.x=0;
        }
        if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
        {
            fireLaser();
        }
        game.physics.arcade.overlap(vaiss, astes, astesCollide, null, this);*/
    }

    function fireLaser()
    {
        if(game.time.now > laserTime)
        {
            laser = lasers.getFirstExists(false);
            if(laser)
            {
                laser.reset(vaisseau.x + 6, vaisseau.y - 8);
                laser.body.velocity.y = -300;
                laserTime = game.time.now + 150;
                game.physics.arcade.velocityFromRotation(vaisseau.rotation, 400, laser.body.velocity);
            }
        }

        /*if(game.time.now > lasvaiTime)
        {
            lasvai = lasvais.getFirstExists(false);
            if(lasvai)
            {
                lasvai.reset(vaiss.x + 6, vaiss.y - 8);
                lasvai.body.velocity.y = -300;
                lasvaiTime = game.time.now + 150;
                game.physics.arcade.velocityFromRotation(vaiss.rotation, 400, lasvai.body.velocity);
            }
        }*/
    }

    function astesCollide(obj)
    {
        obj.kill();
    }

    function resetLaser(laser)
    {
        laser.kill();
    }
    
    function collisionHandler(laser, ast)
    {
        laser.kill();
        ast.kill();
    }

    /*function resetLasvai(lasvai)
    {
        lasvai.kill();
    }
    
    function collisionHandler(lasvai, ast)
    {
        lasvai.kill();
        ast.kill();
    }
*/
    function render()
    {
        game.debug.cameraInfo(game.camera, 32, 32);
        game.debug.spriteCoords(vaisseau, 32, 500);
        /*game.debug.spriteCoords(vaiss, 32, 500);*/
    }
}