var wnd = window;
var doc = wnd.document;

wnd.requestAnimFrame = (function(){ //polyfill
      return  wnd.requestAnimationFrame  || wnd.webkitRequestAnimationFrame || wnd.mozRequestAnimationFrame || wnd.oRequestAnimationFrame || wnd.msRequestAnimationFrame || function(callback, /* DOM Element */ element){ wnd.setTimeout(callback, 1000 / 60); };
    })();
    
Math.seed = 42; //seed system
Math.rcount = 0; //debug var
Math.rand = function(min,max) { //from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
  min = min || 0;
  max = max || 1;
  Math.seed =  (Math.seed * 9301 + 49297) % 233280; 
  Math.rcount++;
  return min + (Math.seed / 233280) * (max-min);
}
    
function rgb(clr) { //array clr
  if(!(clr instanceof Array)) { return "rgb(0,0,0)"; }
  var tclr = clr.slice();
  if(Game.ItemActive==4) { 
    switch(Math.round(new Date().getTime()/93.75)%7) {
      case 0:
        tclr[0]=255-clr[0]; tclr[1]=225-clr[1]; tclr[2]=255-clr[2];
        break;
      case 1:
        tclr[0]=clr[1]; tclr[1]=clr[2]; tclr[2]=clr[0];
        break;
      case 2:
        tclr[0]=Math.max(clr[0],128); tclr[1]=Math.max(clr[1],128); tclr[2]=Math.max(clr[2],128);
        break;
      case 3:
        tclr[0]=clr[2]; tclr[1]=clr[0]; tclr[2]=clr[1];
        break;
      case 4:
        var mci=Math.floor((clr[0]+clr[1]+clr[2])/3);
        tclr[0]=mci; tclr[1]=mci; tclr[2]=mci;
        break;
      case 5:
        tclr[0]=Math.round((255-clr[0])/255)*255; tclr[1]=Math.round((255-clr[1])/255)*255; tclr[2]=Math.round((255-clr[2])/255)*255;
        break;
      case 6:
        tclr = clr;
    }   
  }
  if(Game.ItemActive==6) { var mci=Math.min(Math.round(Math.floor((clr[0]+clr[1]+clr[2])/3)/100)*255,255);tclr[0]=mci; tclr[1]=mci; tclr[2]=mci; }
  return "rgb"+((clr.length==4)?"a":"")+"("+tclr.join(",")+")";
}
    
wnd.isTouchDevice = 'ontouchstart' in window;
var downEvent = isTouchDevice ? 'touchstart' : 'mousedown',
    upEvent = isTouchDevice ? 'touchend' : 'mouseup',
    clickEvent = isTouchDevice ? 'touchend' : 'click';
    
var html5logo = "data:image/jpeg;base64,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";
     
    
wnd.onload = function() {
  wnd.canvas = doc.createElement("canvas");
  wnd.canvas.width = wnd.innerWidth; 
  wnd.canvas.height = wnd.innerHeight;
  doc.body.innerHTML = "";
  doc.body.appendChild(canvas);
  var menudom = doc.createElement("div");
  menudom.setAttribute("id","menu");
  menudom.setAttribute("style","display: none;");
  var pausebtn = doc.createElement("div");
  pausebtn.setAttribute("id","pause");
  pausebtn.setAttribute("class","");
  var mainmenubtn = doc.createElement("div");
  mainmenubtn.setAttribute("id","bmenu");
  mainmenubtn.setAttribute("class","");
  var mutebtn = doc.createElement("div");
  mutebtn.setAttribute("id","mute");
  mutebtn.setAttribute("class","");
  doc.body.appendChild(menudom);
  doc.body.appendChild(pausebtn);
  doc.body.appendChild(mainmenubtn);
  doc.body.appendChild(mutebtn);  
  
  wnd.Game = {
    Speed: 40, // [x% /second]
    StartHeight: 90, // [y%]
    EndHeight: 18, // [y%]
    BlockSize: 10, // [y%]
    BlockHit: true,
    ItemSize: 14, // radius -> 7
    SectorInterval: 500, //[y%]
    Position: 0, // [x%]
    PosTimestamp: null,
    justStarted: true,
    BonusPoints: 0,
    GameTime: 0,
    GTTS: null,
    Countdown: 3,
    ItemActive: 0,
    ItemEndTS: 0,
    ItemDuration: 1,
    CamYPos: 0,
    Highscore: 2000, // Player.Points
    Online: false,
    newHS: false,
    firstGame: true,
    clickLimit: null,
    Frames: 0,
    LoadedData: 0,
    inGame: false,
    Item5HelpVar: null,
    Item5HelpBar2: 0,
    GameMode: 0,
    
    
    PauseButton: pausebtn,
    
    PlayerObj: function(n, c) {
      this.Name = n;
      this.Color = c;
      this.Points = 0;
      this.yPos = 0;
      this.yVelocity = 0;
      this.yVChIntval = null;
      this.goingUp = false;
      this.Tail = [[20,0],[0,0]]; // y pos data
      this.updateTail = function(atx, nyp) {
        for(var uti=0; uti<this.Tail.length; uti++) {
          this.Tail[uti][0] -= atx;
          if(this.Tail[uti][0] < 0) { this.Tail.splice(uti+1, (this.Tail.length-uti-1)); break; }
        }
        if(Game.Frames%3==0 || (Game.ItemActive==6)) { this.Tail.unshift([20,nyp]); }
      };
      this.Clicks = 0;
      this.clear = function() { };
    },
    
    Player: new Array(),
    
    Map: {
      Data: new Array(),
      BonusData: new Array(),
      Seed: AP_Settings.DailyMapSeed,
      Step: 0,
      lastyPos: 0,
      lastlength: 60,
      lastBPA: 0,
      XwithoutBlock: 0,
      XwithoutItem: 0,
      xOffset: 0,
      TotalLength: 0,
      Sector: 0,
      Color: [26,255,0],
      BlockColor: [34,177,76,1],
      MBlckColor: [255,155,0,1],
      BGColor: [0,0,0,1],
      
      Reset: function() {
        Game.Map.Data = new Array();
        Game.Map.BonusData = new Array();
        Game.Map.Seed = Math.floor(Math.random()*4200);
        Game.Map.xOffset = 0;
        Game.Map.Step = 0;
        Game.Map.lastyPos = 0;
        Game.Map.lastlength = 60;
        Game.Map.lastBPA = 0;
        Game.Map.XwithoutBlock = 0;
        Game.Map.XwithoutItem = 0;
        Game.Map.Color = [26,255,0];
        Game.Map.BGColor = [0,0,0,1];
        Game.Map.Sector = 0;
        Game.Map.TotalLength = 0;
        if(Game.clickLimit!==null) { Game.Map.Seed = AP_Settings.DailyMapSeed; }
        Math.seed = Game.Map.Seed;
        for(var hi=0; hi<10; hi++) { Game.Map.AddMapData(); }
        Math.seed = Game.Map.Seed;
        Game.Map.Data.unshift([60, 0, 90, null, 0]); //length, y pos, height
        Game.Map.Data.unshift([80, 0, 90, null, 0]);
        /*Game.Map.Data.unshift([5, 0, 90, null, 0]);
        Game.Map.Data.unshift([5, 0, 80, null, 0]);
        Game.Map.Data.unshift([6, 0, 50, null, 0]);
        Game.Map.Data.unshift([4, 0, 10, null, 0]);*/
        Game.Map.TotalLength += 140;      
      },
      
      AddMapData: function() {
        var plen = Math.floor(Math.rand(2,80)+1), // +1 for floor
            tph = Math.max((Game.StartHeight - Math.round(Game.Map.Step*0.5)), Game.EndHeight),
            ych = Game.Map.lastlength;
        if((Game.Map.Step%2)==1) { ych = ych * -1; }
        
        var amdb = Math.floor(Math.rand(0,2)+1)-1,
            blckt = 0; //type
        if(Game.Position < 2500) { amdb = amdb*0.5; }
        if(Game.Position > 4000) { amdb = 1 - (2*Math.round(Math.rand())); }
        if(Game.Position < 4500 && Math.rand()>0.5) { blckt=1; }
        else { if(Game.Position > 5000 && Math.rand()>0.9) { blckt=1; } }
        
        if(Game.GameMode!=2) {
					if(Game.Map.XwithoutItem > 600 && Game.ItemActive==0) { if(Game.Map.XwithoutBlock > 30 && Game.Map.XwithoutBlock < 120) { amdb = amdb*0.4; blckt = 2; Game.Map.XwithoutItem = 0; }}
					else { Game.Map.XwithoutItem += plen; }
				}
				
        if(Game.Map.XwithoutBlock > 120 || blckt==2) { Game.Map.XwithoutBlock = 0;/*dont change amdb*/ }
        else { Game.Map.XwithoutBlock += plen; amdb = null; } 
        
        Game.Map.Data.push([plen, (Game.Map.lastyPos+ych), tph, amdb, blckt]);
        Game.Map.lastyPos += ych;
        Game.Map.lastlength = plen;
        Game.Map.TotalLength += plen;
        Game.Map.Step++;
      },
      
      CheckBPArray: function() {
        for(var cbpi=0; cbpi<Game.Map.BonusData.length; cbpi++) {
          if(Game.Map.BonusData[cbpi][1]<(Game.Position-20)) {
            Game.Map.BonusData.splice(cbpi,1);
          }
        }
      }
    },
    
    AddBonusPoints: function(abp, psx, byp) {
      if((Game.GameTime-Game.Map.lastBPA)<500) {return false;}
      Game.BonusPoints += abp;
      Game.Map.BonusData.push([abp, Game.Position+psx+10, byp, Game.GameTime]); //[points, xpos, ypos, stime]
      Game.Map.lastBPA = Game.GameTime;
    },
    
    RenderCache: {
      CountdownBG: null, //3 - 2 - 1 -
      Sector: null, //500,1000,...
      Item: null,
    },
    
    Audio: {
      muted: false,    
      Music: {
        Main: new Audio(),
        MainDrunk: new Audio(),
        MainParty: new Audio(),
        Menu: new Audio()
      },
      FX: {
        EdgeClose: new Audio(),
        Highscore: new Audio(),
        DrunkStart: new Audio(),
        SlowDown: new Audio(),
        SpeedUp: new Audio(),
        GameEnd: new Audio(),
        DJ: new Audio()
      },
      muteAll: function() {
        Game.Audio.muted = !Game.Audio.muted;
        Object.keys(Game.Audio.Music).forEach(function(ael){Game.Audio.Music[ael].muted=Game.Audio.muted});
        Object.keys(Game.Audio.FX).forEach(function(ael){Game.Audio.FX[ael].muted=Game.Audio.muted});
        if(Game.Audio.MuteButton.className == ("show m"+(!Game.Audio.muted).toString())) { Game.Audio.MuteButton.setAttribute("class", "show m"+Game.Audio.muted.toString()); }
      },
      MuteButton: mutebtn
    },
    
    Collision: function(pyp, pxoff) { 
      var xpos = Game.Map.xOffset * -1;
      for(var cdi=0; cdi<Game.Map.Data.length; cdi++) {
        xpos += Game.Map.Data[cdi][0];
        if(xpos > pxoff) {  break; }
      }
      
      var ratio = (xpos-pxoff) / Game.Map.Data[cdi][0];
      var hap = (Game.Map.Data[cdi][1] * ratio) + (Game.Map.Data[cdi+1][1] * (1-ratio));
      var sap = (Game.Map.Data[cdi][2] * ratio) + (Game.Map.Data[cdi+1][2] * (1-ratio));
      
      var blck = false, 
        blckx = Game.Map.xOffset * -1, 
        blcky = 0,
        yfactor = 0,
        whratio = wnd.canvas.height/wnd.canvas.width;
        
      for(var bci=0; bci<Game.Map.Data.length; bci++) {
        if(Game.Map.Data[bci][3]!=null) {
          yfactor = (Game.Map.Data[bci][4]==1) ? (Math.asin(Math.cos(Game.GameTime/500))*0.63) : Game.Map.Data[bci][3];
          blcky = Game.Map.Data[bci][1] - (Game.Map.Data[bci][2]*0.5*yfactor);
          if(Math.abs(blcky-pyp) <= (Game.BlockSize*0.5)) { 
            if(Math.abs(pxoff-blckx) <= (Game.BlockSize*0.5*whratio)) {
              if(Game.Map.Data[bci][4]==2) { //Item
                Game.ItemActivate();
              }
              else { 
                if(Game.BlockHit) {return true;}
                else if(Game.ItemActive==5) { Game.AddBonusPoints(42, pxoff, pyp); }
              }
            }
          }
        }
        blckx += Game.Map.Data[bci][0];
        if(blckx > 100) { break; }
      }
      Game.Item5HelpVar = hap;
      
      if(Math.abs(hap-pyp) >= sap*0.5) { //wall crash
				Game.Item5HelpVar2 = 5;
				return true;
			} 
      else {
        if(Math.abs(hap-pyp) > ((sap*0.5)-2) && Game.Position > 200 && Game.ItemActive!=6) { Game.AddBonusPoints((Game.BlockHit ? 15:1), pxoff, pyp); } //old: 10:33
      }
      
      return false;
    },
    
    RenderSector: function(spos) {
      Game.RenderCache.Sector = doc.createElement("canvas");
      var rcsfs = Math.round(20*wnd.canvas.height*0.01);
      Game.RenderCache.Sector.width = spos.toString().length * rcsfs * 0.8;
      Game.RenderCache.Sector.height = rcsfs * 1.1;
      var rcsctx = Game.RenderCache.Sector.getContext("2d");
      rcsctx.font = rcsfs+"px Arial";
      rcsctx.textAlign = "left";
      rcsctx.fillStyle = "rgba(0, 101, 255, 0.33)";
      rcsctx.fillText(spos, 0, rcsfs*0.8);
    },
    
    RenderItem: function() {
      Game.RenderCache.Item = doc.createElement("canvas");
      var rcifs = Math.round(11*wnd.canvas.height*0.01);
      Game.RenderCache.Item.width = Game.ItemSize * wnd.canvas.height * 0.01;
      Game.RenderCache.Item.height = Game.ItemSize * wnd.canvas.height * 0.01;
      var rcictx = Game.RenderCache.Item.getContext("2d");
      rcictx.beginPath();
      rcictx.fillStyle = rgb([255,0,255]); //"rgb(255,0,255)";
      rcictx.arc(Game.ItemSize*wnd.canvas.height*0.005, Game.ItemSize*wnd.canvas.height*0.005, Game.ItemSize*wnd.canvas.height*0.005, 0,2*Math.PI);
      rcictx.fill();
      rcictx.closePath();
      rcictx.fillStyle = rgb([255,255,255]); //"rgb(255,255,255)";
      rcictx.font = "bold "+rcifs+"px Arial";
      rcictx.textAlign = "center";
      rcictx.fillText("?", 0.5*Game.ItemSize*wnd.canvas.height*0.01, ((0.5*Game.ItemSize)+3.96)*wnd.canvas.height*0.01);
    },
    
    RenderCompMark: function(cvsctx, wph, hph) {
			//AP_COMP_DATA = [ [666, "Tim", "255,0,0"], [1250, "Jannek", "255,0,0"] ];
			AP_COMP_DATA = [];
			if(AP_COMP_DATA !== undefined && (AP_COMP_DATA instanceof Array)) {
				for(var cmi=0; cmi<AP_COMP_DATA.length; cmi++) {
					/*
					* AP_COMP_DATA = [ [distance, name, color], ... ]
					*/
					if((Game.Position > AP_COMP_DATA[cmi][0]-100) && (Game.Position < AP_COMP_DATA[cmi][0]+30)) {
						cvsctx.lineWidth = Math.round(wph);
						cvsctx.strokeStyle = rgb([255,0,0, 0.33]); //"rgba(0, 101, 255, 0.33)";
						
						cvsctx.beginPath();
						cvsctx.moveTo((AP_COMP_DATA[cmi][0] - Game.Position) * wph, 0);
						cvsctx.lineTo((AP_COMP_DATA[cmi][0] - Game.Position) * wph, 100*hph);
						cvsctx.closePath();
						cvsctx.stroke();
						
						var rcsfs = Math.round(20*wnd.canvas.height*0.01);
						cvsctx.font = rcsfs+"px Arial";
						cvsctx.textAlign = "left";
						cvsctx.fillStyle = "rgba(255, 0, 0, 0.33)";
						cvsctx.fillText(AP_COMP_DATA[cmi][1], (AP_COMP_DATA[cmi][0] - Game.Position + 5) * wph, 47*hph);
						
						var rcsfs = Math.round(12*wnd.canvas.height*0.01);
						cvsctx.font = rcsfs+"px Arial";
						cvsctx.textAlign = "left";
						cvsctx.fillStyle = "rgba(255, 0, 0, 0.33)";
						cvsctx.fillText(AP_COMP_DATA[cmi][0], (AP_COMP_DATA[cmi][0] - Game.Position + 6) * wph, 60*hph);
					}
				}
			}
    },
    
    RenderFrame: function(yOff,rplt) { //yoffset, render player + tail
      var FrameData = Game.Map.Data;
      var mcan = wnd.canvas;
      var mctx = mcan.getContext("2d");
        mctx.fillStyle = rgb(Game.Map.BGColor);
        mctx.beginPath();
        mctx.rect(0, 0, wnd.canvas.width, wnd.canvas.height);
        mctx.closePath();
        mctx.fill();
        
      var wph = wnd.canvas.width/100,
          hph = wnd.canvas.height/100,
          whratio = hph/wph,
          xpos, ypos;
          
      //BG (sector):
      if(Game.Position>=(Game.Map.Sector+Game.SectorInterval-100)) { 
        mctx.lineWidth = Math.round(wph);
        mctx.strokeStyle = rgb([0,101,255, 0.33]); //"rgba(0, 101, 255, 0.33)";
        
        mctx.beginPath();
        mctx.moveTo((Game.Map.Sector + Game.SectorInterval - Game.Position) * wph, 0);
        mctx.lineTo((Game.Map.Sector + Game.SectorInterval - Game.Position) * wph, 100*hph);
        mctx.closePath();
        mctx.stroke();
        
        mctx.drawImage(Game.RenderCache.Sector, (Game.Map.Sector + Game.SectorInterval + 4 - Game.Position) * wph, 41*hph);
      } 
      
      Game.RenderCompMark(mctx, wph, hph);
      
      if(rplt)   
      {
        //Player tail:
        mctx.strokeStyle = rgb(Game.Player[0].Color || [255,0,0]);
        mctx.lineWidth = Math.round(0.8*hph);
        mctx.beginPath();
        mctx.moveTo(20*wph, (50+yOff-Game.Player[0].yPos)*hph);
        for(var ti=1; ti<Game.Player[0].Tail.length; ti++) {
          mctx.lineTo(Game.Player[0].Tail[ti][0]*wph, (50+yOff-Game.Player[0].Tail[ti][1])*hph);
        }
        mctx.stroke();
        mctx.closePath();
        
        //Player Dot:
        mctx.fillStyle = rgb([255,255,255]);
        mctx.beginPath();
        mctx.arc(20*wph, (50+yOff-Game.Player[0].yPos)*hph, Math.round(hph), 0, 2*Math.PI);
        mctx.closePath();
        mctx.fill();
      }
      
      //Cave Blocks:
      xpos = Game.Map.xOffset * -1;
      var yfactor;
      for(var bi=0; bi<FrameData.length; bi++) {
        if(FrameData[bi][3]!=null && xpos<(100+Game.BlockSize)) {
          yfactor = FrameData[bi][3];
          
          if(FrameData[bi][4]<=1) {
            mctx.beginPath();
            if(FrameData[bi][4]==1) { yfactor = Math.asin(Math.cos(Game.GameTime/500))*0.63; }
            mctx.rect((xpos-(Game.BlockSize*0.5*whratio)) * wph, (50 - FrameData[bi][1] -(Game.BlockSize*0.5) + (yfactor*FrameData[bi][2]*0.5) + yOff) * hph, Game.BlockSize*hph, Game.BlockSize*hph);
            mctx.closePath();
            mctx.fillStyle = rgb((FrameData[bi][4]==1) ? Game.Map.MBlckColor : Game.Map.BlockColor);
            mctx.fill();
          }
          else {
            if(FrameData[bi][4]==2) {
              mctx.drawImage(Game.RenderCache.Item, (xpos-(Game.ItemSize*0.5*whratio)) * wph, (50 - FrameData[bi][1] -(Game.ItemSize*0.5) + (yfactor*FrameData[bi][2]*0.5) + yOff)*hph);
            }
          }
        }
        xpos += FrameData[bi][0];
      }
     
      //Cave:
      mctx.fillStyle = rgb(Game.Map.Color);
      
      for(var drawpos=0; drawpos<2; drawpos++) {
      
        xpos = Game.Map.xOffset * -1;
        mctx.beginPath();
        mctx.moveTo(0, drawpos*100*hph);
        
        for(var i=0; i<FrameData.length; i++) {        
          ypos = 50 - FrameData[i][1] - (FrameData[i][2]/2) + yOff;
          if(drawpos==1) { ypos += FrameData[i][2]; }
          mctx.lineTo(xpos * wph, ypos * hph);
          if(xpos >=100+Game.Map.xOffset) { break; }
          xpos += FrameData[i][0];             
        }
        
        mctx.lineTo(100*wph, drawpos*100*hph);
        mctx.closePath();
        mctx.fill();
      }
      
      //Bonus Points:
      mctx.fillStyle = "rgba(255,255,255,1)";
      mctx.textAlign = "left";
      mctx.font = "bold "+(10*hph)+"px Arial";
      for(var bpi=0; bpi<Game.Map.BonusData.length; bpi++) {
        if(Game.Map.BonusData[bpi][3]!=Game.GameTime) {
          mctx.fillText("+"+Game.Map.BonusData[bpi][0], (Game.Map.BonusData[bpi][1]-Game.Position)*wph, (50-Game.Map.BonusData[bpi][2]+yOff)*hph);
        }
      }
      
      if(Game.ItemActive > 0) {
        mctx.fillStyle = "rgba(0,0,0,0)";
        if(Game.ItemActive==1) { mctx.fillStyle = "rgba(132,165,0,"+Math.max((1+Math.sin(Game.GameTime/200))*0.04, 0.02)+")"; }
        if(Game.ItemActive==2) { mctx.fillStyle = "rgba(0,100,255,0.15)"; }
        if(Game.ItemActive==3) { mctx.fillStyle = "rgba(255,38,0,"+Math.max((1+Math.sin(Game.GameTime/300))*0.2, 0.1)+")"; }
        if(Game.ItemActive==5) { mctx.fillStyle = "rgba(0,255,0,"+Math.max((1+Math.sin(Game.GameTime/150))*0.1, 0.05)+")"; }
        mctx.beginPath();
        mctx.rect(0,0,100*wph,100*hph);
        mctx.closePath();
        mctx.fill();
        
        var progress = (Game.ItemEndTS - Game.GameTime)/Game.ItemDuration;
        mctx.fillStyle = "rgba(255,0,255,1)";
        mctx.beginPath();
        mctx.rect(0, 0, progress*100*wph, Math.max(Math.round(1.5*hph), 6));
        mctx.closePath();
        mctx.fill();
      }
      
      //clicks remaining:
      if(Game.clickLimit!==null && !Game.isPause) { 
				mctx.fillStyle = "rgba(255,255,255,0.8)";
				mctx.textAlign = "right";
				mctx.font = "bold "+(10*hph)+"px Arial";
				mctx.fillText((Game.clickLimit-Game.Player[0].Clicks).toString(), 99.5*wph, 94*hph)
      }
      
      //mctx.fillStyle = rgb([255,255,255]);
      //mctx.textAlign = "right";
      //mctx.font = "bold "+(0.05*wnd.canvas.height)+"px Arial";
      //mctx.fillText("Game.Map.Data.length: "+Game.Map.Data.length, 0.995*wnd.canvas.width, 0.985*wnd.canvas.height);
      
      Game.Frames++;
    },
    
    GameLoop: function() {
      if(Game.isPaused) { return 0; }
      else { wnd.requestAnimFrame(Game.GameLoop); }
      var tdif = new Date().getTime() - Game.PosTimestamp;
      Game.PosTimestamp = new Date().getTime();
      
      if(tdif > 500) { /*Game.Pause();*/ }
      tdif = Math.min(40, tdif);
      
      if(Game.GameMode == 2) { Game.Speed = Math.round(50 * (1 + (Game.Position/3200))); }
      var xvel = Game.Speed; //Math.sqrt(Math.pow(Game.Speed,2)-Math.pow(Game.Player[0].yVelocity/4,2));
      //if(Game.ItemActive==6) { xvel = Game.Speed; }
      
      Game.GameTime += tdif;
      Game.Position += xvel * 0.001 * tdif; //xvel instead of Game.Speed
      Game.Map.xOffset += xvel * 0.001 * tdif;
      
      if(Game.Map.xOffset > Game.Map.Data[0][0]) { 
        Game.Map.xOffset = Game.Map.xOffset - Game.Map.Data[0][0];
        Game.Map.TotalLength -= Game.Map.Data[0][0];
        Game.Map.Data.shift();
      }
      
      while(Game.Map.TotalLength < 300) { Game.Map.AddMapData(); } 
      
      var yvelf = (40+Game.Speed)/90;
      if(Game.ItemActive==1) { yvelf = yvelf*(1+Math.sin(Game.GameTime/90)*0.6); }
      if(Game.GameMode==2) { yvelf = 1.13*Game.Speed/40; }
      for(var glpi=0; glpi<Game.Player.length; glpi++) {
        
        if(Game.Player[glpi].goingUp) { Game.Player[glpi].yVelocity += 0.15*tdif*yvelf; }
        else { Game.Player[glpi].yVelocity -= 0.13*tdif*yvelf; } // Gravity
        if(!Game.Player[glpi].goingUp && Game.ItemActive==1) { Game.Player[glpi].yVelocity -= 0.03*tdif; }
        if(Game.ItemActive==6) { Game.Player[glpi].yVelocity = Game.Player[glpi].goingUp ? Game.Speed:(Game.Speed*-1); }
        if(Game.ItemActive==5 && Game.Item5HelpVar2>0) { 
					//var i5yvh = (Game.Player[glpi].yPos-Game.Item5HelpVar)/Math.abs(Game.Player[glpi].yPos-Game.Item5HelpVar);
					//Game.Player[glpi].yVelocity += 0.2 * tdif * yvelf * i5yvh;
				}
        
        Game.Player[glpi].yVelocity = Math.min(Math.max(Game.Player[glpi].yVelocity, -150), 150);
        Game.Player[glpi].yPos += Game.Player[glpi].yVelocity * tdif * 0.001;
        
        Game.Player[glpi].updateTail((xvel*0.001*tdif),Game.Player[glpi].yPos);
        
        if(Game.Collision(Game.Player[glpi].yPos, 20)) {
					if(Game.ItemActive==5) { 
						var ci5h = (Game.Item5HelpVar-Game.Player[glpi].yPos);
						Game.Player[0].yVelocity = 70*(ci5h/Math.abs(ci5h));
						if(Game.Player[0].yVelocity<0) { Game.Player[0].yVelocity = -45; }
					} 
					else {	Game.isPaused=true; Game.GameEnd(Math.floor(Game.Position+20)); return 0; }
				}
				if(Game.Item5HelpVar2>0) { Game.Item5HelpVar2 = Math.max(0, Game.Item5HelpVar2-1); }       
      }     
      
      if((Game.Position+20)>Game.Highscore && Game.newHS==false && Game.firstGame==false) { Game.newHS=true; Game.Audio.FX.Highscore.play(); }
      
      Game.CamYPos = 0.75*Game.CamYPos + 0.25*Game.Player[0].yPos;
      if(Game.ItemActive==3) { Game.CamYPos += (1-(Math.random()*2))*(Game.Speed-40)/60; }
      
      Game.Map.CheckBPArray();
      
      if(Game.GameMode==2) { Game.Map.BGColor = [Math.min(65,Math.round(Game.Position/55)),0,0]; }
      
      Game.RenderFrame(Game.CamYPos,true);
      
      if(Game.Position > Game.Map.Sector+Game.SectorInterval+150) { Game.Map.Sector += Game.SectorInterval; Game.RenderSector(Game.Map.Sector+Game.SectorInterval); }
    },
    
    Menu: {
      Dom: (function() { 
				var mohlp = "offline";
				if(wnd.Game && wnd.Game.Online) { mohlp = "online"; }
				var inhtml = "<div id=\"mlogo\"></div><div id=\"menubtns\"><div onclick=\"Game.Start()\">play</div><div onclick=\"Game.Start(1);\">10-click-challenge<span class=\"daily\">daily</span></div>";
				inhtml += "<div onclick=\"Game.Start(2);\">speed-challenge</div></div>"; //class=\"disabled\"
				inhtml += "<div id=\"online_status\">"+mohlp+"</div>";
				inhtml += "<div id=\"version_info\">v1.37</div>";
				menudom.innerHTML = inhtml;
				return menudom;
			})(),
      BMenuButton: mainmenubtn,
      visible: false,
      show: function() {
        Game.isPaused = true;
        Game.Menu.visible = true;
        Game.Input.Mouse.activated = false;
        wnd.removeEventListener(clickEvent, Game.Menu.show, false);
        Game.Audio.Music.Main.pause();
        Game.PauseButton.setAttribute("class","");
        Game.Menu.BMenuButton.setAttribute("class","");
        Game.Audio.MuteButton.setAttribute("class", "");
        Game.Menu.Dom.setAttribute("style", "display: block");
      },
      hide: function() {
        Game.isPaused = false;
        Game.Menu.visible = false;
        Game.Input.Mouse.activated = true;
        Game.Menu.Dom.setAttribute("style", "display: none");
      },
    },
    
    Start: function(/*clcklmt*/ gamemode) {
      wnd.onclick = null;
      Game.Menu.hide();
      Game.GameMode = (gamemode===undefined) ? 0:gamemode;
      Game.Clear();
      if(!Game.firstGame) { wnd.removeEventListener(clickEvent, Game.Start, false);}
      
      Game.clickLimit = (gamemode==1) ? 10:null;
      if(Game.clickLimit!==null) { Game.Map.Seed = AP_Settings.DailyMapSeed; Math.seed = Game.Map.Seed; }
      
      Game.PosTimestamp = new Date().getTime();
      Game.isPaused = false;
      Game.Player[0] = new Game.PlayerObj("AP USER", AP_Settings.PlayerColor);
      Game.RenderSector(500);
      Game.RenderFrame(0,true);
      
      doc.onkeydown = function(e) {
        switch(e.keyCode) {
          case 32: //Space
            Game.Input.Mouse.down();
            break;
        }
      };
      doc.onkeyup = function(e) {
        switch(e.keyCode) {
          case 32: //Space
            Game.Input.Mouse.up();
            if(Game.Menu.visible===false && Game.isPaused===true) { Game.Pause(); }
            break;
          case 27: //ESC
            if(Game.Menu.visible===false && Game.ItemActive==0) { Game.Pause(); }
            break;
        }
      };
      
      Game.newHS = false;
      Game.Countdown = 3;
      Game.doStartCountdown();
    },
    
    doStartCountdown: function() {
      if(Game.RenderCache.CountdownBG==null) { 
        Game.RenderCache.CountdownBG = doc.createElement("canvas");
        Game.RenderCache.CountdownBG.width = wnd.canvas.width;
        Game.RenderCache.CountdownBG.height = wnd.canvas.height;
        Game.RenderCache.CountdownBG.getContext("2d").drawImage(wnd.canvas,0,0);
      }
      
      if(Game.Countdown <= 0) {
        if(Game.justStarted) {
          if(Game.LoadedData>=8) { Game.Audio.Music.Main.currentTime = 0; }
          Game.Audio.Music.Main.play();
          Game.Audio.Music.Main.loop = true;
          Game.justStarted = false;
        }
        Game.PauseButton.setAttribute("class","ingame");
        Game.Menu.BMenuButton.setAttribute("class","");
        Game.Audio.MuteButton.setAttribute("class","");
        
        Game.Audio.Music.Main.volume = 0.5;
        Game.Audio.Music.MainDrunk.volume = 0.5;
        Game.Audio.Music.MainParty.volume = 0.5;
        
        Game.inGame = true;
        Game.Frames = 0;
        Game.GTTS = new Date().getTime();
        Game.PosTimestamp = new Date().getTime();
        Game.Speed = 40;
        
        if(Game.GameMode==2) { //speed challenge
					Game.Speed = 60;
					Game.EndHeight = 45; // [y%]
					//Game.ItemActive = 3;
        }
        else { Game.EndHeight = 18; }
        
        Math.seed = Game.Map.Seed; //test
        Game.GameLoop();
      }
      else {
        var mctx =  wnd.canvas.getContext("2d");
        mctx.drawImage(Game.RenderCache.CountdownBG,0,0);
        mctx.fillStyle = rgb([255,255,255]);
        mctx.textAlign = "center";
        mctx.font = "bold "+(0.5*wnd.canvas.height)+"px Arial";
        mctx.fillText(Game.Countdown, 0.5*wnd.canvas.width, 0.655*wnd.canvas.height);
        //Game.Map.Seed
        
        mctx.fillStyle = rgb([255,255,255]);
        mctx.textAlign = "right";
        mctx.font = "bold "+(0.05*wnd.canvas.height)+"px Arial";
        mctx.fillText("Seed: "+Game.Map.Seed, 0.995*wnd.canvas.width, 0.985*wnd.canvas.height);
        
        setTimeout(Game.doStartCountdown, 750);
        Game.Countdown--;
      }
    },
    
    isPaused: true,
    
    Pause: function() {
      Game.isPaused = !Game.isPaused;
      Game.Input.Mouse.activated = !Game.isPaused;
      if(!Game.isPaused) { 
        Game.Countdown = 3;
        Game.Menu.BMenuButton.setAttribute("class","");
        wnd.removeEventListener(clickEvent,Game.Pause,false);
        Game.doStartCountdown();
      }
      else {
				if(!Game.Menu.visible && Game.inGame) { 
					Game.inGame = false;
					if(Game.RenderCache.CountdownBG==null) { Game.RenderCache.CountdownBG = doc.createElement("canvas");Game.RenderCache.CountdownBG.width = wnd.canvas.width;Game.RenderCache.CountdownBG.height = wnd.canvas.height;} //case: resized !todo width and height
					Game.RenderCache.CountdownBG.getContext("2d").drawImage(wnd.canvas,0,0);
					var mctx = wnd.canvas.getContext("2d");
					mctx.fillStyle = "rgba(0,0,0,0.4)";
					mctx.beginPath();mctx.rect(0, 0, wnd.canvas.width, wnd.canvas.height);mctx.closePath();
					mctx.fill();
					mctx.fillStyle = "rgb(255,255,255)";
					mctx.font = "bold "+(0.4*wnd.canvas.height)+"px Arial";
					mctx.textAlign = "center";
					mctx.fillText("Pause", 0.5*wnd.canvas.width, 0.55*wnd.canvas.height);
					wnd.setTimeout(function() { wnd.addEventListener(clickEvent,Game.Pause,false); }, 500);
					Game.Audio.MuteButton.setAttribute("class","show m"+Game.Audio.muted.toString());
					Game.PauseButton.setAttribute("class","");
					wnd.setTimeout(function(){Game.Menu.BMenuButton.setAttribute("class","show");},200)
					Game.Audio.Music.Main.volume = 0.2;
					Game.Audio.Music.MainDrunk.volume = 0.2;
					Game.Audio.Music.MainParty.volume = 0.2;
				}
      }
    },
    
    Clear: function() { //reset & clear data after game end
      Game.Stop();
      Game.Position = 0;
      Game.BonusPoints = 0;
      Game.GameTime = 0;
      Game.justStarted = true;
      Game.clickLimit = null;
      Game.ItemActive=0;
      Game.RenderCache.CountdownBG = null;
      Game.CamYPos = 0;
      Game.BlockHit = true;
      Game.Map.BlockColor = [34,177,76,1];
      Game.Map.MBlckColor = [255,155,0,1];
      Game.Map.Reset();
      Game.Item5HelpVar2 = 0;
      Math.seed = Game.Map.Seed;
    },
    
    ItemActivate: function() {
      if(Game.ItemActive==0) {
        Game.Map.BGColor = [0,0,0,1];
        Game.PauseButton.setAttribute("class","");
        var irs = Math.floor(Math.random()*6)+1;
        if((Game.Position<3000 && irs==2) || (Game.Position>4000 && irs==3)) { irs = Math.floor(Math.random()*6)+1; }
        if(Game.Position>4750 && irs==1) { irs = Math.floor(Math.random()*6)+1; }
        if(Game.Position<2000 && irs==2) { irs = 3; }
        if(Game.Position>4500 && (irs==3 || irs==6)) { irs = 2; }
				
        switch(irs) {
          case 1: //Drunk Mode
            Game.Map.BGColor = [0,0,0,0.15];
            Game.Audio.FX.DrunkStart.play();
            Game.Audio.Music.Main.pause();
            Game.Audio.Music.MainDrunk.play();
            Game.Audio.Music.MainDrunk.loop = true;
            Game.Audio.Music.MainDrunk.currentTime = Game.Audio.Music.Main.currentTime;
            wnd.setTimeout(function(){ Game.Map.BGColor = [0,0,0,0.4]; }, 10000);
            wnd.setTimeout(function(){ Game.Map.BGColor = [0,0,0,0.75]; }, 10500);
            wnd.setTimeout(function() {
              Game.ItemActive=0;
              Game.Map.BGColor = [0,0,0];
              Game.AddBonusPoints(150, 20, Game.CamYPos);
              Game.PauseButton.setAttribute("class","ingame");
              Game.Audio.Music.Main.play();
              Game.Audio.Music.Main.currentTime = Game.Audio.Music.MainDrunk.currentTime;
              Game.Audio.Music.MainDrunk.pause();
            }, 11000);
            Game.ItemEndTS = Game.GameTime + 11000;
            Game.ItemDuration = 11000;
            break;
          case 2: //SlowDown
            Game.Audio.FX.SlowDown.play();
            Game.Speed = 35;
            Game.Map.Color = [92,255,116];
            wnd.setTimeout(function(){ Game.Speed = 30; }, 500);
            wnd.setTimeout(function(){ Game.Speed = 25; }, 1000);
            wnd.setTimeout(function(){ Game.Speed = 20; }, 1500);
            wnd.setTimeout(function(){ Game.Audio.FX.SpeedUp.play(); }, 7000);
            wnd.setTimeout(function(){ Game.Speed = 25; }, 8000);
            wnd.setTimeout(function(){ Game.Speed = 30; }, 9000);
            wnd.setTimeout(function(){
              Game.Speed = 40;
              Game.Map.Color = [26,255,0];
              Game.ItemActive=0;
              Game.PauseButton.setAttribute("class","ingame");
            }, 10000);
            Game.ItemEndTS = Game.GameTime + 10000;
            Game.ItemDuration = 10000;
            break;
          case 3: //SpeedUp
            Game.Audio.FX.SpeedUp.play();
            Game.Speed = 45;
            Game.Map.BGColor = [0,0,0,0.6];
            wnd.setTimeout(function(){ Game.Speed = 50; }, 500);
            wnd.setTimeout(function(){ Game.Speed = 60; }, 1000);
            wnd.setTimeout(function(){ Game.Speed = 70; }, 1500);
            wnd.setTimeout(function(){ Game.Audio.FX.SlowDown.play(); }, 5500);
            wnd.setTimeout(function(){ Game.Speed = 60; }, 7000);
            wnd.setTimeout(function(){ Game.Speed = 55; }, 7500);
            wnd.setTimeout(function(){ Game.Speed = 50; }, 8500);
            wnd.setTimeout(function(){
              Game.Speed = 40;
              Game.Map.BGColor = [0,0,0];
              Game.AddBonusPoints(100, 20, Game.CamYPos);
              Game.ItemActive=0;
              Game.PauseButton.setAttribute("class","ingame");          
            }, 9000);
            Game.ItemEndTS = Game.GameTime + 9000;
            Game.ItemDuration = 9000;
            break;
          case 4: //PartyMode
            Game.Audio.Music.Main.pause();
            Game.Audio.FX.DJ.play();
            Game.Audio.Music.MainParty.play();
            Game.Audio.Music.MainParty.currentTime = Game.Audio.Music.Main.currentTime;
            Game.Audio.Music.MainParty.loop = true;
            Game.Map.BGColor = [0,0,0,0.7];
            wnd.setTimeout(function() {
              Game.ItemActive=0;
              Game.Map.BGColor = [0,0,0];
              Game.Audio.Music.Main.play();
              Game.Audio.Music.Main.currentTime = Game.Audio.Music.MainParty.currentTime;
              Game.Audio.Music.MainParty.pause();
              Game.AddBonusPoints(75, 20, Game.CamYPos);
              Game.PauseButton.setAttribute("class","ingame");
            }, 8500);
            Game.ItemEndTS = Game.GameTime + 8500;
            Game.ItemDuration = 8500;
            break;
          case 5: //WalkThroughBlock
            Game.Audio.FX.DJ.play();
            Game.BlockHit = false;
            Game.Map.BlockColor = [34,177,76,0.25];
            Game.Map.MBlckColor = [255,155,0,0.25];
            wnd.setTimeout(function(){
              Game.BlockHit = true; Game.Map.BlockColor = [34,177,76,1]; Game.Map.MBlckColor = [255,155,0,1]; 
              Game.ItemActive=0; 
              Game.Audio.FX.DJ.play();
              Game.PauseButton.setAttribute("class","ingame"); },12000);
            Game.ItemEndTS = Game.GameTime + 12000;
            Game.ItemDuration = 12000;
            break;
          case 6: //zickzack
            Game.Player[0].yVelocity = 0;
            wnd.setTimeout(function() {
              Game.ItemActive=0;
              //Game.Player[0].yVelocity = Game.Player[0].yVelocity*0.5;
              Game.AddBonusPoints(50, 20, Game.CamYPos);
              Game.PauseButton.setAttribute("class","ingame");
            }, 8000);
            Game.ItemEndTS = Game.GameTime + 8000;
            Game.ItemDuration = 8000;
            break;
          case 7: //just bonus points
            Game.AddBonusPoints(100, 20, Game.CamYPos);
            wnd.setTimeout(function() {Game.ItemActive=0;}, 10);
            break;
        }
        Game.ItemActive=irs;
      }
    },
    
    Stop: function() { 
      Game.ItemActive=0;
      Game.firstGame = false;
      Game.inGame = false;
      var hToID = setTimeout(";");
      for(var ti=0; ti<hToID; ti++) { wnd.clearTimeout(ti); } //clear all timeouts
      doc.onkeydown = null;
      doc.onkeyup = null;
      Game.RenderCache.CountdownBG = null;
      wnd.removeEventListener(clickEvent,Game.Pause,false);
    },
    
    GameEnd: function(points) {
      Game.Audio.Music.Main.pause();
      Game.Audio.Music.MainDrunk.pause();
      Game.Audio.Music.MainParty.pause();
      Game.PauseButton.setAttribute("class","");
      Game.inGame = false;
      Game.Audio.FX.GameEnd.play();
      if(Game.Map.BonusData.length>0 && (Game.Map.BonusData[Game.Map.BonusData.length-1][3]-40)<Game.GameTime) { 
        Game.BonusPoints -= Game.Map.BonusData[Game.Map.BonusData.length-1][0];
        Game.Map.BonusData.pop();
      }
      points += Game.BonusPoints;
      Game.Highscore = (points>Game.Highscore) ? points : Game.Highscore;
      Game.RenderFrame(Game.CamYPos,true);
      Game.Stop();
      
      Game.Map.BGColor = [0,0,0];
      var mctx = wnd.canvas.getContext("2d");
      mctx.fillStyle = "rgba(0,0,0,0.4)";
      mctx.beginPath();mctx.rect(0, 0, wnd.canvas.width, wnd.canvas.height);mctx.closePath();
      mctx.fill();
      mctx.fillStyle = "rgb(255,255,255)";
      mctx.font = "bold "+(0.4*wnd.canvas.height)+"px Arial";
      mctx.textAlign = "center";
      mctx.fillText(points, 0.5*wnd.canvas.width, 0.55*wnd.canvas.height);
      if(Game.BonusPoints>0) { 
        mctx.fillStyle = "rgba(235,235,235,1)";
        mctx.font = (0.1*wnd.canvas.height)+"px Arial";
        mctx.fillText("distance: "+Math.floor(Game.Position+20), 0.5*wnd.canvas.width, 0.66*wnd.canvas.height);
      }
      else {
        mctx.fillStyle = "rgba(235,235,235,0.8)";
        mctx.font = (0.07*wnd.canvas.height)+"px Arial";
        var verb = wnd.isTouchDevice ? "tap":"click";
        mctx.fillText(verb+" to continue", 0.5*wnd.canvas.width, 0.655*wnd.canvas.height);
      }
      
      if(Game.newHS) {
        mctx.fillStyle = "rgb(255,0,0)";
        mctx.font = (0.06*wnd.canvas.height)+"px Arial";
        mctx.fillText("NEW LOCAL HIGHSCORE!!!", 0.5*wnd.canvas.width, 0.24*wnd.canvas.height);
      }
      
      //if(Game.clickLimit===null) { wnd.setTimeout(function() { wnd.addEventListener(clickEvent, Game.Start, false); }, 300); }
      //else { wnd.setTimeout(function() { wnd.addEventListener(clickEvent, Game.Menu.show, false); }, 400); }
      wnd.setTimeout(function() { wnd.addEventListener(clickEvent, Game.Menu.show, false); }, 400);
      
      if(points>=2000 && Game.Online) {
        //var submitscript = doc.createElement("script");
        //submitscript.src = "http://api.awesome-projects.de/p/8cave/post.php?p="+points+"&bp="+Game.BonusPoints+"&gt="+Math.round(Game.GameTime)+"&ms="+Game.Map.Seed+"&rw="+wnd.canvas.width+"&rh="+wnd.canvas.height;
        //doc.body.appendChild(submitscript);
      }
    },
    
    RessourceLoaded: function() {
      Game.LoadedData++;
    },
    
    moveUp: function(pid, t) { //player id, time t in ms
      Game.Player[pid].yVelocity += 0.05*t;
    },
    
    Input: {
       Mouse: {
          activated: true,
          down: function() { 
            if(Game.Input.Mouse.activated) {
              Game.Player[0].goingUp = true;
              Game.Player[0].Clicks++;
            }
          },
          up: function() { 
            if(Game.Input.Mouse.activated) { 
              Game.Player[0].goingUp = false;
              if(Game.clickLimit!==null && Game.Player[0].Clicks>=Game.clickLimit) { Game.Input.Mouse.activated = false; }
            }
          }
       } 
    },
    
    Intro: {
      Content: [(function(){
        var cvs = document.createElement("canvas");
        cvs.width = window.innerWidth;
        cvs.height = window.innerHeight;
        var cctx = cvs.getContext("2d");
        cctx.fillStyle = "rgb(0,0,0)";
        cctx.rect(0, 0, cvs.width, cvs.height);
        cctx.fill();
        cctx.textAlign = "center";
        cctx.fillStyle = "rgb(255,0,0)";
        cctx.font = "bold "+(0.2*cvs.height)+"px Arial";
        cctx.fillText("WARNING", 0.5*wnd.canvas.width, 0.27*wnd.canvas.height);
        cctx.fillStyle = "rgb(255,255,255)";
        cctx.font = "bold "+(0.05*cvs.height)+"px Arial";
        cctx.fillText("THIS GAME HAS BEEN IDENTIFIED", 0.5*wnd.canvas.width, 0.42*wnd.canvas.height);
        cctx.fillText("TO POTENTIALLY TRIGGER SEIZURES", 0.5*wnd.canvas.width, 0.5*wnd.canvas.height);
        cctx.fillText("FOR PEOPLE WITH PHOTOSENSITIVE", 0.5*wnd.canvas.width, 0.58*wnd.canvas.height);
        cctx.fillText("EPILEPSY", 0.5*wnd.canvas.width, 0.66*wnd.canvas.height);
        cctx.fillText("VIEWER DISCRETION IS ADVISED", 0.5*wnd.canvas.width, 0.82*wnd.canvas.height);
        
        return cvs;
      })()],
      Epilepsy: function() {
        var ictx = wnd.canvas.getContext("2d");
        ictx.drawImage(Game.Intro.Content[0],0,0);
      }
    }
    
  };
  //load audio files:
  var audiof = "ogg";
  if((new Audio()).canPlayType("audio/mpeg")!="") { audiof = "mp3"; }
  Game.Audio.Music.Main.addEventListener('canplaythrough', Game.RessourceLoaded, false);
  Game.Audio.Music.Main.src = "./audio/"+audiof+"/8cave1."+audiof;
  Game.Audio.Music.MainDrunk.addEventListener('canplaythrough', Game.RessourceLoaded, false);
  Game.Audio.Music.MainDrunk.src = "./audio/"+audiof+"/8cave1_drunk2."+audiof;
  Game.Audio.FX.Highscore.addEventListener('canplaythrough', Game.RessourceLoaded, false);
  Game.Audio.FX.Highscore.src = "./audio/"+audiof+"/highscore1."+audiof;
  Game.Audio.FX.DrunkStart.addEventListener('canplaythrough', Game.RessourceLoaded, false);
  Game.Audio.FX.DrunkStart.src = "./audio/"+audiof+"/drunk_start."+audiof;
  Game.Audio.FX.SlowDown.addEventListener('canplaythrough', Game.RessourceLoaded, false);
  Game.Audio.FX.SlowDown.src = "./audio/"+audiof+"/slow_down."+audiof;
  Game.Audio.FX.SpeedUp.addEventListener('canplaythrough', Game.RessourceLoaded, false);
  Game.Audio.FX.SpeedUp.src = "./audio/"+audiof+"/speedup."+audiof;
  Game.Audio.Music.MainParty.addEventListener('canplaythrough', Game.RessourceLoaded, false);
  Game.Audio.Music.MainParty.src = "./audio/"+audiof+"/8cave1party."+audiof;
  Game.Audio.FX.GameEnd.addEventListener('canplaythrough', Game.RessourceLoaded, false);
  Game.Audio.FX.GameEnd.src = "./audio/"+audiof+"/awwwFX."+audiof;
  Game.Audio.FX.DJ.addEventListener('canplaythrough', Game.RessourceLoaded, false);
  Game.Audio.FX.DJ.src = "./audio/"+audiof+"/DJScratch."+audiof;
  
  Game.RenderItem();
  
  Game.PauseButton.addEventListener(downEvent, function(e){Game.Pause(); e.stopPropagation(); return false;}, false);
  Game.Audio.MuteButton.addEventListener(clickEvent, function(e){Game.Audio.muteAll(); e.stopPropagation();}, false);
  Game.Menu.BMenuButton.addEventListener(clickEvent, function(e){Game.Stop();Game.Menu.show(); e.stopPropagation();}, false);
  
  Game.Player[0] = new Game.PlayerObj("AP USER", AP_Settings.PlayerColor);
  
  wnd.addEventListener('resize',function(){
    wnd.canvas.width = wnd.innerWidth; 
    wnd.canvas.height = wnd.innerHeight;
    Game.RenderFrame(Game.CamYPos,true); 
    Game.RenderCache.CountdownBG = null;
    Game.RenderItem();
    if(Game.Position<500) { Game.RenderSector(500); }
    if(Game.isPaused) { Game.isPaused = false; Game.Pause(); }
  },false);
  
  doc.addEventListener(downEvent, Game.Input.Mouse.down, false);
  doc.addEventListener(upEvent, Game.Input.Mouse.up, false);
  
  wnd.setTimeout(function(){doc.body.style.backgroundImage = "url("+html5logo+")"; },2000);
  wnd.setTimeout(function(){Game.Intro.Epilepsy();},3000);
  
  wnd.setTimeout(function(){
    if(typeof(APSONLINE)!="undefined") {
      if(APSONLINE.LOGGEDIN==true) { 
        alert('You are playing online!\n');
        Game.Online = true;
        Game.Menu.show();
      }
      else { 
        /*if(confirm('Do you want to play online?\nYou will need this to submit your score.')) {
          APSONLINE.LoginForceReload = true;
          APSONLINE.LoggedInContinue = function() {
            alert('You are playing online!\n');
            Game.Online = true;
            Game.Menu.show();
          }
          APSONLINE.Login();
        }
        else {*/
          Game.Menu.show();/*
        }*/
      }
    }
    else {
      Game.Menu.show();
    }
  },6000);
}