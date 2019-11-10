/////////////////////////////////////////////////////////////////
//    S�nid�mi � T�lvugraf�k
//     Teiknar punkt � strigann �ar sem notandinn smellir m�sinni
//
//    Hj�lmt�r Hafsteinsson, jan�ar 2019
/////////////////////////////////////////////////////////////////
var canvas;
var gl;
var drawType = 0;

var maxNumPoints = 200;  
var index = 0;


window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 1.0, 1.0 );

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, 8*maxNumPoints, gl.DYNAMIC_DRAW);
    
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    
    canvas.addEventListener("mousedown", function(e){
        switch(e.which) {
            case 1:
                gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
                
                // Calculate coordinates of new point
                var t = vec2(2*e.offsetX/canvas.width-1, 2*(canvas.height-e.offsetY)/canvas.height-1);
                
                // Add new point behind the others
                gl.bufferSubData(gl.ARRAY_BUFFER, 8*index, flatten(t));

                index++;
                break;
            case 2:
                gl.clear( gl.COLOR_BUFFER_BIT );
                index = 0;
                break;
            case 3:
                gl.clear( gl.COLOR_BUFFER_BIT );
                index = 0;
                break;
        }

        
    } );


    document.getElementById("Controls" ).onclick = function(event) {
        switch( event.target.index ) {
          case 0:
            drawType = 1;
            break;
         case 1:
            drawType = 2;
            break;
         case 2:
            drawType = 3;
            break;
        case 3:
            drawType = 4;
            break;
        case 4:
            drawType = 5;
            break;
        case 5:
            drawType = 6;
            break;
       }
    };

    render();
}

function drawDot(num){
    if (num == 0) gl.drawArrays( gl.POINTS, 0, index );
    else if (num == 1) gl.drawArrays( gl.LINE_STRIP, 0, index );
    else if (num == 2) gl.drawArrays( gl.LINE_LOOP, 0, index );
    else if (num == 3) gl.drawArrays( gl.LINES, 0, index );
    else if (num == 4) gl.drawArrays( gl.TRIANGLE_STRIP, 0, index );
    else if (num == 5) gl.drawArrays( gl.TRIANGLE_FAN, 0, index );
    else if (num == 6) gl.drawArrays( gl.TRIANGLES, 0, index );
    
}

function render() {
    
    gl.clear( gl.COLOR_BUFFER_BIT );
    //gl.drawArrays( gl.POINTS, 0, index );

    drawDot(drawType);

    window.requestAnimFrame(render);
}
