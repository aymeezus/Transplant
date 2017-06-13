//Global Variables

// ----------- GROUPS ------------------------------
var backgroundGroup; // background
var doorGroup; //group to distinguish what will be a door/elevator
var backLayer; //right in front of background
var obstacleHideGroup; //Obstacle group for objects that youv can hide behind
var obstacleGroup;	//Obstacle group for obejcts with full hit box
var obstacleClimbGroup; //Obstacle group for objects that player can climb and only top hitbox
var obstaclePushGroup; //Obstacle group for objects that player can push
var obstacleEnemyPushGroup; // Obstacles that only enemies can push
var noteGroup; //group for notes
var enemyGroup; //group for enemies
var keyCardGroup; // group for keyCards
var normalLayer; //top layer
var topLayer; //Layer above everything to do lighting
var platform; //ground layer when standing up
var platform2; //ground layer when crouching over
// ----------- Player Variables ---------------------
var foreground = true; //variable to keep track of which layer player will be in with a short variable name
var isClimbing = false; //variable to check if player is climbing or not
var canControl = true; //variable to check if player has control of normal left and right movement at the moment
var player; //the player
var hitPlatform; //did player hit the ground or an obstacleGroup?
var climb; //Is the player in front of a climbable object?
var hide; //is the player overlapping with a hidable object?
var distanceFromGround; //player's y-distance from the ground
var playerGravity = 800; //Gravity on the player's y-axis
var playerDirection = 1; //Which direction is the player facing? 1 is right
var hidePlatform; //hit detection on ground when player is hiding
var playerSpawnX = 120; // where to spawn the player when a level is generated
var pushOverlap; //check if player is overlapping with pushable objects
var inventory = ['none']; // an array of strings that holds the names of keys collected thus far
var canMove = true; //Checks if player can move at this time
var isJumping = false; //is the player jumping right now?
var isColliding = false; //is the player colliding with the obstacles from the hide, climb, and normal obstacle groups
// 'none' allows players to open doors that are no locked
// ----------- Other Variables ---------------------
var door1; //door in the starting room
var ground; //the ground player stands on
var ground2; //the ground player will stand on when hiding
var levelData; //json file being used
var creepyDoor;
var doorWasOpened = false;
var fadeMade = false;
// ----------- Camera Variables ---------------------
var playerCamera = false; //has the camera been reset on the player?
//Has the player seen this level before?
var seenLevel1 = false;
var seenLevel2 = false;
var seenLevel3 = false;
var seenLevel4 = false;
var seenLevel5 = false;

// elevator panel that must be created global for proper destruction afterwards
var elevatorBackground; var elevatorText; var button0; var button1; var button2; var button3; var button4; var button5; var button6; var button7; var button8; var button9; var buttonEnter;
var invFloor1; var invFloor2; var invFloor3; var invEntrance; var invBack; var inv105; var inv203; var inv303; var invMorgue; var inv201; var inv205;
var inventoryOpen = false; // var to help with killing of inventory sprites
var elevatorOpen = false;
var elevatorString = ''; // needs to be global for button keyboard integration

var playState = {
	create: function() {
		console.log('Play: create');
		
		//begin hospital music
		music = game.add.audio('hospitalMusic');
		music.loopFull(0.8);
		//initializes sound effects
		playerFootsteps = game.add.audio('indoorFootsteps');
		doorSound = game.add.audio('doorOpenClose');
		doorLockedSound = game.add.audio('doorLocked');
		buttonPressSound = game.add.audio('buttonPress');
		boxSlidingSound = game.add.audio('boxSliding');
		pageTurnSound = game.add.audio('pageTurn');
		itemGrabSound = game.add.audio('itemGrab');

		//Layers from Back to Front
		backgroundGroup = game.add.group();// background
		doorGroup = game.add.group(); //Doors/elevator
		backLayer = game.add.group();//layer above background
		obstacleHideGroup = game.add.group(); //hidable objects
		obstacleGroup = game.add.group(); // obstacles
		obstacleClimbGroup = game.add.group(); //climbable obstacles
		obstaclePushGroup = game.add.group(); //pushable objects
		obstacleEnemyPushGroup = game.add.group();
		noteGroup = game.add.group(); //notes
		enemyGroup = game.add.group(); // enemies
		keyCardGroup = game.add.group(); // keyCards
		normalLayer = game.add.group();//top layer
		topLayer = game.add.group();//Lighting layer

		//Groups unrelated to layers and is for the ground
		platforms = game.add.group(); //Ground everything rests on
		platforms2 = game.add.group(); //Ground only the player rests on when hiding

		//Generate this level from menuState
		generateLevel('level0');

		//Bring these groups to the forefront
		game.world.bringToTop(normalLayer);
		game.world.bringToTop(topLayer);


		//Adding use of various keys 
		this.cursors = game.input.keyboard.createCursorKeys();
		this.input.keyboard.addKey(Phaser.Keyboard.W);
		this.input.keyboard.addKey(Phaser.Keyboard.A);
		this.input.keyboard.addKey(Phaser.Keyboard.D);
		this.input.keyboard.addKey(Phaser.Keyboard.S);
		this.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
		this.input.keyboard.addKey(Phaser.Keyboard.ONE);
		this.input.keyboard.addKey(Phaser.Keyboard.TWO);
		this.input.keyboard.addKey(Phaser.Keyboard.THREE);
		this.input.keyboard.addKey(Phaser.Keyboard.FOUR);
		this.input.keyboard.addKey(Phaser.Keyboard.FIVE);
		this.input.keyboard.addKey(Phaser.Keyboard.SIX);
		this.input.keyboard.addKey(Phaser.Keyboard.SEVEN);
		this.input.keyboard.addKey(Phaser.Keyboard.EIGHT);
		this.input.keyboard.addKey(Phaser.Keyboard.NINE);
		this.input.keyboard.addKey(Phaser.Keyboard.ZERO);
		this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		this.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_1);
		this.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_2);
		this.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_3);
		this.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_4);
		this.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_5);
		this.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_6);
		this.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_7);
		this.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_8);
		this.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_9);
		this.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_0);
		this.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_ENTER);


		//Key press won't affect browser
		this.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
		this.input.keyboard.addKeyCapture(Phaser.Keyboard.W);
		this.input.keyboard.addKeyCapture(Phaser.Keyboard.A);
		this.input.keyboard.addKeyCapture(Phaser.Keyboard.D);
		this.input.keyboard.addKeyCapture(Phaser.Keyboard.S);
		this.input.keyboard.addKeyCapture(Phaser.Keyboard.SHIFT);

		//Use H key to swap between layers to hide
		this.hideKey = game.input.keyboard.addKey(Phaser.Keyboard.H);
		this.hideKey.onDown.add(this.hide, this);

		//Use Space Bar to jump
		this.jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.jumpKey.onDown.add(this.jump, this);

		//Use E key to interact with notes, doors, and elevators
		this.interactKey = game.input.keyboard.addKey(Phaser.Keyboard.E);
		this.interactKey.onDown.add(this.interact);

		// Use I key for inventory
		this.inventoryKey = game.input.keyboard.addKey(Phaser.Keyboard.I);
		this.inventoryKey.onDown.add(this.inventory);

	},

	update: function(){
		//Collision and overlap checks for the player
		if(foreground == true){
			hitPlatform = game.physics.arcade.collide(player, [platforms,obstacleGroup,obstaclePushGroup,obstacleEnemyPushGroup]);
		}
		else{
			hitPlatform = game.physics.arcade.collide(player, [platforms,obstacleGroup]);
		}
		pushOverlap = game.physics.arcade.overlap(player,[obstaclePushGroup,obstacleGroup, obstacleEnemyPushGroup]);
		climb = game.physics.arcade.overlap(player, obstacleClimbGroup);
		hide = game.physics.arcade.overlap(player, obstacleHideGroup);
		if(isColliding == true){
			game.physics.arcade.collide(player, [obstacleClimbGroup,obstacleHideGroup]);
		}
		if(foreground == false){
			hidePlatform = game.physics.arcade.collide(player, platforms2);
		}

		//collision checks for enemies
		var enemyHitPlatform = game.physics.arcade.collide(enemyGroup, [platforms,obstacleGroup]);
		game.physics.arcade.collide(enemyGroup, [obstacleGroup, obstacleHideGroup, obstacleClimbGroup, obstacleEnemyPushGroup]);

		// keyCard can hit stuff
		game.physics.arcade.collide(keyCardGroup, [obstacleGroup, platforms, obstacleHideGroup]);

		// spawn 'E' when you approach interactable object or door
		noteGroup.forEach( function(c) {
			if (((c.body.position.x - player.body.position.x > -50 && c.body.position.x - player.body.position.x < 0 ) || (c.body.position.x - player.body.position.x < 50 && c.body.position.x - player.body.position.x > 0 )) && c.poppingUp == false) {
				c.popup = game.add.sprite( c.body.position.x + 10, c.body.position.y - 20, 'interactableE');
				c.poppingUp = true;
			} else if (!((c.body.position.x - player.body.position.x > -80 && c.body.position.x - player.body.position.x < 0 ) || (c.body.position.x - player.body.position.x < 80 && c.body.position.x - player.body.position.x > 0 )) && c.poppingUp == true) {
				c.popup.kill();
				c.poppingUp = false;
			} 
		});
		doorGroup.forEach( function(c) {
			if (((c.body.position.x - player.body.position.x > -50 && c.body.position.x - player.body.position.x < 0 ) || (c.body.position.x - player.body.position.x < 50 && c.body.position.x - player.body.position.x > 0 )) && c.poppingUp == false) {
				c.popup = game.add.sprite( c.body.position.x + c.body.width/2 -20, c.body.position.y - 30, 'interactableE');
				c.poppingUp = true;
			} else if (!((c.body.position.x - player.body.position.x > -80 && c.body.position.x - player.body.position.x < 0 ) || (c.body.position.x - player.body.position.x < 80 && c.body.position.x - player.body.position.x > 0 )) && c.poppingUp == true) {
				c.popup.kill();
				c.poppingUp = false;
			} 
		});

		// send you back to the start for getting caught
		enemyGroup.forEach(function (c) {
			// if you are touching this enemy and this enemy sees you
			if(game.physics.arcade.overlap(player, c) && c.seesPlayer == true) {
				//add a timer
				timer = game.time.create();

				//reset player properties
				playerSpawnX = 120;
				player.body.velocity.x = 0;
				player.body.velocity.y = 0;
				canMove = false;
				c.body.velocity.x = 0;

				//fade to black screen in a 500 ms timeframe
				var restart = game.add.tileSprite(0,0,1200,800, 'blackScreen');
				restart.alpha = 0;
				restart.fixedToCamera =  true;
				game.add.tween(restart).to( {alpha: 1}, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
				timer.add(500, function (){
					//after 500 ms generate starting room
					generateLevel('level0');
					//then fade out of black back to visibility
					game.add.tween(restart).to( {alpha: 0}, 500, Phaser.Easing.Linear.None, true, 0, 0, false)
				},this);
				timer.add(1400, function(){
					//once fades are done, player can move again and black screen is destroyed
					canMove = true;
					restart.destroy();
				}, this);

				//start the timer when function starts
				timer.start();
			}
		});

		// put the key into your inventory after colliding with it
		keyCardGroup.forEach(function (k) {
			// if you are over a keycard
			if(game.physics.arcade.overlap(player, k)) {	

				itemGrabSound.play('', '', 5, false);
				var popUpDisplay = game.add.sprite(450, 470, 'inventoryBackgroundInventory');
				popUpDisplay.scale.x = 0.2;
				popUpDisplay.scale.y = 0.16;
				var popUpDisplay2;

				if (k.name == 'floor1ElevatorCode') { popUpDisplay2 = game.add.sprite(500, 520, 'floor1ElevatorCodeInventory');} 
				if (k.name == 'floor2ElevatorCode') {popUpDisplay2 = game.add.sprite(500, 520, 'floor2ElevatorCodeInventory');} 
				if (k.name == 'floor3ElevatorCode') { popUpDisplay2 = game.add.sprite(500, 520, 'floor3ElevatorCodeInventory');} 
				if (k.name == 'morgueElevatorCode') {popUpDisplay2 = game.add.sprite(500, 520, 'morgueElevatorCodeInventory');} 
				if (k.name == 'entranceFloorElevatorCode') {popUpDisplay2 = game.add.sprite(500, 520, 'entranceFloorElevatorCodeInventory');} 
				if (k.name == 'keyCard105') {popUpDisplay2 = game.add.sprite(500, 520, 'keyCard105Inventory');} 
				if (k.name == 'keyCard201') {popUpDisplay2 = game.add.sprite(500, 520, 'keyCard201Inventory');} 
				if (k.name == 'keyCard203') {popUpDisplay2 = game.add.sprite(500, 520, 'keyCard203Inventory');} 
				if (k.name == 'keyCard205') {popUpDisplay2 = game.add.sprite(500, 520, 'keyCard205Inventory');} 
				if (k.name == 'keyCard303') {popUpDisplay2 = game.add.sprite(500, 520, 'keyCard303Inventory');} 

				popUpDisplay2.scale.x = 0.4;
				popUpDisplay2.scale.y = 0.4;
				popUpDisplay.fixedToCamera = true;
				popUpDisplay2.fixedToCamera = true;

				
				inventory.push(k.name);
				console.log('hit key');
				k.kill();
				k.destroy();
				console.log(inventory);
				game.time.events.add(Phaser.Timer.SECOND * 5, function(){ popUpDisplay.kill(); popUpDisplay.destroy(); popUpDisplay2.kill(); popUpDisplay2.destroy();}, this);
			}
		});

		//check player distance from the floor
		distanceFromGround = (game.world.height-128) - player.position.y; //continually calculate

		//Climb objects
		if(climb && foreground == true && (player.body.velocity.y == 0 || isJumping == true || isClimbing == true) && canMove == true){ //can only climb when in front of the object
			if(isJumping == false){
				player.body.velocity.y = 0;
			}
			if((this.cursors.up.isDown|| game.input.keyboard.isDown(Phaser.Keyboard.W)) && (isClimbing == true || distanceFromGround <= 45 || isJumping == true) && player.position.y > 69.25){
				if(player.frame >= 13 || player.frame <= 0){ //reset the frames
					player.frame = 0; //set to bottom climb frames
				}
				player.frame ++; //Go through each frame of climb
				//player goes up
				if((hitPlatform && distanceFromGround <=40) || (!hitPlatform && distanceFromGround > 39)){
					player.body.position.y -= 2;
				}
				isClimbing = true; //disable normal left and right movement
				player.body.velocity.y = 0;
				player.body.gravity.y = 0; //player doesn't automatically fall off
			}
			if((this.cursors.down.isDown || game.input.keyboard.isDown(Phaser.Keyboard.S)) && !hitPlatform && !game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && (!this.cursors.up.isDown || !game.input.keyboard.isDown(Phaser.Keyboard.W))){
				if(player.frame >= 13 || player.frame <= 0){ //reset the frames
					player.frame = 0; //set to bottom of climb frames
				}
				player.frame ++; //Go through each frame of climb
				//player goes down
				player.body.position.y += 2;
				isClimbing = true; //disable normal left and right movement
				player.body.velocity.y = 0;
				player.body.gravity.y = 0; //player doesn't automatically fall off
			}
			if((this.cursors.left.isDown || game.input.keyboard.isDown(Phaser.Keyboard.A)) && (isClimbing == true || isJumping == true) && !game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && (!this.cursors.right.isDown || !game.input.keyboard.isDown(Phaser.Keyboard.D))){
				if(player.frame >= 13 || player.frame <= 0){ //reset the frames
					player.frame = 0; //set to bottom of climb frames
				}
				player.frame ++; //Go through each frame of climb
				//player goes left
				player.body.position.x -= 2;
				isClimbing = true; //disable normal left and right movement
				player.body.velocity.y = 0;
				player.body.gravity.y = 0; //player doesn't automatically fall off
			}
			if((this.cursors.right.isDown || game.input.keyboard.isDown(Phaser.Keyboard.D)) && (isClimbing == true || isJumping == true) && !game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
				if(player.frame >= 13 || player.frame <= 0){ //reset the frames
					player.frame = 0; //set to bottom climb frames
				}
				player.frame ++; //Go through each frame of climbs
				//player goes right
				player.body.position.x += 2;
				isClimbing = true; //disable normal left and right movement
				player.body.velocity.y = 0;
				player.body.gravity.y = 0; //player doesn't automatically fall off
			}
		}

		//reset variables
		//reset away from climb
		if(!climb){
			isClimbing = false;
			player.body.gravity.y = playerGravity;
			canControl = true;
		}

		//Allow left to right movement when not climbing but not when climbing something and reset jumping variable
		if(isClimbing == true){
			canControl = false;
			//Specific edge case for when player stands on top of 2 boxes stacked on top of each other
			if((!hitPlatform && player.body.touching.down && player.body.velocity.y > 17 && player.body.velocity.y <18 && !hide && !pushOverlap)){
				isJumping = true;
			}
			else{
				isJumping = false;
			}
		}
		if(isJumping == true){
			canControl = true;
		}
		//reset jump variable when landing on something
		if((hitPlatform && player.body.touching.down) || (player.body.touching.down && player.body.velocity.y == 0)){
			isJumping = false;
		}
		if(hitPlatform && distanceFromGround <= 40){
			canControl = true;
			isClimbing = false;
		}


		//Movement system
		player.body.velocity.x = 0; //reset player velocity
		//Check Direction player is moving in
		if(playerDirection >= 1){
			playerDirection = 1; //Right
		}
		if(playerDirection <= 0){
			playerDirection = 0; //Left
		}
		if((this.cursors.left.isDown || game.input.keyboard.isDown(Phaser.Keyboard.A)) && canControl == true && canMove == true){
			//move left
			playerDirection --; //player was moving left
			if(foreground == true){
				//Allow player to move on the ground and move in the air while jumping
				if(game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)){
						player.body.velocity.x = -250; //sprint speed
					}
					else{
						player.body.velocity.x = -150; //normal speed
					}
				if((player.body.touching.down || distanceFromGround <= 40) || (hitPlatform && player.body.velocity.y <=4)){
					//Walking animation
					player.animations.play('walkLeft');
					//Walking sound
					playerFootsteps.play('',0,.5,false,false);					
				}
				//jump animation
				else{
					if(player.body.velocity.y < 0){
						//Going up animation
						player.frame = 43;
					}
					if(player.body.velocity.y > 0){
						//Going down animation
						player.frame = 44;
					}
				}
			}
			else{
				//Crawling animation
				player.animations.play('crawlLeft');
				player.body.velocity.x = -75; //crawl speed
			}
		}
		else if((this.cursors.right.isDown || game.input.keyboard.isDown(Phaser.Keyboard.D)) && canControl == true && canMove == true){
			//move right
			playerDirection ++; //player was moving right
			if(foreground == true){
				//Allow player to move on the ground and move in the air while jumping
				if(game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)){
						player.body.velocity.x = 250; //sprint speed
					}
					else{
						player.body.velocity.x = 150; //normal speed
					}
				if((player.body.touching.down || distanceFromGround <= 40) || (hitPlatform && player.body.velocity.y <=4)){
					//Walking animation
					player.animations.play('walkRight');
					//Walking sound
					playerFootsteps.play('',0,.5,false,false);
				}
				//jump animation
				else{
					if(player.body.velocity.y < 0){
						//Going up animation
						player.frame = 35;
					}
					if(player.body.velocity.y > 0){
						//Going down animation
						player.frame = 36;
					}
				}
			}
			else{
				//crawling animation
				player.animations.play('crawlRight');
				player.body.velocity.x = 75; //crawl speed
			}
		}

		else{
			//stand still
			player.animations.stop();
			//when player is on top of something and not in the air or climbing
			if((!isClimbing && ((player.body.touching.down && hitPlatform) || player.body.velocity.y == 0)) && foreground == true){
				if(playerDirection == 0){
					player.frame = 53; //Face Left
				}
				if(playerDirection == 1){
					player.frame = 46; //Face right
				}
   			}
   		}

   		//Reach game over screen when at the final level
   		if(levelData.backgroundData == "endingBackground" && player.position.x >= 1200){
   			//fading in and out after certain distance
   			if(fadeMade == false){
   				fadeStart = game.add.tileSprite(0,0,1200,800, 'blackScreen');
   				fadeStart.alpha = 0;
   				fadeStart.fixedToCamera =  true;
   				game.add.tween(fadeStart).to( {alpha: 0.5}, 1000, Phaser.Easing.Linear.None, true, 0, 6000, true).loop(true);
   				fadeMade = true;
   			}
   			//Send player to game over screen
   			else if(player.position.x >= 3500){;
   				fadeStart.destroy();
				game.state.start('end');
			}
		}

		//Camera pans a level when player first enters to show players the challenges ahead
		//First Hallway
		if(levelData.backgroundData == 'hallRoomSprite' && seenLevel1 == false){
			game.camera.follow(null, Phaser.PLATFORMER); //Make camera unfollow player to follow nothing
			game.camera.x += 5; //camera move speed
			canMove = false; //stop player from moving
			playerCamera = false; //This variable is just to make it so that when the game.camera follows the player again, it won't have to be updated continually
			if(game.camera.x >= (levelData.worldBounds.x - 1200)){ //Once panning reaches the end
				seenLevel1 = true; //Player has now seen the level
			}
		}
		//Put the camera back on the player when camera pan ends
		else if(levelData.backgroundData == 'hallRoomSprite' && seenLevel1 == true && playerCamera == false){
			game.camera.follow(player, Phaser.PLATFORMER); //Camera is locked onto player
			canMove = true; // Player can move again
			playerCamera = true; //Variable set to true
		}
		//Second Hallway
		if(levelData.backgroundData == 'hall2' && seenLevel2 == false){
			game.camera.follow(null, Phaser.PLATFORMER); //Make camera unfollow player to follow nothing
			game.camera.x += 5; //camera move speed
			canMove = false; //stop player from moving
			playerCamera = false; //This variable is just to make it so that when the game.camera follows the player again, it won't have to be updated continually
			if(game.camera.x >= (levelData.worldBounds.x - 1200)){ //Once panning reaches the end
				seenLevel2 = true; //Player has now seen the level
			}
		}
		//Put the camera back on the player when camera pan ends
		else if(levelData.backgroundData == 'hall2' && seenLevel2 == true && playerCamera == false){
			game.camera.follow(player, Phaser.PLATFORMER); //Camera is locked onto player
			canMove = true; // Player can move again
			playerCamera = true; //Variable set to true
		}
		//Third Hallway
		if(levelData.backgroundData == 'hall3' && seenLevel3 == false){
			game.camera.follow(null, Phaser.PLATFORMER); //Make camera unfollow player to follow nothing
			game.camera.x += 5; //camera move speed
			canMove = false; //stop player from moving
			playerCamera = false; //This variable is just to make it so that when the game.camera follows the player again, it won't have to be updated continually
			if(game.camera.x >= (levelData.worldBounds.x - 1200)){ //Once panning reaches the end
				seenLevel3 = true; //Player has now seen the level
			}
		}
		//Put the camera back on the player when camera pan ends
		else if(levelData.backgroundData == 'hall3' && seenLevel3 == true && playerCamera == false){
			game.camera.follow(player, Phaser.PLATFORMER); //Camera is locked onto player
			canMove = true; // Player can move again
			playerCamera = true; //Variable set to true
		}
		//Fourth Hallway
		if(levelData.backgroundData == 'lab' && seenLevel4 == false){
			game.camera.follow(null, Phaser.PLATFORMER); //Make camera unfollow player to follow nothing
			game.camera.x += 5; //camera move speed
			canMove = false; //stop player from moving
			playerCamera = false; //This variable is just to make it so that when the game.camera follows the player again, it won't have to be updated continually
			if(game.camera.x >= (levelData.worldBounds.x - 1200)){ //Once panning reaches the end
				seenLevel4 = true; //Player has now seen the level
			}
		}
		//Put the camera back on the player when camera pan ends
		else if(levelData.backgroundData == 'lab' && seenLevel4 == true && playerCamera == false){
			game.camera.follow(player, Phaser.PLATFORMER); //Camera is locked onto player
			canMove = true; // Player can move again
			playerCamera = true; //Variable set to true
		}
		//Fifth Hallway
		if(levelData.backgroundData == 'burntLab' && seenLevel5 == false){
			game.camera.follow(null, Phaser.PLATFORMER); //Make camera unfollow player to follow nothing
			game.camera.x += 5; //camera move speed
			canMove = false; //stop player from moving
			playerCamera = false; //This variable is just to make it so that when the game.camera follows the player again, it won't have to be updated continually
			if(game.camera.x >= (levelData.worldBounds.x - 1200)){ //Once panning reaches the end
				seenLevel5 = true; //Player has now seen the level
			}
		}
		//Put the camera back on the player when camera pan ends
		else if(levelData.backgroundData == 'burntLab' && seenLevel5 == true && playerCamera == false){
			game.camera.follow(player, Phaser.PLATFORMER); //Camera is locked onto player
			canMove = true; // Player can move again
			playerCamera = true; //Variable set to true
		}



		// elevator interaction
		// Add keyboard input version
		if (elevatorOpen == true) {
			game.input.keyboard.onUpCallback = function(e) {
				if (e.keyCode == Phaser.Keyboard.ONE || e.keyCode == Phaser.Keyboard.NUMPAD_1) { buttonPressSound.play(); if(elevatorString == "Invalid") { elevatorString = '';} if(elevatorString.length < 4) {elevatorString += '1'; elevatorText.setText(elevatorString);}}
				if (e.keyCode == Phaser.Keyboard.TWO || e.keyCode == Phaser.Keyboard.NUMPAD_2) { buttonPressSound.play(); if(elevatorString == "Invalid") { elevatorString = '';} if(elevatorString.length < 4) {elevatorString += '2'; elevatorText.setText(elevatorString);}}
				if (e.keyCode == Phaser.Keyboard.THREE || e.keyCode == Phaser.Keyboard.NUMPAD_3) { buttonPressSound.play(); if(elevatorString == "Invalid") { elevatorString = '';} if(elevatorString.length < 4) {elevatorString += '3'; elevatorText.setText(elevatorString);}}
				if (e.keyCode == Phaser.Keyboard.FOUR || e.keyCode == Phaser.Keyboard.NUMPAD_4) { buttonPressSound.play(); if(elevatorString == "Invalid") { elevatorString = '';} if(elevatorString.length < 4) {elevatorString += '4'; elevatorText.setText(elevatorString);}}
				if (e.keyCode == Phaser.Keyboard.FIVE || e.keyCode == Phaser.Keyboard.NUMPAD_5) { buttonPressSound.play(); if(elevatorString == "Invalid") { elevatorString = '';} if(elevatorString.length < 4) {elevatorString += '5'; elevatorText.setText(elevatorString);}}
				if (e.keyCode == Phaser.Keyboard.SIX || e.keyCode == Phaser.Keyboard.NUMPAD_6) { buttonPressSound.play(); if(elevatorString == "Invalid") { elevatorString = '';} if(elevatorString.length < 4) {elevatorString += '6'; elevatorText.setText(elevatorString);} }
				if (e.keyCode == Phaser.Keyboard.SEVEN || e.keyCode == Phaser.Keyboard.NUMPAD_7) { buttonPressSound.play(); if(elevatorString == "Invalid") { elevatorString = '';} if(elevatorString.length < 4) {elevatorString += '7'; elevatorText.setText(elevatorString);}}
				if (e.keyCode == Phaser.Keyboard.EIGHT || e.keyCode == Phaser.Keyboard.NUMPAD_8) { buttonPressSound.play(); if(elevatorString == "Invalid") { elevatorString = '';} if(elevatorString.length < 4) {elevatorString += '8'; elevatorText.setText(elevatorString);} }
				if (e.keyCode == Phaser.Keyboard.NINE || e.keyCode == Phaser.Keyboard.NUMPAD_9) { buttonPressSound.play(); if(elevatorString == "Invalid") { elevatorString = '';} if(elevatorString.length < 4) {elevatorString += '9'; elevatorText.setText(elevatorString);} }
				if (e.keyCode == Phaser.Keyboard.ZERO || e.keyCode == Phaser.Keyboard.NUMPAD_0) { buttonPressSound.play(); if(elevatorString == "Invalid") { elevatorString = '';} if(elevatorString.length < 4) {elevatorString += '0'; elevatorText.setText(elevatorString);}}
				if (e.keyCode == Phaser.Keyboard.ENTER || e.keyCode == Phaser.Keyboard.NUMPAD_ENTER) { buttonPressSound.play(); var shouldDestroy = false;
						if(elevatorString == '1379') {playerSpawnX = 621; generateLevel('level3'); shouldDestroy = true;} 
						else if(elevatorString == '2821') {playerSpawnX = 621; generateLevel('level2'); shouldDestroy = true;}
						else if(elevatorString == '3462') {playerSpawnX = 621; generateLevel('level1'); shouldDestroy = true;}
						else if(elevatorString == '0117') {playerSpawnX = 214; generateLevel('morgueFloor'); shouldDestroy = true;}
						else if (elevatorString == '0379') {playerSpawnX = 214; generateLevel('receptionFloor'); shouldDestroy = true;}
						else {elevatorString = 'Invalid'}
						if (shouldDestroy == true) {
							elevatorBackground.destroy();
							button1.destroy();
							button2.destroy();
							button3.destroy();
							button4.destroy();
							button5.destroy();
							button6.destroy();
							button7.destroy();
							button8.destroy();
							button9.destroy();
							button0.destroy();
							buttonEnter.destroy();
							elevatorText.destroy();
							elevatorOpen = false;
							canMove = true;
						}
						elevatorText.setText(elevatorString);}
			}
		}
			
				
	},
	hide: function(){
		if(isClimbing == false && !climb && !hide && !pushOverlap && canMove == true){ //Don't allow player to hide when in front of the object
			if(foreground==true && distanceFromGround <= 40){
				//move player from foreground to layer behind the object
				player.body.setSize(90, 145, 63, 4);
				player.body.velocity.y = 0;
				normalLayer.remove(player);
				backLayer.add(player);
				foreground=false;
				if(playerDirection == 0){
					player.frame = 21;
				}
				if(playerDirection == 1){
					player.frame = 14;
				}
				player.position.y = game.world.height - 190; //set player to hide platform
			}
			else if(foreground == false && hidePlatform){
				//move player to the foreground
				player.body.setSize(90, 270, 63, 4);	
				backLayer.remove(player);
				normalLayer.add(player);
				foreground=true;
				if(playerDirection == 0){
					player.frame = 53; //Face Left
				}
				if(playerDirection == 1){
					player.frame = 46; //Face right
				}
				player.position.y = game.world.height - 165; //set player to normal platform
			}
		}
	},
	jump: function(){
		//Scenario checks to see if you can jump
		//Touching the ground, while climbing, in front of a climbable object on the ground, on top of obstacleGroup
		if(canMove == true){	
			if((hitPlatform && player.body.touching.down) || isClimbing == true || (climb == true && distanceFromGround <= 40) || (player.body.touching.down && player.body.velocity.y == 0) || (!hitPlatform && player.body.touching.down && player.body.velocity.y > 17 && player.body.velocity.y <18 && !hide && !pushOverlap)){
				if(foreground == true){
					player.animations.stop();
					if(playerDirection == 0){
						player.frame = 43; // Jumping Left
					}
					if(playerDirection == 1){
						player.frame = 35; //Jumping Right
					}
					player.body.velocity.y = -400; //jump height
					isClimbing = false;
					isJumping = true;
					player.body.gravity.y = playerGravity;
				}
			}
		}
	},
	interact: function(){
		var doorEntering;
		var noteReading;
		for(var i = 0; i < noteGroup.children.length; i++){
			noteReading = noteGroup.children[i];
			//if player is overlaping with the noteGroup
			if(game.physics.arcade.overlap(player, noteReading)){
				if(canMove == true){	
					if(noteReading.name == 'random patient') {
						read = game.add.sprite(noteReading.position.x - 240, noteReading.position.y - 150, 'speech bubble');
						read.scale.x = 0.3;
						read.scale.y = 0.3;
						player.body.velocity.x = 0;
						player.body.velocity.y = 0;
						canMove = false;
					} else {
						//Add the blown up version of the sprite on screen and stop player from moving
						pageTurnSound.play();
						read = game.add.sprite(50, -50, noteReading.leadsTo);
						read.scale.x = 0.8;
						read.scale.y = 0.8;
						read.alpha = 1;
						read.fixedToCamera = true;
						player.body.velocity.x = 0;
						player.body.velocity.y = 0;
						canMove = false;
						topLayer.add(read);
						if (noteReading.name == 'text message') {
							read.scale.x = 0.3;
							read.scale.y = 0.3;
						}
					}
					
				}
				else{
					//Destroy the blown up version of the sprite on screen and allow player to move again
					read.destroy();
					canMove = true;
					console.log('destroy');
				}
			}
		}
		if(foreground == true){
			for(var i = 0; i < doorGroup.children.length; i++) {
			
				doorEntering = doorGroup.children[i];
				// only enter the door if the key exists in your inventory
				if(game.physics.arcade.overlap(player, doorEntering) && inventory.indexOf(doorEntering.keyRequired) > -1 ){
					console.log('now entering: ' + doorEntering.name);
					if (doorEntering.name == 'elevator' && elevatorOpen == false && canMove == true) {
						console.log('show elevator');
						elevatorOpen = true;
						canMove = false;
						elevatorBackground = game.add.sprite(100, 20, 'elevatorAtlas', 'elevatorPanel');
						elevatorString = '';
						elevatorText = game.add.text(175, 193, elevatorString);
						button1 = game.add.button(145, 325, 'elevatorAtlas', function() { buttonPressSound.play(); if(elevatorString == "Invalid") { elevatorString = '';} if(elevatorString.length < 4) {elevatorString += '1'; elevatorText.setText(elevatorString);} } , this, 'button1', 'button1');
						button2 = game.add.button(225, 325, 'elevatorAtlas', function() { buttonPressSound.play(); if(elevatorString == "Invalid") { elevatorString = '';} if(elevatorString.length < 4) {elevatorString += '2'; elevatorText.setText(elevatorString);} } , this, 'button2', 'button2');
						button3 = game.add.button(305, 325, 'elevatorAtlas', function() { buttonPressSound.play(); if(elevatorString == "Invalid") { elevatorString = '';} if(elevatorString.length < 4) {elevatorString += '3'; elevatorText.setText(elevatorString);} } , this, 'button3', 'button3');
						button4 = game.add.button(145, 380, 'elevatorAtlas', function() { buttonPressSound.play(); if(elevatorString == "Invalid") { elevatorString = '';} if(elevatorString.length < 4) {elevatorString += '4'; elevatorText.setText(elevatorString);} } , this, 'button4', 'button4');
						button5 = game.add.button(225, 380, 'elevatorAtlas', function() { buttonPressSound.play(); if(elevatorString == "Invalid") { elevatorString = '';} if(elevatorString.length < 4) {elevatorString += '5'; elevatorText.setText(elevatorString);} } , this, 'button5', 'button5');
						button6 = game.add.button(305, 380, 'elevatorAtlas', function() { buttonPressSound.play(); if(elevatorString == "Invalid") { elevatorString = '';} if(elevatorString.length < 4) {elevatorString += '6'; elevatorText.setText(elevatorString);} } , this, 'button6', 'button6');
						button7 = game.add.button(145, 435, 'elevatorAtlas', function() { buttonPressSound.play(); if(elevatorString == "Invalid") { elevatorString = '';} if(elevatorString.length < 4) {elevatorString += '7'; elevatorText.setText(elevatorString);} } , this, 'button7', 'button7');
						button8 = game.add.button(225, 435, 'elevatorAtlas', function() { buttonPressSound.play(); if(elevatorString == "Invalid") { elevatorString = '';} if(elevatorString.length < 4) {elevatorString += '8'; elevatorText.setText(elevatorString);} } , this, 'button8', 'button8');
						button9 = game.add.button(305, 435, 'elevatorAtlas', function() { buttonPressSound.play(); if(elevatorString == "Invalid") { elevatorString = '';} if(elevatorString.length < 4) {elevatorString += '9'; elevatorText.setText(elevatorString);} } , this, 'button9', 'button9');
						button0 = game.add.button(225, 490, 'elevatorAtlas', function() { buttonPressSound.play(); if(elevatorString == "Invalid") { elevatorString = '';} if(elevatorString.length < 4) {elevatorString += '0'; elevatorText.setText(elevatorString);} } , this, 'button0', 'button0');
						buttonEnter = game.add.button(305, 490, 'elevatorAtlas', 
							function() { 
								buttonPressSound.play(); 
								// if the code entered matches properly, generate level and close panel
								var shouldDestroy = false;
								if(elevatorString == '1379') {playerSpawnX = 621; generateLevel('level3'); shouldDestroy = true;} 
								else if(elevatorString == '2821') {playerSpawnX = 621; generateLevel('level2'); shouldDestroy = true;}
								else if(elevatorString == '3462') {playerSpawnX = 621; generateLevel('level1'); shouldDestroy = true;}
								else if(elevatorString == '0117') {playerSpawnX = 214; generateLevel('morgueFloor'); shouldDestroy = true;}
								else if (elevatorString == '0379') {playerSpawnX = 214; generateLevel('receptionFloor'); shouldDestroy = true;}
								else {elevatorString = 'Invalid'}
								if (shouldDestroy == true) {
									elevatorBackground.destroy();
									button1.destroy();
									button2.destroy();
									button3.destroy();
									button4.destroy();
									button5.destroy();
									button6.destroy();
									button7.destroy();
									button8.destroy();
									button9.destroy();
									button0.destroy();
									buttonEnter.destroy();
									elevatorText.destroy();
									elevatorOpen = false;
									canMove = true;
								}
								elevatorText.setText(elevatorString);
							}, this, 'buttonEnt', 'buttonEnt');

					} else if (doorEntering.name == 'elevator' && elevatorOpen == true) {
						console.log('kill elevator');
						console.log(canMove);
						elevatorBackground.destroy();
						button1.destroy();
						button2.destroy();
						button3.destroy();
						button4.destroy();
						button5.destroy();
						button6.destroy();
						button7.destroy();
						button8.destroy();
						button9.destroy();
						button0.destroy();
						buttonEnter.destroy();
						elevatorText.destroy();
						canMove = true;
						elevatorOpen = false;
					} else if (doorEntering.name == 'creepyDoor' && doorWasOpened == false ) {
						console.log('open creepy');		
						creepyDoor.animations.play('open door');
						doorWasOpened = true;
					}  else if (doorEntering.name == 'creepyDoor' && doorWasOpened == true ){
						console.log('open  empty creepy');
						creepyDoor.animations.play('empty open door');
					} else {
						if(canMove == true){
							playerSpawnX = doorEntering.spawnAtx; // set appropriate place to spawn
							//play door audio
							doorSound.play();
							this.generateLevel(doorEntering.leadsTo);
						
							console.log(doorEntering.leadsTo);
						}
					}
					break;
				} else {
					if(game.physics.arcade.overlap(player, doorEntering) && inventory.indexOf(doorEntering.keyRequired) <= -1 && canMove == true){
						doorLockedSound.play();
					}
				}
			}
		}
	},
	inventory: function() {
		if (!inventoryOpen) {
			canMove = false;
			invBack = game.add.image(player.body.position.x -100, 150, 'inventoryBackgroundInventory');
			invBack.scale.x = 0.5;
			invBack.scale.y = 0.5;


			if(inventory.indexOf('floor1ElevatorCode') > -1 ){
				invFloor1 = game.add.image(player.body.position.x +300, 300, 'floor1ElevatorCodeInventory');
				invFloor1.scale.x = 0.4;
				invFloor1.scale.y = 0.4;
			} 
			if (inventory.indexOf('floor2ElevatorCode') > -1) {
				invFloor2 = game.add.image(player.body.position.x+300, 255, 'floor2ElevatorCodeInventory');
				invFloor2.scale.x = 0.4;
				invFloor2.scale.y = 0.4;
			} 
			if (inventory.indexOf('floor3ElevatorCode') > -1) {
				invFloor3 = game.add.image(player.body.position.x+300, 205, 'floor3ElevatorCodeInventory');
				invFloor3.scale.x = 0.4;
				invFloor3.scale.y = 0.4;
			} 
			if (inventory.indexOf('morgueElevatorCode') > -1 ) {
				invMorgue = game.add.image(player.body.position.x+300, 350, 'morgueElevatorCodeInventory');
				invMorgue.scale.x = 0.4;
				invMorgue.scale.y = 0.4;
			} 
			if (inventory.indexOf('entranceFloorElevatorCode') > -1) {
				invEntrance = game.add.image(player.body.position.x+300, 400, 'entranceFloorElevatorCodeInventory');
				invEntrance.scale.x = 0.4;
				invEntrance.scale.y = 0.4;
			} 
			if (inventory.indexOf('keyCard105') > -1) {
				inv105 = game.add.image(player.body.position.x, 400, 'keyCard105Inventory');
				inv105.scale.x = 0.4;
				inv105.scale.y = 0.4;
			} 
			if (inventory.indexOf('keyCard201') > -1){
				inv201 = game.add.image(player.body.position.x, 255, 'keyCard201Inventory');
				inv201.scale.x = 0.4;
				inv201.scale.y = 0.4;
			} 
			if (inventory.indexOf('keyCard203') > -1) {
				inv203 = game.add.image(player.body.position.x, 300, 'keyCard203Inventory');
				inv203.scale.x = 0.4;
				inv203.scale.y = 0.4;
			} 
			if (inventory.indexOf('keyCard205') > -1) {
				inv205 = game.add.image(player.body.position.x, 350, 'keyCard205Inventory');
				inv205.scale.x = 0.4;
				inv205.scale.y = 0.4;
			} 
			if (inventory.indexOf('keyCard303') > -1) {
				inv303 = game.add.image(player.body.position.x, 205, 'keyCard303Inventory');
				inv303.scale.x = 0.4;
				inv303.scale.y = 0.4;
			} 
			
			
			inventoryOpen = true;
		} else {
			console.log('kill inv');
			if( invFloor1 != undefined) {invFloor1.destroy();}
			if( invFloor2 != undefined) {invFloor2.destroy();} 
			if( invFloor3 != undefined) {invFloor3.destroy();} 
			if( invEntrance != undefined) {invEntrance.destroy();} 
			if( invBack != undefined) {invBack.destroy();}
			if( inv105 != undefined) {inv105.destroy();} 
			if( inv203 != undefined) {inv203.destroy();} 
			if( inv303 != undefined) {inv303.destroy();} 
			if( invMorgue != undefined) {invMorgue.destroy();} 
			if( inv201 != undefined) {inv201.destroy(); }
			if( inv205 != undefined) {inv205.destroy();}
			inventoryOpen = false;
			canMove = true;
		}
	}
};

var generateLevel = function(levelName) {

	console.log('generated');

	// destroy can cause forEach to skip index. While loop helps ensure that all enemies get destroyed.
	while(backgroundGroup.length > 0) { backgroundGroup.forEach(function (c) {c.kill(); c.destroy(); });}
	while(doorGroup.length > 0) { doorGroup.forEach(function (c) {if(c.popup != undefined) {c.popup.destroy();} c.kill(); c.destroy(); });}
	while(backLayer.length > 0) { backLayer.forEach(function (c) {c.kill(); c.destroy(); });}
	while(obstacleHideGroup.length > 0) { obstacleHideGroup.forEach(function (c) {c.kill(); c.destroy(); });} 
	while(obstacleGroup.length > 0) { obstacleGroup.forEach(function (c) {c.kill(); c.destroy(); });}
	while(obstacleClimbGroup.length > 0) { obstacleClimbGroup.forEach(function (c) {c.kill(); c.destroy(); });}
	while(obstaclePushGroup.length > 0) { obstaclePushGroup.forEach(function (c) {c.kill(); c.destroy(); });}
	while(noteGroup.length > 0) { noteGroup.forEach(function (c) {if(c.popup != undefined) {c.popup.destroy();} c.kill(); c.destroy();});}
	while(keyCardGroup.length > 0) { keyCardGroup.forEach(function (c) {c.kill(); c.destroy();});}
	while(enemyGroup.length > 0) { enemyGroup.forEach(function (c) {c.kill(); c.destroy(); });}
	while(obstacleEnemyPushGroup.length > 0) { obstacleEnemyPushGroup.forEach(function (c) {c.kill(); c.destroy(); });}
	while(normalLayer.length > 0) {normalLayer.forEach(function (c) {c.kill(); c.destroy();});}
	while(topLayer.length > 0) {topLayer.forEach(function (c) {c.kill(); c.destroy();});}
	while(platforms.length > 0) {platforms.forEach(function (c) {c.kill(); c.destroy();});}
	while(platforms2.length > 0) {platforms2.forEach(function (c) {c.kill(); c.destroy();});}

	//Current level data
	levelData = game.cache.getJSON(levelName);

	//Set camera bounds
	game.world.setBounds(0, 0, levelData.worldBounds.x, levelData.worldBounds.y);

	//Background image
	var background = game.add.sprite(0,0, levelData.backgroundData);
	game.world.sendToBack(background);
	backgroundGroup.add(background);

	//Lighting filter for room
	if(levelData.shadowData != ""){
		var shadows = game.add.sprite(0,0, levelData.shadowData); 
		topLayer.add(shadows);
	}

	// generate all doors from the data
	for (var index = 0; index < levelData.doorData.length; index++) {
		// set element to the object and use it's parameters
		var doorTemp = new Door(game, levelData.doorData[index].frame, levelData.doorData[index].name, levelData.doorData[index].leadsTo, levelData.doorData[index].xPos, levelData.doorData[index].yPos, levelData.doorData[index].spawnAtx, levelData.doorData[index].keyRequired);
		console.log(doorTemp.name);
		game.physics.enable(doorTemp);
		game.add.existing(doorTemp);
		doorGroup.add(doorTemp);
	}

	// generate all objects from the data
	for (var index = 0; index < levelData.obstacleData.length; index++) {
		// set element to the object and use it's parameters
		var obstacleTemp = new Obstacle(game, levelData.obstacleData[index].frame, levelData.obstacleData[index].xPos, levelData.obstacleData[index].yPos, levelData.obstacleData[index].xScale, levelData.obstacleData[index].yScale, levelData.obstacleData[index].pushable, levelData.obstacleData[index].climbable, levelData.obstacleData[index].collidable, levelData.obstacleData[index].gravityEnabled, levelData.obstacleData[index].hidable);
		game.add.existing(obstacleTemp);
		if(obstacleTemp.climbable == true) {
			obstacleClimbGroup.add(obstacleTemp);
		}
		else if(obstacleTemp.hidable == true){
			obstacleHideGroup.add(obstacleTemp);
		}
		else if(obstacleTemp.pushable == "enemy") {
			obstacleEnemyPushGroup.add(obstacleTemp);
			console.log('this one is enemypush');
		}
		else if(obstacleTemp.pushable == true){
			obstaclePushGroup.add(obstacleTemp);
		} 
		else{
			obstacleGroup.add(obstacleTemp);
		}
		console.log(obstacleTemp.pushable);
	} 

	// generate notes
	for (var index = 0; index < levelData.noteData.length; index++) {
		// set element to the object and use it's parameters
		var noteTemp = new Note(game, levelData.noteData[index].frame, levelData.noteData[index].name, levelData.noteData[index].leadsTo, levelData.noteData[index].xPos, levelData.noteData[index].yPos);
		console.log(noteTemp.leadsTo);
		noteTemp.alpha = 1;
		noteTemp.scale.setTo(0.05, 0.05); 
		if(noteTemp.leadsTo == 'family portrait'){
			noteTemp.scale.setTo(0.075, 0.1);
			noteTemp.alpha = 0;	
		}  else if (noteTemp.name == 'random patient') {
			noteTemp.scale.setTo(0.21, 0.21);
		} else if (noteTemp.name == 'corpse') {
			noteTemp.scale.setTo(0.25, 0.25);
		} else if (noteTemp.name == 'text message') {
			noteTemp.scale.setTo(0.025, 0.025);
		}
		game.physics.enable(noteTemp);
		game.add.existing(noteTemp);
		noteGroup.add(noteTemp);
		
	} 

	//Player object
	player = game.add.sprite(playerSpawnX, game.world.height - 165, 'atlas', 'patient-1.png');
	//player properties
	game.physics.enable([player], Phaser.Physics.ARCADE);
	player.body.setSize(90, 270, 63, 4); // adjusts hitbox
	player.anchor.set(0.5);
	player.scale.x = 0.5;
	player.scale.y = 0.5;
	game.physics.enable(player);
	player.body.gravity.y = playerGravity;
	player.body.collideWorldBounds = true;
	//animations for walking
	player.animations.add('walkRight', [47,48,49,50,51,52], 10, true);
	player.animations.add('walkLeft', [54,55,56,57,58,59], 10, true);
	//animations for crawling
	player.animations.add('crawlRight',[14,15,16,17,18,19,20], 10, true);
	player.animations.add('crawlLeft',[21,22,23,24,25,26,27], 10, true);
	//Reset variables
	if(foreground == true){ //If level generates while player is in the top layer/group 3
		normalLayer.add(player); //set player to top layer/foreground
	}
	else{//for if player gets caught while crouching
		//move player to the foreground
		backLayer.remove(player);
		normalLayer.add(player);
		foreground=true;
	}
	//Default set camera to lock on player
	game.camera.follow(player, Phaser.PLATFORMER);

	//When camera hasn't panned a level yet
	if(seenLevel1 == false || seenLevel2 == false || seenLevel3 == false || seenLevel4 == false || seenLevel5 == false){
		game.camera.x = 0; //set camera position to left-end of screen.
	}

	//Fade when player enters a new level
	timer = game.time.create();
	//fade to black screen in a 250 ms timeframe
	var fadeStart = game.add.tileSprite(0,0,1200,800, 'blackScreen');
	fadeStart.fixedToCamera =  true;
	game.add.tween(fadeStart).to( {alpha: 0}, 250, Phaser.Easing.Linear.None, true, 0, 0, false);
	timer.add(250, function (){
		fadeStart.destroy();
	},this);
	//start the timer when function starts
	timer.start();

	// generate enemies
	for (var index = 0; index < levelData.enemyData.length; index++) {
		// set element to the object and use it's parameters
		var enemyTemp = new Enemy(game, levelData.enemyData[index].key, levelData.enemyData[index].frame, levelData.enemyData[index].xPos, levelData.enemyData[index].yPos, levelData.enemyData[index].walkSpeed, levelData.enemyData[index].runSpeed, levelData.enemyData[index].walkDist, levelData.enemyData[index].turnTime, levelData.enemyData[index].facing, player);
		if (levelData.enemyData[index].target == "none") { enemyTemp.target == "none";}
		enemyTemp.scale.x = 0.17;
		enemyTemp.scale.y = 0.145;
		console.log(enemyTemp.target);
		game.add.existing(enemyTemp);
		enemyGroup.add(enemyTemp);

	} 

	// generate keyCards
	for (var index = 0; index < levelData.keyCardData.length; index++) {
		// only spawn keys that the player does not have
		if(inventory.indexOf(levelData.keyCardData[index].name) < 0) {
			// set element to the object and use it's parameters
			var keyCardTemp = new KeyCard(game, levelData.keyCardData[index].frame, levelData.keyCardData[index].xPos, levelData.keyCardData[index].yPos, levelData.keyCardData[index].name);
			game.add.existing(keyCardTemp);
			keyCardGroup.add(keyCardTemp);
		}
	}

	// create creepy door girl for level 1
	if (levelName == 'level1') {
		creepyDoor = new Door(game, 'door animation', 'creepyDoor', undefined, 4492, 339, 0, 'none');
		creepyDoor.animations.add('empty open door', [8,9,10,11,12,13,14,14,14,14,14,14,14,14,12,11,10,9,8], 10, false);
		creepyDoor.animations.add('open door', [0,1,2,3,4,5,6,7,7,7,7,7,7,7,7,7,7,7,7,6,5,4,3,2,1,0], 10, false);
    	game.physics.enable(creepyDoor);
		game.add.existing(creepyDoor);
    	doorGroup.add(creepyDoor);
	}

	// create coughing girl for level 1
	if (levelName == 'level3') {
		var sittingGirl = game.add.sprite(2725, 350, 'coughingDaughter');
		sittingGirl.scale.x = 0.07;
		sittingGirl.scale.y = 0.07;
		sittingGirl.animations.add('cough', [0,1,2,0], 5, false);

    	game.time.events.loop(Phaser.Timer.SECOND * 5, function(){sittingGirl.animations.play('cough')}, this);
    	obstacleGroup.add(sittingGirl);

	}
	
	// platforms for normal walking
	platforms.enableBody = true;
	ground = platforms.create(0, game.world.height - 100, 'grass'); //Note use a better placeholder art next time
	ground.scale.setTo(100, 0.5);
	ground.body.immovable = true; 
	ground.alpha = 0;

	//Ground for when hiding to have alignment with hidable objects
	platforms2.enableBody = true;
	ground2 = platforms2.create(0, game.world.height - 150, 'grass'); //Note use a better placeholder art next time
	ground2.scale.setTo(100, 0.5);
	ground2.body.immovable = true; 
	ground2.alpha = 0;

	console.log('done');
};