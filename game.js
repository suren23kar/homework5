const background = new Image();
background.src = 'http://goldwallpapers.com/uploads/posts/space-background-pictures/space_background_pictures_026.jpg';
const rocketImg = new Image();
rocketImg.src = 'http://www.emoji.co.uk/files/emoji-one/travel-places-emoji-one/1768-rocket.png';
const asteroidsImg = new Image();
asteroidsImg.src = 'https://opengameart.org/sites/default/files/1346943991.png';
  
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const rectangleInt = function(rect1X, rect1Y, rect1W, rext1H, rect2X, rect2Y, rect2W, rext2H) {  
 return ((Math.max(rect1X, rect2X) - Math.min(rect1X, rect2X)) <= rect1W) && ((Math.max(rect1Y, rect2Y) - Math.min(rect1Y, rect2Y))<=rext1H);
  };
  

const randomNum = function(num) {
  return Math.floor(Math.random() * num) + 1;
  }; 
const createPoint = function(num, canvasWidth, canvasHeight){
const a = [];
const r = function(n){
   if(n<=0){
     return "";
    }  
   a.push({
      x: randomNum(canvasWidth),
      y: randomNum(canvasHeight),
      img: asteroidsImg,
      width: 40,
      height: 40,
      xDelta: 1,
      yDelta: 1,
      })
   r(n-1);
    }
   r(num);
   return a;
  };
const point = createPoint(6,canvas.width,canvas.height);
  

const draw = function(){  
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
   const drawEvery = function(arr,i){
      if(i === arr.length){
        return "";
      }
      ctx.drawImage(arr[i].img, arr[i].x, arr[i].y,arr[i].width, arr[i].height); 
      drawEvery(arr,i+1);
    };
    drawEvery(point,0);
  };

const updateData = function(){
   const forevery = function(arr, i){
      if(i === arr.length){
        return "";
      }
      if(arr[i].x >= canvas.width-arr[i].width){
        arr[i].xDelta = -arr[i].xDelta;
      }else if(arr[i].x<=0){
        arr[i].xDelta = -arr[i].xDelta;
      }
      if(arr[i].y >= canvas.height-arr[i].height){
        arr[i].yDelta = -arr[i].yDelta;
      }else if(arr[i].y<=0){
        arr[i].yDelta = -arr[i].yDelta;
      }
      arr[i].x = arr[i].x + arr[i].xDelta;
      arr[i].y = arr[i].y + arr[i].yDelta;
      
      forevery(arr,i+1);
    };
    forevery(point,0);
  };
  const loop = function(){
    draw();	
    updateData();
    window.requestAnimationFrame(loop);
  };
  
  loop();
  const floorY = canvas.height - 70
  
  const gameData = {
    hero: {
      x: 50,
      y: floorY,
      img: rocketImg,
      width: 40,
      height: 40,
      xD: 0,
      yD: 0
    },     
  };
  
  const draw1 = function() {
    
    const hero = gameData.hero;
    ctx.drawImage(hero.img, hero.x, hero.y, hero.width, hero.height); 
  };
  
  const updateData1 = function() {
    const hero = gameData.hero;
    const forevery = function(arr, i){
      if(i === arr.length -1){
        return;
      }
      
      if(rectangleInt(hero.x, hero.y, hero.width, hero.height, arr[i].x, arr[i].y, arr[i].width, arr[i].height)){
        
        alert('Colonization of the Moon Failed :(');
        hero.x=50;
        hero.y = floorY;	
      }
      forevery(arr,i+1);
    };
    forevery(point,0);
  };
  
  
  const loop1 = function() {
    draw1();
    updateData1();
    requestAnimationFrame(loop1);
  };
  
  loop1();
  
  const leftKey = 37;
  const upKey = 38;
  const rightKey = 39;
  const downKey = 40;
  
document.addEventListener('keydown', function(event) {
    const hero = gameData.hero;
    if(event.keyCode === rightKey) {
      hero.x = hero.x + 15;
      if(hero.x >= canvas.width) {
        hero.x = 0-hero.width;
      }
    } 
    else if(event.keyCode === leftKey) {
      hero.x = hero.x - 15; 
      if(hero.x <= 0-hero.width) {
        hero.x = canvas.width;
      }     
    }
    else if(event.keyCode === upKey) {
      if(hero.y>= 0 && hero.y<= canvas.height-hero.height) {
        hero.y= hero.y - 15;
      }		
      else if(hero.y<3){hero.y=3;}
    }
    else if(event.keyCode === downKey){
      if(hero.y>= 0 && hero.y<= canvas.height-hero.height) {
        hero.y= hero.y +  15;      }
      else if(hero.y>=canvas.height-hero.height){hero.y=canvas.height-hero.height;}
    }
  }, false)