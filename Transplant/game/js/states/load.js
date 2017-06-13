var load = {
	preload: function(){
		console.log('Load: preload');
		var loadLabel = this.add.text(80, 150, 'Loading...', {font: '30px Courier', fill: '#ffffff'}); //text on the screen to indicate the game is loading
		game.load.path = '../game/assets/img/';
		//ground art but won't be seen
		game.load.image('grass', 'platform.png');

		// background
		game.load.image('title', 'titleScreen.png');
		game.load.image('controls', 'Controls.png');
		game.load.image('hallRoomSprite', 'HallOne.jpg');
		game.load.image('startRoomSprite', 'Level01.jpg');
		game.load.image('shadowsHallOne', 'shadowsHallOne.png');
		game.load.image('endingBackground', 'Ending.jpg');
		game.load.image('endingTallGrass', 'endingTallGrass.png');
		game.load.image('patientRoom', 'patientRoom.jpg');
		game.load.image('HallBG', 'HallBG.jpg');
		game.load.image('hall2', 'HallTwo.jpg');
		game.load.image('hall3', 'HallThree.jpg');
		game.load.image('shadowsHallTwo', 'shadowsHallTwo.png');
		game.load.image('lab', 'lab.jpg');
		game.load.image('gameOver', 'gameOver.jpg');
		game.load.image('runTutorial', 'runTutorial.jpg');
		game.load.image('burntLab', 'burntLab.jpg');
		game.load.image('doctorOffice', 'doctorOffice.jpg');
		game.load.image('hrOffice', 'hrOffice.jpg');
		game.load.image('daughterRoom', 'daughterRoom.jpg');
		game.load.image('receptionFloor', 'Reception.jpg');
		game.load.image('morgueFloor', 'morgue.png');
		game.load.image('shadowsHallThree', 'shadowsHallThree.png');
		game.load.image('shadowsMorgue', 'shadowsMorgue.png');
		game.load.image('operatingRoom', 'operatingRoom.jpg');
		game.load.image('labRoom', 'labRoom.jpg');	
		game.load.image('labRoomBurnt', 'labRoomBurnt.jpg');	
		game.load.image('operatingRoomBurnt', 'operatingRoomBurnt.jpg');
		game.load.image('labRoomBurntPetronov', 'labRoomBurntPetronov.jpg');
		game.load.image('labRoomBurntCreepy', 'labRoomBurntCreepy.jpg');
		game.load.image('labRoomCreepy', 'labRoomCreepy.jpg');


		//title screen
		game.load.image('title', 'titleScreen.png');
		game.load.image('playButton', 'playButton.png');
		game.load.image('menuButton', 'menuButton.png');
		game.load.image('controlsScreen', 'Controls.png');

		// sprites
		game.load.image('box', 'box.png');
		game.load.atlas('atlas', 'patient.png', 'patient.json');
		game.load.atlas('atlas2', 'ducktor.png', 'ducktor.json');
		game.load.atlas('atlas3', 'lab ducktor.png', 'lab ducktor.json');
		game.load.atlas('elevatorAtlas', 'elevatorPanel.png', 'elevatorPanel.json');
		
		//Additional assests
		game.load.image('normalDoor', 'normalDoor.png');
		game.load.image('transitionDoor', 'door2.png');
		game.load.image('elevator', 'Elevator.png');
		game.load.image('darkDoor', 'door.png');
		game.load.image('medicalLocker', 'medicalLocker.png');
		game.load.image('stairs', 'Stairs.png');
		game.load.image('bigLight', 'bigLight.png');
		game.load.image('cabinet', 'filingCabinet.png');


		// key cards
		game.load.image('keyCard105', 'keyCard105.png');
		game.load.image('keyCard201', 'keyCard201.png');
		game.load.image('keyCard203', 'keyCard203.png');
		game.load.image('keyCard205', 'keyCard205.png');
		game.load.image('keyCard303', 'keyCard303.png');
		game.load.image('floor1ElevatorCode', 'floor1ElevatorCode.png');
		game.load.image('floor2ElevatorCode', 'floor2ElevatorCode.png');
		game.load.image('floor3ElevatorCode', 'floor3ElevatorCode.png');
		game.load.image('morgueElevatorCode', 'morgueElevatorCode.png');
		game.load.image('entranceFloorElevatorCode', 'entranceFloorElevatorCode.png');


		game.load.image('bookShelf', 'bookShelf.jpg');
		game.load.image('bed', 'hospitalBed.png');
		game.load.image('medBox', 'MedBox.png');
		game.load.image('labDoor', 'labDoor.png');
		game.load.image('blackScreen', 'black.png');
		game.load.image('desk', 'Desk.png');
		game.load.image('airVent', 'airVent.png');
		game.load.image('airVentPart', 'airVentPart.png');
		game.load.image('horizontalPipes', 'horizontalPipes.png');
		game.load.image('verticalPipes', 'verticalPipes.png');
		game.load.image('doubleDoor', 'doubleDoor.png');
		game.load.image('table', 'Table.png');
		game.load.image('interactableE', 'interactableE.png');
		game.load.image('burntLabDoor', 'burntLabDoor.png');
		game.load.image('exitDoor', 'exitDoor.jpg');
		game.load.image('pile1', 'pile1.png');
		game.load.image('pile2', 'pile-2.png');



		// file
		game.load.path = '../game/assets/img/Files/';
		game.load.image('stephanyFile', 'File 1 - Stephany.png');
		game.load.image('viktorFile', 'File 2 - Viktor.png');
		game.load.image('patientFile', 'File 3 - patientViktor.png');
		game.load.image('predecessorFile', 'File 4 - predecessor.png');


		// clues
		// Dr. Moretti
		game.load.path = '../game/assets/img/Clues/Doctor Clues_ Dr. Moretti/';
		game.load.image('complaint', 'complaint.png');
		game.load.image('news article', 'news article.png');
		game.load.image('random patient', 'random patient.png');
		game.load.image('speech bubble', 'speech bubble.png');
		game.load.image('welcome letter', 'welcome letter.png');
		// Viktor, Stephany
		game.load.path = '../game/assets/img/Clues/Player Clues_  Viktor Kreshnov, Stephany Kreshnov/';
		game.load.image('contract', 'contract.png');
		game.load.atlas('coughingDaughter', 'Daughter/cough.png', 'Daughter/cough.json');
		game.load.atlas('daughter', 'Daughter/daughter.png', 'Daughter/daughter.json');
		game.load.image('daughterInBed', 'daughterInBed.png');
		game.load.atlas('door animation', 'Door Animation/door animation.png', 'Door Animation/door animation.json');
		game.load.image('family portrait', 'family portrait.jpg');
		game.load.image('bills', 'bills.png');


		// creepy lab stuff
		game.load.image('headless body 1', 'headless body 1.png');
		game.load.image('healdess body 2', 'headless body 2.png');
		game.load.image('headless body 3', 'headless body 3.png');
		game.load.image('headless body 4', 'headless body 4.png');
		game.load.image('headless mouse 1', 'headless mouse 1.png');
		game.load.image('headless mouse 2', 'headless mouse 2.png');
		game.load.image('jar 1', 'jar 1.png');
		game.load.image('jar 2', 'jar 2.png');
		game.load.image('jar 3', 'jar 3.png');
		game.load.image('text message', 'text message.png');
		game.load.image('tool 1', 'tool 1.png');
		game.load.image('tool 2', 'tool 2.png');
		game.load.image('tool 3', 'tool 3.png');
		game.load.image('tool 4', 'tool 4.png');
		game.load.image('tool 5', 'tool 5.png');
		// Petronov (predecessor)
		game.load.path = '../game/assets/img/Clues/Predecessor Clues_  Petronov Rozhok/';
		game.load.image('2 news article', '2 news article.png'); // 19
		game.load.image('corpse tag', 'corpse tag.png');
		game.load.image('corpse', 'corpse.png');
		game.load.image('gas cans', 'gas cans.png');
		game.load.image('predecessorContract', 'predecessorContract.png');


		// notes
		game.load.path = '../game/assets/img/';
		game.load.image('newsArticle', 'newsArticle.png');
		game.load.image('medCabinet', 'medicalCabinet.jpg');
		game.load.image('wheelChair', 'wheelchair.png');
	


		// inventory
		game.load.image('entranceFloorElevatorCodeInventory', 'inventory/Entrance.png');
		game.load.image('floor1ElevatorCodeInventory', 'inventory/Floor 1.png');
		game.load.image('floor2ElevatorCodeInventory', 'inventory/Floor 2.png');
		game.load.image('floor3ElevatorCodeInventory', 'inventory/Floor 3.png');
		game.load.image('inventoryBackgroundInventory', 'inventory/inventory.png');
		game.load.image('morgueElevatorCodeInventory', 'inventory/Morgue.png');
		game.load.image('keyCard105Inventory', 'inventory/Room 105 Key Card.png');
		game.load.image('keyCard201Inventory', 'inventory/Room 201 Key Card.png');
		game.load.image('keyCard203Inventory', 'inventory/Room 203 Key Card.png');
		game.load.image('keyCard205Inventory', 'inventory/Room 205 Key Card.png');
		game.load.image('keyCard303Inventory', 'inventory/Room 303 Key Card.png');

		

		// load in level files
		game.load.path = '../game/data/';
		game.load.json('level0', 'Level0-StartRoom.json');
		game.load.json('level1', 'Level1-Hallway.json');
		game.load.json('level2', 'Level2-HallwayF2.json');
		game.load.json('level3', 'Level3-HallwayF1.json');
		game.load.json('labLevel', 'Level4-lab.json');
		game.load.json('endLevel', 'endLevel.json');
		game.load.json('room303', 'room303.json'); 
		game.load.json('room305', 'room305.json');
		game.load.json('doctorOffice', 'doctorOffice.json');
		game.load.json('room203', 'room203.json');
		game.load.json('room205', 'room205.json');
		game.load.json('room101', 'room101.json');
		game.load.json('room105', 'room105.json');
		game.load.json('room107', 'room107.json');
		game.load.json('burntLab', 'Level5-burntLab.json');
		game.load.json('receptionFloor', 'receptionFloor.json');
		game.load.json('morgueFloor', 'morgueFloor.json');
		game.load.json('labRoom', 'labRoom.json');
		game.load.json('labRoom2', 'labRoom2.json');
		game.load.json('labRoom3', 'labRoom3.json');
		game.load.json('labRoom4', 'labRoom4.json');
		game.load.json('labRoom5', 'labRoom5.json');
		game.load.json('labRoomBurnt', 'labRoomBurnt.json');
		game.load.json('labRoomBurnt2', 'labRoomBurnt2.json');
		game.load.json('labRoomBurnt3', 'labRoomBurnt3.json');
		game.load.json('labRoomBurnt4', 'labRoomBurnt4.json');
		game.load.json('labRoomBurnt5', 'labRoomBurnt5.json');
		game.load.json('labRoomBurnt6', 'labRoomBurnt6.json');
		game.load.json('labRoomBurnt7', 'labRoomBurnt7.json');
		game.load.json('labRoomBurnt8', 'labRoomBurnt8.json');

		// sound
		game.load.path = '../game/assets/audio/';
		game.load.audio('hospitalMusic', 'hospitalMusic.mp3');
		game.load.audio('indoorFootsteps', 'indoorFootsteps.mp3');
		game.load.audio('doorOpenClose', 'doorOpenClose.mp3');
		game.load.audio('doorLocked', 'doorLocked.mp3');
		game.load.audio('buttonPress', 'buttonPress.mp3');
		game.load.audio('boxSliding', 'boxSliding.mp3');
		game.load.audio('monsterAware', 'monsterAware.mp3');
		game.load.audio('monsterFootstep', 'monsterFootstep.mp3');
		game.load.audio('pageTurn', 'pageTurn.mp3');
		game.load.audio('itemGrab', 'itemGrab.mp3');


	},
	create: function(){
		console.log('Load: create');
		game.physics.startSystem(Phaser.Physics.ARCADE); //can change physics system if needed
		game.state.start('menu'); //move to next state after preload is finished
	}
};
