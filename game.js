enchant();

window.onload = function() {
	
	//game = new Game(screen.width/2, screen.height/2.25); // Game rendering view
	let w = screen.width;
	let h = screen.height;
	let wP = (1.8*h<w)? 1.8 * (w-1.8*h):0;
	let hP = 0;
	//wP = 140; 
	//wP = 0;
	game = new Game(720 + wP, 400+hP); // Game rendering view
	  console.log(wP);
   console.log(screen.width/2+","+ screen.height/2.25);
	var mTam = 30;
	var expon = 0;
	var ecu = 4; // suma, resta, division, multiplicacion
	var res = 2; // mayor , menor
	var cantEx = mTam/2;
	var cantRes = 10;
	var congrText = ["¡Bien Hecho!","Excelente","Eres Genial!","Increible","Asombroso"];
	
	
	
	var mapColl = [];
	var mapTiles = [];
	var mapWallOrSimb = [];
	var mapNum = [];
	var mapExp = [];
	var mapTiles= [];


    game.fps = 15;
    game.preload('map.png','slims.png', 'btns.png', "hist.png");
    game.onload = function() {
		
		/////////////GUI///////////
		
		var pad = new Pad();
        pad.x = 20;
        pad.y = 280;
		pad.scaleX = 0;
		pad.scaleY = 1.5;
		var powerText = new MutableText(20, 20, 400);
		powerText.text= "Poder:1";
		
		var hintText = new MutableText(350, 10, 500);
		hintText.text= "";
		hintText.scaleX = hintText.scaleY = 0.7;
		
		var messageText = new MutableText(200, 230, 400);
		messageText.text= "";
		messageText.dur = 0;
		messageText.on("enterframe", function() {
			if((this.dur <= 0) && (this.text != "")){
				this.dur = 80
			}else{
				if (this.dur == 1){
					this.text = "";
					this.dur = 0;
				}else{
					(this.dur>0)?this.dur--:"";
				}
			}
            
        });
		
		
		
		var activesLabel = new ActivesLabel(320, 365);
	
		var labels = new Group();
		labels.addChild(activesLabel);
		labels.addChild(messageText);
		labels.addChild(powerText);
		labels.addChild(hintText);
		labels.addChild(pad);
		labels.scaleX = 0;
		
		

		var ExText = new MutableText(40, 60, 400);
		ExText.text= "EXPONENTE:";	
		var bE0 = new ButtonLabel (360, 60, "0");
		bE0.active = true;
		bE0.addEventListener("touchstart", function(){ 
			bE0.active = true;
			bE1.active = bE2.active = bE3.active = bE4.active = false;	
			expon = 0;
		
		});
		var bE1 = new ButtonLabel (400, 60, "1");
		bE1.addEventListener("touchstart", function(){ 
			bE0.active = false;
			bE1.active = true;	
			bE2.active = bE3.active = bE4.active = false;	
			expon = 1;
		
		});		
		var bE2 = new ButtonLabel (440, 60, "2");
		bE2.addEventListener("touchstart", function(){ 
			bE0.active = bE1.active = false;	
			bE2.active = true;	
			bE3.active = bE4.active = false;	
			expon = 2;
		
		});		
		var bE3 = new ButtonLabel (480, 60, "3");
		bE3.addEventListener("touchstart", function(){ 
			bE0.active = bE1.active = bE2.active = false;
			bE3.active = true;	
			bE4.active = false;	
			expon = 3;
		
		});		
		var bE4 = new ButtonLabel (520, 60, "4");
		bE4.addEventListener("touchstart", function(){ 
			bE0.active = bE1.active = bE2.active = 	bE3.active = false;	
			bE4.active = true;	
			expon = 4;
		
		});		

		var EcText = new MutableText(40, 100, 400);
		EcText.text= "OPERACION:";	
		var bMas = new ButtonLabel (360, 100, "+");
		bMas.active = true;
		bMas.addEventListener("touchstart", function(){ 
			bMas.active = true;
			bMen.active = bMul.active = bDiv.active = false;	
			ecu = 1;
			bMayor.active = true;
			bMenor.active = false;	
			res = 1;
			
			
		});		
		var bMen = new ButtonLabel (400, 100, "-");
		bMen.addEventListener("touchstart", function(){ 
			bMas.active = bMen.active = true;	
			bMul.active = bDiv.active = false;	
			ecu = 2;
		});				
		var bMul = new ButtonLabel (440, 100, "X");
		bMul.addEventListener("touchstart", function(){ 
			bMas.active = bMen.active =	bMul.active = true;	
			bDiv.active = false;	
			ecu = 3;
		});				
		var bDiv = new ButtonLabel (480, 100, "/");
		bDiv.addEventListener("touchstart", function(){ 
			bMas.active = bMen.active = bMul.active = bDiv.active = true;	
			ecu = 4;
		});				
		bMas.active = bMen.active = bMul.active = bDiv.active = true;	
		var ReText = new MutableText(40, 140, 400);
		ReText.text= "RESULTADO:";	
		var bMayor = new ButtonLabel (360, 140, ">");
		bMayor.addEventListener("touchstart", function(){ 
		
			bMayor.active = true;
			bMenor.active = false;	
			res = 1;
			
		});		
		var bMenor = new ButtonLabel (400, 140, "<");
		
		bMayor.active = bMenor.active = true;	
		bMenor.addEventListener("touchstart", function(){ 
			if (ecu > 1) {
				bMayor.active = bMenor.active = true;	
				res = 2;
			}
			
		});		
		var bC3 = new ButtonLabel (480, 140, "3");
		bC3.addEventListener("touchstart", function(){ 
			bC3.active =  true;	
			bC5.active = bC10.active =  false;	
			cantRes = 3;
			activesLabel.maxBtns = cantRes;
			
		});	
		var bC5 = new ButtonLabel (520, 140, "5");	
		bC5.addEventListener("touchstart", function(){ 
			bC3.active = bC10.active =  false;	
			bC5.active =  true;	
			cantRes = 5;
			activesLabel.maxBtns = cantRes;
			
		});	
		var bC10 = new ButtonLabel (560, 140, "10");
		bC10.active =  true;			
		bC10.addEventListener("touchstart", function(){ 
			bC3.active = bC5.active =  false;	
			bC10.active =  true;	
			cantRes = 10;
			activesLabel.maxBtns = cantRes;
			
		});	
		
			

		var buttonHow = new ButtonLabel (60, 340, "COMO JUGAR");
		buttonHow.scaleX = 0.5;
		buttonHow.scaleY = 0.5;
		buttonHow.addEventListener("touchstart", function(){
			hist.frame = 2;
			buttonHow.active = true;
			buttonCred.active = false;
        });
		
		var buttonCred = new ButtonLabel (60, 360, "CREDITOS");
		buttonCred.scaleX = 0.625;
		buttonCred.scaleY = 0.5;
		buttonCred.addEventListener("touchstart", function(){
			hist.frame = 3;
			buttonCred.active = true;
			buttonHow.active = false;
        });

		var buttonStart = new ButtonLabel (260, 340, "INICIAR");
		buttonStart.scaleX = 0.8;
		buttonStart.addEventListener("touchstart", function(){
            MapCreate();
			buttons.scaleX = 0;
			labels.scaleX = 1;
			player.scaleX = 1;
        });
		
		var buttonPad = new ButtonLabel (600, 340, "V-PAD");
		buttonPad.scaleX = 0.5;
		buttonPad.addEventListener("touchstart", function(){
			this.active = !this.active;
			(pad.scaleX == 0)? pad.scaleX = 1.5: pad.scaleX = 0;

        });
		

		
		
		var hist = new Sprite(608, 152);
        hist.x = 64;
        hist.y = 180;
        hist.image = game.assets['hist.png'];
		hist.frame = 0;
		
		var buttons = new Group();
		buttons.x = buttons.x + wP;
		
		buttons.addChild(ExText);
		buttons.addChild(bE0);
		
		buttons.addChild(bE1);
		buttons.addChild(bE2);
		buttons.addChild(bE3); 
		buttons.addChild(bE4);
        
		buttons.addChild(EcText);
		buttons.addChild(bMas);
		buttons.addChild(bMen);
		buttons.addChild(bMul); 
		buttons.addChild(bDiv);
		
		buttons.addChild(ReText);
		buttons.addChild(bMayor); 
		buttons.addChild(bMenor);
		buttons.addChild(bC3);
		buttons.addChild(bC5); 
		buttons.addChild(bC10);
		buttons.addChild(hist);
		buttons.addChild(buttonHow);
		buttons.addChild(buttonStart);
		buttons.addChild(buttonCred);
		buttons.addChild(buttonPad);
		
        ///stage.addChild(player);
		
		
		////////////////MAP///////////
		
		var map = new Map(32, 32);
		WindCreate();
		function WindCreate(){
			map.image = game.assets['font0.png'];
			let wArr = [];
			for (var i = 0; i <= 12; i++) {
				wArr[i] = [];
				for (var j = 0; j <= 22; j++) {
					if ((i == 0)||(i == 12)||(j == 0)||(j == 22)){
						wArr[i][j] = 120;
					}else if(i == 1){
						wArr[i][j] = 108;
					}else if(i == 11){
						wArr[i][j] = 124;	
					}else if(j == 1){
						wArr[i][j] = 109;
					}else if(j == 21){
						wArr[i][j] = 110;
					}else{
						wArr[i][j] = 121;
					}	
				}	
			}
			wArr[1][1] = 106;
			wArr[1][21] = 107;
			wArr[11][1] = 122;
			wArr[11][21] = 123;
			map.loadData(wArr);		
		}
		
		
		
		function MapCreate(){
			let cantExAux = cantEx;
			let cantResAux = cantRes;
			
			 map.image = game.assets['map.png'];
			
			for (var i = 0; i <= mTam; i++) {
				mapColl[i] = [];
				for (var j = 0; j <= mTam; j++) {
					mapColl[i][j] = 1;
				}	
			}
			
			c = 0;
			d = 0;
			for (var i = 1; i < mTam; i+= 2) {
				d = mTam/Rand(2, mTam/4);
				c = 0;
				for (var j = 1; j < mTam; j++) {
					if ((c > d)&&(mapColl[i-1][j] != 0)) {
						c = 0;
						mapColl[i][j] = 1;
						if (mTam != i+1){
							jmax = Math.min(mTam-1, j + Rand(5,1));
							jmin = Math.max(1, j - Rand(5,1));
							mapColl[i+1][jmin]=0;
							mapColl[i+1][jmax]=0;
						}
					}else{
						mapColl[i][j] = 0;
						c++;
					}
				}
				if (mTam != i+1){
					mapColl[i+1][Rand(5,1)]=0;
					mapColl[i+1][mTam - Rand(5,1)]=0;	
					mapColl[i+1][mTam/2 - Rand(5,1)]=0;
				}		
			}
				
			for (var i = 0; i <= mTam; i++) {
				mapTiles[i] = [];
				mapWallOrSimb[i] = [];
				mapExp[i] = []
				mapNum[i] = [];
				mapWallOrSimb[i] = [];
				for (var j = 0; j <= mTam; j++) {
					if (i < mTam/2){
						(j<mTam/2)?mapTiles[i][j] = 15:mapTiles[i][j] = 11;
					}else{
						(j>mTam/2)?mapTiles[i][j] = 7:mapTiles[i][j] = 3;
					}

					if (mapColl[i][j] == 1){
						mapWallOrSimb[i][j] = Rand(mapTiles[i][j],mapTiles[i][j]-3);
					}else{
						mapWallOrSimb[i][j] = -1;
					}
					mapExp[i][j] = -1;
					mapNum[i][j] = -1;	
				}
			}
			

			while ((cantExAux > 0) || (cantResAux > 0)){
				x = Rand(0,mTam);
				y = Rand(0,mTam);
				simb =  0; 
				if ((cantExAux > 0) &&(mapColl[x][y] == 0)&& (mapNum[x][y] == -1)){
					simb = Rand(1,ecu+1);
					if (simb >= 3){ 
						mapNum[x][y] = Rand(2,10) + 25;;
					}else{
						mapNum[x][y] = Rand(2,10) + 25;
						(expon > 0)?mapExp[x][y] = expon + 34:""; 
					}
					mapWallOrSimb[x][y] = simb + 15;
					cantExAux--
				}
				if ((cantResAux > 0) && (mapColl[x][y] == 0) && (mapNum[x][y] == -1)){
					simb = Rand(5,5+res);
					mapWallOrSimb[x][y] =  simb == 5? 20:22;
					mapNum[x][y] = Rand(1,10) + 25;
					mapExp[x][y] = expon + 35; 
					cantResAux--
				 }
				
			}
			map.loadData(mapTiles,mapWallOrSimb,mapNum,mapExp);
			map.collisionData = mapColl;
		}
		
		function Rand(min, max) {
			return Math.floor(Math.random() * (max - min)) + min;
		}	
		
		
		
		//liberadito
		var free = enchant.Class.create(enchant.Sprite, {
			initialize: function () {
			let slim = activesLabel.lastActiveBtn + 1;
			enchant.Sprite.call(this, 32, 32);
			this.image = game.assets['slims.png'];
            this.x = player.x ;
            this.y = player.y ;
			this.ScaleX = 0.5;
			this.ScaleY = 0.5;
			if (Rand(0, 2) == 1){
				this.moveSpeed = -10;
				this.frame = [3+(12 * slim),4+(12 * slim),5+(12 * slim)];
			}else{
				this.moveSpeed = 10;
				this.frame = [0+(12 * slim),1+(12 * slim),2+(12 * slim)];
			}
			
			this.addEventListener('enterframe', function () {
					this.x += this.moveSpeed;
					if((this.x >  player.x + 200 ) || (this.x <  player.x - 200 )){
						this.remove();
					}
				});
				stage.addChild(this);
			},
			remove: function () {
				stage.removeChild(this);
				delete this;
			}
		});
		
		
		
		//  map.loadData(mapTiles,mapWallOrSimb,mapNum,mapExp);
		//	map.collisionData = mapColl;

        var player = new Sprite(32, 32);
        player.scaleX = 0;
		player.x = 32;
        player.y = 32;
        player.image = game.assets['slims.png'];

        player.isMoving = false;
        player.direction = 0;
        player.vel = 2;
		player.pow = 1;
		player.powCold = 100;
		player.actTilePow = 0;
        player.addEventListener('enterframe', function() {
			
			   this.vx = this.vy = 0;
                if (game.input.left) {
					this.frame = [3,4,5];
                    this.vx = -4 * this.vel;
                } else if (game.input.right) {
                    this.frame = [0,1,2];
                    this.vx = 4 * this.vel;
                } else if (game.input.up) {
                    this.frame = [6,7,8];
                    this.vy = -4 * this.vel;
                } else if (game.input.down) {
                    this.frame = [9,10,11];
                    this.vy = 4 * this.vel;
                }else{
					 this.frame = [11];
				}
			
			    if (this.vx || this.vy) {
                    var x = this.x + (this.vx ? this.vx / Math.abs(this.vx) * 16 : 0) + 16;
                    var y = this.y + (this.vy ? this.vy / Math.abs(this.vy) * 16 : 0) + 16;
                    if (0 <= x && x < map.width && 0 <= y && y < map.height && !map.hitTest(x, y)) {
                        this.isMoving = true;
						var i = map.checkIJTile(x,y)[0];
						var j = map.checkIJTile(x,y)[1];
						if (mapWallOrSimb[i][j] != this.actTilePow){
							var num = (mapExp[i][j] != -1)? (mapNum[i][j] - 25) * 10**(mapExp[i][j] - 34):  (mapNum[i][j] - 25);
							
							(num >= 0)? hintText.text =  MathSimbolName(mapWallOrSimb[i][j]) + num :  hintText.text = "";
							this.pow = MathCalc(this.pow,mapWallOrSimb[i][j],num);
							this.actTilePow = mapWallOrSimb[i][j]; 
							powerText.text = "Poder:"+this.pow;
							if (ResCalc(this.pow,mapWallOrSimb[i][j],num)){
								messageText.text = congrText[Rand(0,congrText.length)];
								mapWallOrSimb[i][j] = mapNum[i][j] = mapExp[i][j] = -1;
								map.loadData(mapTiles,mapWallOrSimb,mapNum,mapExp);
								var goties = free();
								++activesLabel.actives;
								console.log(cantRes - 1 +">"+activesLabel.actives);
								if (cantRes  == activesLabel.actives){
									WindCreate();
									buttons.scaleX = 1;
									labels.scaleX = 0;
									player.scaleX = 0;
									hist.frame = 1;
									activesLabel.actives = 0;
									this.pow = 1;
									console.log("ganaste");
															 
								}
								
								
							}
												
						}
                    }
                }
				if (this.isMoving) {
					this.moveBy(this.vx, this.vy);
					if ((this.vx && (this.x-8) % 8 == 0) || (this.vy && this.y % 8 == 0)) {
						this.isMoving = false;
						
					}
				}
			
        });
		
		
		function MathSimbolName(simb){
			if (simb == 16){
				return "Suma: ";
			}else if (simb == 17){
				return "Resta: ";
			}else if (simb == 18){
				return "Multiplica: ";
			}else if (simb == 19){
				return "Divide: ";							
			}else if (simb == 20){
				return "Mayor a ";	
			}else if (simb == 22){
				return "Menor a ";	
			}else{
				return "";
			}
		}
		
		function MathCalc(act,simb,number){
			let res = act;
			if (simb == 16){
				res = act + number;
			}else if (simb == 17){
				res = act - number;
			}else if (simb == 18){
				res = act * number;
			}else if (simb == 19){
				res = act / number;								
			}
			//console.log(Math.floor(Math.min(10**(expon+1), Math.max(res,1))));
			return  Math.floor(Math.min(10**(expon+3), Math.max(res,1)));
					
		}
		
		function ResCalc(act,simb,number){
			
			if (simb == 20){
				return  act > number;
			}else if (simb == 22){
				return  act < number;
			}else{
				return false;
			}
		}

        var stage = new Group();

        stage.addChild(map);
        stage.addChild(player);	

        game.rootScene.addChild(stage);
	    game.rootScene.addChild(labels);
		game.rootScene.addChild(buttons);
		game.rootScene.backgroundColor = 'rgb(182, 255, 255)';
		
        game.rootScene.addEventListener('enterframe', function(e) {
            var x = Math.min((game.width  - 16) / 2 - player.x, 0);
            var y = Math.min((game.height - 16) / 2 - player.y, 0);
            x = Math.max(game.width,  x + map.width)  - map.width;
            y = Math.max(game.height, y + map.height) - map.height;
            stage.x = x;
            stage.y = y;
        });
    };
    game.start();
};
