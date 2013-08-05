var c=document.getElementById("myCanvas");
 var ctx=c.getContext("2d");
 ctx.fillStyle="#FFF";
 ctx.fillRect(0,0,800,500);

 var canvas = document.getElementById("myCanvas");
 var context = canvas.getContext('2d');


if(window.addEventListener){
	window.addEventListener('load', InitEvent, false); 
}
var canvas, context, tool;        
function InitEvent () {                                       
    canvas = document.getElementById('myCanvas');
   
    tool = new tool_pen();
    canvas.addEventListener('mousedown', ev_canvas, false);
    canvas.addEventListener('mousemove', ev_canvas, false);
    canvas.addEventListener('mouseup',   ev_canvas, false);
}
function tool_pen ()                                   
{
    var tool = this;
    this.started = false;
    
    //Starting
    this.mousedown = function (ev) 
    {
        context.beginPath();
        context.moveTo(ev._x, ev._y);
        tool.started = true;
    };
    //While Drawing
    this.mousemove = function (ev) 
    {
        if (tool.started) 
        {
            context.lineTo(ev._x, ev._y);
            context.stroke();
        }
    };
   //Stopping
    this.mouseup = function (ev) 
    {
      if (tool.started){
            tool.mousemove(ev);     
      }
      tool.started = false;
    };
}        

function ev_canvas (ev) 
{
    if (ev.layerX || ev.layerX == 0) 
    { 
      ev._x = ev.layerX;
  	  ev._y = ev.layerY;
    } 
    else if (ev.offsetX || ev.offsetX == 0) 
    { 
      ev._x = ev.offsetX;
      ev._y = ev.offsetY;
    }
   
    var func = tool[ev.type];        
    if (func) {
        func(ev);
    }