const createPoints = function(count, canvasWidth , canvasHeight){
const mathRand = function(num) { 
return Math.floor(Math.random() * num) + 1; 
}; 
const result = []; 
const colorArray = ['red', 'blue', 'orange']; 
const loop = function(num) { 
if(num ===0) { 
return; 
} 
result.push({ 
x:mathRand(canvasWidth-30), 
y:mathRand(canvasHeight-30), 
width:30, 
height:30, 
xDelta:5, 
yDelta:5, 
color: colorArray[mathRand(3)-1] 
}); 
loop(num-1); 
}; 

loop(count); 

return result; 
}; 

const points = createPoints(8, 500,500); 

const canvas = document.getElementById('canvas'); 
const ctx = canvas.getContext('2d'); 
canvas.width = 500; 
canvas.height = 500; 

const forEach = function(arr, func) { 
const helper = function(index) { 
if(index === arr.length){ 
return; 
} 

func(arr[index]); 
helper(index+1); 
}; 

helper(0); 
}; 

const draw = function() { 

ctx.fillStyle = 'pink'; 
ctx.fillRect(0,0,canvas.width,canvas.height); 

forEach(points, function(point){ 
ctx.fillStyle = point.color; 
ctx.fillRect(point.x, point.y, point.width, point.height); 
}); 
}; 

const updateData = function() { 
forEach(points, function(point){ 
point.x += point.xDelta; 
point.y += point.yDelta; 

if(point.y <= 0 || point.y + point.height > canvas.height) { 
point.yDelta *= -1; 
} 
if(point.x <= 0 || point.x + point.width > canvas.width) { 
point.xDelta *= -1; 
} 
}); 
}; 


const recursion = function() { 
draw(); 
updateData(); 
requestAnimationFrame(recursion); 
}; 
recursion();