const createPoints = function(count, canvasWidth, canvasHeight){ 
const mathRand = function(num) { 
return Math.floor(Math.random() * num) + 1; 
} 
const result = []; 
const colorArray = ['red', 'green', 'blue']; 
const loop = function(num) { 
if(num ===0) { 
return; 
} 
result.push({ 
x:mathRand(canvasWidth-30), 
y:mathRand(canvasHeight-30), 
width:30, 
height:30, 
xDelta:1, 
yDelta:1, 
color: colorArray[mathRand(3)-1] 
}); 
loop(num-1); 
}; 

loop(count); 


return result; 
};
console.log(createPoints(6,500,500));