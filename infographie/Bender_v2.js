"use strict";

var gl;

var CoordsLoc; 
var NormalLoc;
var TexCoordLoc;

var ProjectionLoc;
var ModelviewLoc;
var NormalMatrixLoc;

var cursor = [];
var benderLegsFlaFla = [];
var benderArmsFlaFla = [];
var benderArrows = [];

var projection;
var modelview;
var flattenedmodelview;

var normalMatrix = mat3();
var initialmodelview = modelview;
var modelViewMatrix;

var rotator;

var sphere, cylinder, box, disk, cone, benderFoot, benderHands, benderneck, visiere, benderMouthPiece, goldBar;
var hemisphereinside, hemisphereoutside, thindisk;
var quartersphereinside, quartersphereoutside;

var prog; 

var lightPosition = vec4(20.0, 20.0, 100.0, 1.0);

var lightAmbient = vec4(1.0, 1.0, 1.0, 1.0);
var lightDiffuse = vec4(1.0, 1.0, 1.0, 1.0);
var lightSpecular = vec4(1.0, 1.0, 1.0, 1.0);

var whiteAmbient = vec4(0.4, 0.4, 0.4, 1.0);
var whiteDiffuse = vec4(0.6, 0.6, 0.6, 1.0);
var whiteSpecular = vec4(0.5, 0.5, 0.5, 1.0);

var blackAmbient = vec4(0, 0, 0, 1.0);
var blackDiffuse = vec4(0, 0, 0, 1.0);
var blackSpecular = vec4(0.5, 0.5, 0.5, 1.0);

var greyAmbient = vec4(0.3, 0.3, 0.3, 1.0);
var greyDiffuse = vec4(0.3, 0.3, 0.3, 1.0);
var greySpecular = vec4(0.5, 0.5, 0.5, 1.0);

var greenAmbient = vec4(0, 1, 0, 1);
var greenDiffuse = vec4(0.75, 0.75, 0.75, 1);
var greenSpecular = vec4(0.9, 0.9, 0.9, 1);

var goldAmbient = vec4(.9, .9, 0, 1);
var goldDiffuse = vec4(0.5, 0.5, 0, 1);
var goldSpecular = vec4(0.5, 0.5, 0.5, 1);

var materialAmbient = vec4(0.0, 0.1, 0.3, 1.0);
var materialDiffuse = vec4(0.48, 0.55, 0.69, 1.0);
var materialSpecular = vec4(0.48, 0.55, 0.69, 1.0);
var materialShininess = 100.0;

var ambientProduct, diffuseProduct, specularProduct;

var stack = [];
var figure = [];

var torsoId = 0; var neckId = 1; var shoulderLeftId = 2; var shoulderRightId = 3; var headId = 4;
var headTopId = 5; var antennaId = 6; var antennaTopId = 7; var antennaPopId = 8; var leftArmId = 9;
var rightArmId = 10; var leftHandId = 11; var rightHandID = 12; var leftLegId = 13; var rightLegId = 14;
var leftFootId = 15; var rightFootId = 16; var leftHandDiskId = 17; var rightHandDiskId = 18; var leftFootDiskId = 19;
var rightFootDiskId = 20; var leftLegJointsId = 21; var rightLegJointsId = 22; var leftArmJointsId = 23; var rightArmJointsId = 24;
var legLeftClip1Id = 25; var legLeftClip2Id = 26; var legRightClip1Id = 27; var legRightClip2Id = 28; var handLeftfinger1Id = 29;
var handLeftfinger2Id = 30; var handLeftfinger3Id = 31; var handRightfinger1Id = 32; var handRightfinger2Id = 33; var handRightfinger3Id = 34;
var VisiereId = 35; var leftEyeId = 36; var rightEyeId = 37; var eyeHolesId = 38; var mouthPieceId = 39; 
var cigarId = 40; var leftArmPitId = 41; var rightArmPitId = 42; var neckHoleId = 43; var antennaHoleId = 44;
var cigarBurnId = 45; var torsoHoleId = 46; var neckArrowId = 47; var antennaArrowId = 48; var cigarArrowId = 49;
var leftLegArrowId = 50; var rightLegArrowId = 51; var beer1Id = 52; var beer2Id = 53; var beer3Id = 54;
var beer4Id = 55; var beer5Id = 56; var popcornBoxId = 57; var popcornId = 58; var torsoArrowId = 59;
var goldPileId = 60; var TorsoDoorId = 61;

var numNodes = 62;

for( var i=0; i<numNodes; i++) figure[i] = createNode( null, null, null);

var noTexLoc;

var metal, mouth, cigarTex, eyes, burn, popcornBoxTex, goldTex, popcornTex;

function torso()
{
    whiteMaterial();

    gl.uniform1i(noTexLoc, 1);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, metal);
    gl.uniform1i(gl.getUniformLocation(prog, "texture"), 0);


    modelview = initialmodelview;
    modelview = mult(modelview, translate(0.0,5.0,0.0));
    modelview = mult(modelview, rotate(90.0, 1, 0, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(1.1, 1.1, 1.75));

    cylinder.render();    
}

function neck()
{
    whiteMaterial();

    modelview = initialmodelview;
    modelview = mult(modelview, translate(0.0,15.25,0.0));
    modelview = mult(modelview, rotate(270.0, 1, 0, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(5.4, 5.4, 4));
    benderneck.render();
}

function head()
{
    modelview = initialmodelview;
    modelview = mult(modelview, translate(0.0,22.0,0.0));
    modelview = mult(modelview, rotate(90.0, 1, 0, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(0.65, 0.65, 0.75));
    cylinder.render();
}

function headTop()
{
    modelview = initialmodelview;
    modelview = mult(modelview, translate(0.0,25.50,0.0));
    modelview = mult(modelview, rotate(90.0, 1, 0, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(0.325, 0.325, 0.325));
    sphere.render();
}

function shoulderRight()
{
    modelview = initialmodelview;
    modelview = mult(modelview, translate(-6,10.0,0.0));
    modelview = mult(modelview, rotate(270.0, 0, 1, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(3.0, 3.0, 4.0));
    benderFoot.render();
}

function shoulderLeft()
{
    modelview = initialmodelview; 
    modelview = mult(modelview, translate(6,10.0,0.0));
    modelview = mult(modelview, rotate(90.0, 0, 1, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(3.0, 3.0, 4.0));
    benderFoot.render();
}

function rightHand()
{
    modelview = initialmodelview; 
    modelview = mult(modelview, translate(-24.0, 10.0, 0.0));
    modelview = mult(modelview, rotate(90.0, 0, 1, 0));
    normalMatrix = extractNormalMatrix(modelview); 
    modelview = mult(modelview, scale(12, 12, 1.25));
    benderHands.render();
}

function leftHand()
{
    modelview = initialmodelview; 
    modelview = mult(modelview, translate(24.0, 10.0, 0.0));
    modelview = mult(modelview, rotate(270.0, 0, 1, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(12, 12, 1.25));
    benderHands.render();
}

function leftArm()
{
    modelview = initialmodelview;
    modelview = mult(modelview, translate(16.5, 10.0, 0.0));
    modelview = mult(modelview, rotate(90.0, 0, 1, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(0.3, 0.3, 1.50));
    cylinder.render();
}

function rightArm()
{
    modelview = initialmodelview;
    modelview = mult(modelview, translate(-16.5, 10.0, 0.0));
    modelview = mult(modelview, rotate(90.0, 0, 1, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(0.3, 0.3, 1.50));
    cylinder.render();
}

function leftFoot()
{
    modelview = initialmodelview;
    modelview = mult(modelview, translate(3.0, -27.25, 0.0));
    modelview = mult(modelview, rotate(270.0, 1, 0, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(3, 3, 10));
    benderFoot.render();
}

function rightFoot()
{
    modelview = initialmodelview;
    modelview = mult(modelview, translate(-3.0, -27.25, 0.0));
    modelview = mult(modelview, rotate(270.0, 1, 0, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(3, 3, 10));
    benderFoot.render();
}

function leftLeg()
{
    modelview = initialmodelview;
    modelview = mult(modelview, translate(3.0, -18.0, 0.0));
    modelview = mult(modelview, rotate(90.0, 1, 0, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(0.3, 0.3, 1.88));
    cylinder.render();
}

function rightLeg()
{
    whiteMaterial();

    modelview = initialmodelview;
    modelview = mult(modelview, translate(-3.0, -18.0, 0.0));
    modelview = mult(modelview, rotate(90.0, 1, 0, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(0.3, 0.3, 1.88));
    cylinder.render();
}

function antenna()
{
    modelview = initialmodelview; 
    modelview = mult(modelview, translate(0.0,32.0,0.0));
    modelview = mult(modelview, rotate(270.0, 1, 0, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(0.05, 0.05, 0.1));
    cone.render();
}

function antennaPop()
{
    modelview = initialmodelview; 
    modelview = mult(modelview, translate(0.0,29.25,0.0));
    modelview = mult(modelview, rotate(270.0, 1, 0, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(1.0, 1.0, 2.0));
    benderFoot.render();
}

function antennaTop()
{
    modelview = initialmodelview; 
    modelview = mult(modelview, translate(0.0,33.0,0.0));
    modelview = mult(modelview, rotate(270.0, 1, 0, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(0.04, 0.04, 0.04));
    sphere.render();
}

function leftFootDisk()
{
    modelview = initialmodelview;
    modelview = mult(modelview, translate(3.0, -31.0, 0.0));
    modelview = mult(modelview, rotate(90.0, 1, 0, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(0.30, 0.30, 10));
    disk.render();
}

function rightFootDisk()
{
    modelview = initialmodelview;
    modelview = mult(modelview, translate(-3.0, -31.0, 0.0));
    modelview = mult(modelview, rotate(90.0, 1, 0, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(0.30, 0.30, 10));
    disk.render();
}

function leftHandDisk()
{
    modelview = initialmodelview;
    modelview = mult(modelview, translate(27.15, 10.0, 0.0));
    modelview = mult(modelview, rotate(90.0, 0, 1, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(0.30, 0.30, 10));
    disk.render();
}

function rightHandDisk()
{
    modelview = initialmodelview;
    modelview = mult(modelview, translate(-27.15, 10.0, 0.0));
    modelview = mult(modelview, rotate(270.0, 0, 1, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(0.30, 0.30, 10));
    disk.render();
}

function leftLegJoints()
{
    cursor = [3.0, -30.55, 0.0];
    for (var i = 0; i<6; ++i)
    {
        cursor = [cursor[0], cursor[1]+3.10, cursor[2]];
        benderLegsFlaFla.push(cursor);
    }

    for (var i = 0; i<6; ++i)
    {      
        modelview = initialmodelview;
        modelview = mult(modelview, translate(benderLegsFlaFla[i]));
        modelview = mult(modelview, rotate(90.0, 1, 0, 0));
        normalMatrix = extractNormalMatrix(modelview);
        modelview = mult(modelview, scale(0.5, 0.5, 0.5));
        thindisk.render();
    }
}

function rightLegJoints()
{
    cursor = [-3.0, -30.55, 0.0];
    for (var i = 0; i<6; ++i)
    {
        cursor = [cursor[0], cursor[1]+3.10, cursor[2]];
        benderLegsFlaFla.push(cursor);
    }

    for (var i = 6; i<12; ++i)
    {      
        modelview = initialmodelview;
        modelview = mult(modelview, translate(benderLegsFlaFla[i]));
        modelview = mult(modelview, rotate(90.0, 1, 0, 0));
        normalMatrix = extractNormalMatrix(modelview);
        modelview = mult(modelview, scale(0.5, 0.5, 0.5));
        thindisk.render();
    }
}

function leftArmJoints()
{
    cursor = [5.95, 10.0, 0.0];
    for(var i = 0; i<6; ++i)
    {
        cursor = [cursor[0]+3, cursor[1], cursor[2]];
        benderArmsFlaFla.push(cursor);
    }

    for (var i = 0; i<6; ++i)
    {      
        modelview = initialmodelview;
        modelview = mult(modelview, translate(benderArmsFlaFla[i]));
        modelview = mult(modelview, rotate(90.0, 0, 1, 0));
        normalMatrix = extractNormalMatrix(modelview);
        modelview = mult(modelview, scale(0.5, 0.5, 0.5));
        thindisk.render();
    }
}

function rightArmJoints()
{
    cursor = [-6.0, 10.0, 0.0];
    for(var i = 0; i<6; ++i)
    {
        cursor = [cursor[0]-3, cursor[1], cursor[2]];
        benderArmsFlaFla.push(cursor);
    }   

    for (var i = 6; i<12; ++i) 
    {      
        modelview = initialmodelview;
        modelview = mult(modelview, translate(benderArmsFlaFla[i]));
        modelview = mult(modelview, rotate(90.0, 0, 1, 0));
        normalMatrix = extractNormalMatrix(modelview);
        modelview = mult(modelview, scale(0.5, 0.5, 0.5));
        thindisk.render();
    }
}

function legLeftClip1()
{
    gl.uniform1i(noTexLoc, 0);
    greyMaterial();

    modelview = initialmodelview;
    modelview = mult(modelview, translate(2.30,-8.2,0.0));
    modelview = mult(modelview, rotate(0.0, 0, 1, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(.05, .08, .10));
    box.render();   

    gl.uniform1i(noTexLoc, 1);
}

function legLeftClip2()
{
    gl.uniform1i(noTexLoc, 0);
    greyMaterial();

    modelview = initialmodelview;
    modelview = mult(modelview, translate(3.70,-8.2,0.0));
    modelview = mult(modelview, rotate(0.0, 0, 1, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(.05, .08, .10));
    box.render();   

    gl.uniform1i(noTexLoc, 1);
}

function legRightClip1()
{
    gl.uniform1i(noTexLoc, 0);
    greyMaterial();

    modelview = initialmodelview;
    modelview = mult(modelview, translate(-2.3,-8.2,0.0));
    modelview = mult(modelview, rotate(0.0, 0, 1, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(.05, .08, .10));
    box.render(); 

    gl.uniform1i(noTexLoc, 1);
}

function legRightClip2()
{
    gl.uniform1i(noTexLoc, 0);
    greyMaterial();

    modelview = initialmodelview;
    modelview = mult(modelview, translate(-3.7,-8.2,0.0));
    modelview = mult(modelview, rotate(0.0, 0, 1, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(.05, .08, .10));
    box.render(); 

    gl.uniform1i(noTexLoc, 1);
}

function handLeftfinger1()
{
    modelview = initialmodelview;
    modelview = mult(modelview, translate(28.0,11.5,0.0));
    modelview = mult(modelview, rotate(90.0, 0, 1, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(0.15,.15, .18));
    cylinder.render(); 
}

function handLeftfinger2()
{
    modelview = initialmodelview;
    modelview = mult(modelview, translate(28.0,9.25,1.25));
    modelview = mult(modelview, rotate(90.0, 0, 1, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(0.15,.15, .18));
    cylinder.render(); 
}

function handLeftfinger3()
{
    modelview = initialmodelview;
    modelview = mult(modelview, translate(28.0,9.25,-1.25));
    modelview = mult(modelview, rotate(90.0, 0, 1, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(0.15,.15, .18));
    cylinder.render();
}

function handRightfinger1()
{
    modelview = initialmodelview;
    modelview = mult(modelview, translate(-28.0,11.5,0.0));
    modelview = mult(modelview, rotate(90.0, 0, 1, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(0.15,.15, .18));
    cylinder.render(); 
}

function handRightfinger2()
{
    modelview = initialmodelview;
    modelview = mult(modelview, translate(-28.0,9.25,1.25));
    modelview = mult(modelview, rotate(90.0, 0, 1, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(0.15,.15, .18));
    cylinder.render(); 
}

function handRightfinger3()
{
    modelview = initialmodelview;
    modelview = mult(modelview, translate(-28.0,9.25,-1.25));
    modelview = mult(modelview, rotate(90.0, 0, 1, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(0.15,.15, .18));
    cylinder.render();
}

function Visiere()
{
    modelview = initialmodelview;
    modelview = mult(modelview, translate(0.0,24.0,2.75));
    modelview = mult(modelview, rotate(90.0, 0, 1, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(0.15,.15, .5));
    visiere.render();
}

function leftEye()
{
    gl.uniform1i(noTexLoc, 1);

    gl.activeTexture(gl.TEXTURE3);
    gl.bindTexture(gl.TEXTURE_2D, eyes);
    gl.uniform1i(gl.getUniformLocation(prog, "texture"), 3);

    modelview = initialmodelview;
    modelview = mult(modelview, translate(1.4,24.0,8));
    modelview = mult(modelview, rotate(90.0, 0, 1, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(0.35,.06, .08));
    sphere.render();

    gl.uniform1i(noTexLoc, 0);
}

function rightEye()
{
    whiteMaterial();
    gl.uniform1i(noTexLoc, 1);

    gl.activeTexture(gl.TEXTURE3);
    gl.bindTexture(gl.TEXTURE_2D, eyes);
    gl.uniform1i(gl.getUniformLocation(prog, "texture"), 3);

    modelview = initialmodelview;
    modelview = mult(modelview, translate(-1.4,24.0,8));
    modelview = mult(modelview, rotate(90.0, 0, 1, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(0.35,.06, .08));
    sphere.render();

    gl.uniform1i(noTexLoc, 0);
}

function cigar()
{
    whiteMaterial();
    gl.uniform1i(noTexLoc, 1);

    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, cigarTex);
    gl.uniform1i(gl.getUniformLocation(prog, "texture"), 2);

    modelview = initialmodelview;
    modelview = mult(modelview, translate(0,20.0,21));
    modelview = mult(modelview, rotate(90.0, 0, 1, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(0.20,.03, .04));
    sphere.render();
    modelview = mult(modelview, rotate(90.0, 0, 1, 0));
    modelview = mult(modelview, translate(0,0,-5));
    modelview = mult(modelview, scale(2,2, .5));
    cylinder.render();

    gl.uniform1i(noTexLoc, 0);
}

function eyeHoles()
{
    blackMaterial();

    modelview = initialmodelview;
    modelview = mult(modelview, translate(0.0,24.0,2.6));
    modelview = mult(modelview, rotate(90.0, 0, 1, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(0.145,.145, .45));
    box.render(); 
}

function mouthPiece()
{
    whiteMaterial();

    gl.uniform1i(noTexLoc, 1);

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, mouth);
    gl.uniform1i(gl.getUniformLocation(prog, "texture"), 1);

    modelview = initialmodelview;
    modelview = mult(modelview, translate(0.0,20,1.9));
    modelview = mult(modelview, rotate(90.0, 1, 0, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(.25,.15, .145));
    sphere.render();
}

function leftArmPit()
{
    blackMaterial();

    modelview = initialmodelview; 
    modelview = mult(modelview, translate(5,10.0,0.0));
    modelview = mult(modelview, rotate(90.0, 0, 1, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(0.3, 0.3, 0.1));

    cylinder.render();  

    whiteMaterial();
}

function rightArmPit()
{
    blackMaterial();

    modelview = initialmodelview;
    modelview = mult(modelview, translate(-5,10.0,0.0));
    modelview = mult(modelview, rotate(270.0, 0, 1, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(0.3, 0.3, 0.1));

    cylinder.render();  

    whiteMaterial();
}

function antennaHole()
{
    blackMaterial();

    modelview = initialmodelview; 
    modelview = mult(modelview, translate(0.0,28.25,0.0));
    modelview = mult(modelview, rotate(270.0, 1, 0, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(0.1, 0.1, 0.1));

    cylinder.render();  

    whiteMaterial();
}

function neckHole()
{
    blackMaterial();

    modelview = initialmodelview;
    modelview = mult(modelview, translate(0.0,12,0.0));
    modelview = mult(modelview, rotate(270.0, 1, 0, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(0.6, 0.6,0.5));

    cylinder.render();  

    whiteMaterial();
}

function cigarBurn()
{
    whiteMaterial();

    gl.uniform1i(noTexLoc, 1);

    gl.activeTexture(gl.TEXTURE4);
    gl.bindTexture(gl.TEXTURE_2D, burn);
    gl.uniform1i(gl.getUniformLocation(prog, "texture"), 4);

    modelview = initialmodelview;
    modelview = mult(modelview, translate(0,20.0,22.75));
    modelview = mult(modelview, rotate(0.0, 0, 1, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(.07,.06, .04555));
    cylinder.render(); 

    gl.uniform1i(noTexLoc, 0);
}

function torsoHole()
{
    blackMaterial();

    modelview = initialmodelview;
    modelview = mult(modelview, translate(0.0,5.0,1.75));
    modelview = mult(modelview, rotate(90.0, 1, 0, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(0.9, 0.8, 1.25));

    cylinder.render();  
    whiteMaterial();
}

function neckArrow()
{
    greyMaterial();
    benderArrows = [];

    cursor = [0, 15, 0];
    for (var i = 0; i<6; ++i)
    {
        cursor = [cursor[0], cursor[1]+0.5, cursor[2]];
        benderArrows.push(cursor);
    }

    for (var i = 0; i<6; ++i)
    {      
        modelview = initialmodelview;
        modelview = mult(modelview, translate(benderArrows[i]));
        modelview = mult(modelview, rotate(90.0, 1, 0, 0));
        normalMatrix = extractNormalMatrix(modelview);
        modelview = mult(modelview, scale(0.010, 0.010, 0.025));
        box.render();
    }
}

function antennaArrow()
{
    greyMaterial();
    benderArrows = [];

    cursor = [0, 28, 0];
    for (var i = 0; i<6; ++i)
    {
        cursor = [cursor[0], cursor[1]+0.5, cursor[2]];
        benderArrows.push(cursor);
    }

    for (var i = 0; i<6; ++i)
    {      
        modelview = initialmodelview;
        modelview = mult(modelview, translate(benderArrows[i]));
        modelview = mult(modelview, rotate(90.0, 1, 0, 0));
        normalMatrix = extractNormalMatrix(modelview);
        modelview = mult(modelview, scale(0.010, 0.010, 0.025));
        box.render();
    }
}

function cigarArrow()
{
    greyMaterial();
    benderArrows = [];

    cursor = [0, 20, 3];
    for (var i = 0; i<32; ++i)
    {
        cursor = [cursor[0], cursor[1], cursor[2]+0.5];
        benderArrows.push(cursor);
    }

    for (var i = 0; i<32; ++i)
    {      
        modelview = initialmodelview;
        modelview = mult(modelview, translate(benderArrows[i]));
        modelview = mult(modelview, rotate(90.0, 1, 0, 0));
        normalMatrix = extractNormalMatrix(modelview);
        modelview = mult(modelview, scale(0.01, 0.025, 0.01));
        box.render();
    }
}

function leftLegArrow()
{
    greyMaterial();
    benderArrows = [];

    cursor = [3, -3, 0];
    for (var i = 0; i<12; ++i)
    {
        cursor = [cursor[0], cursor[1]-0.5, cursor[2]];
        benderArrows.push(cursor);
    }

    for (var i = 0; i<12; ++i)
    {      
        modelview = initialmodelview;
        modelview = mult(modelview, translate(benderArrows[i]));
        modelview = mult(modelview, rotate(90.0, 1, 0, 0));
        normalMatrix = extractNormalMatrix(modelview);
        modelview = mult(modelview, scale(0.010, 0.010, 0.025));
        box.render();
    }
}

function rightLegArrow()
{
    greyMaterial();
    benderArrows = [];

    cursor = [-3, -3, 0];
    for (var i = 0; i<10; ++i)
    {
        cursor = [cursor[0], cursor[1]-0.5, cursor[2]];
        benderArrows.push(cursor);
    }

    for (var i = 0; i<10; ++i)
    {      
        modelview = initialmodelview;
        modelview = mult(modelview, translate(benderArrows[i]));
        modelview = mult(modelview, rotate(90.0, 1, 0, 0));
        normalMatrix = extractNormalMatrix(modelview);
        modelview = mult(modelview, scale(0.010, 0.010, 0.025));
        box.render();
    }
}

function beer1()
{
    greenMaterial();

    modelview = initialmodelview;
    modelview = mult(modelview, translate(0.0,1.5,12));
    modelview = mult(modelview, rotate(90.0, 1, 0, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(0.25, 0.25, .5));

    cylinder.render();  
}

function beer2()
{
    modelview = initialmodelview;
    modelview = mult(modelview, translate(0.0,4,12));
    modelview = mult(modelview, rotate(90.0, 1, 0, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(0.125, 0.125, .125));

    sphere.render();
}

function beer3()
{
    modelview = initialmodelview;
    modelview = mult(modelview, translate(0.0,5.5,12));
    modelview = mult(modelview, rotate(90.0, 1, 0, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(0.1, 0.1, .3));

    cylinder.render();  
}

function beer4()
{
    modelview = initialmodelview;
    modelview = mult(modelview, translate(0.0,7,12));
    modelview = mult(modelview, rotate(90.0, 1, 0, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(0.125, 0.125, .05));

    cylinder.render(); 
    
}

function beer5()
{
    greyMaterial();

    modelview = initialmodelview;
    modelview = mult(modelview, translate(0.0,2,12));
    modelview = mult(modelview, rotate(90.0, 1, 0, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(0.275, 0.225, .25));

    cylinder.render();

    whiteMaterial();  
}


function popcornBox()
{
    gl.uniform1i(noTexLoc, 1);

    gl.activeTexture(gl.TEXTURE5);
    gl.bindTexture(gl.TEXTURE_2D, popcornBoxTex);
    gl.uniform1i(gl.getUniformLocation(prog, "texture"), 5);

    modelview = initialmodelview;
    modelview = mult(modelview, translate(0.0,2,19));
    modelview = mult(modelview, rotate(270.0, 0, 0, 1));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(0.6, 0.45, .25));

    visiere.render(); 

    gl.uniform1i(noTexLoc, 0);
}

function popcorn()
{
    gl.uniform1i(noTexLoc, 1);

    gl.activeTexture(gl.TEXTURE6);
    gl.bindTexture(gl.TEXTURE_2D, popcornTex);
    gl.uniform1i(gl.getUniformLocation(prog, "texture"), 6);

    modelview = initialmodelview;
    modelview = mult(modelview, translate(0.0,5,19));
    modelview = mult(modelview, rotate(270.0, 0, 0, 1));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(0.1, 0.45, .225));

    box.render();

    gl.uniform1i(noTexLoc, 0);
}

function torsoArrow()
{
    greyMaterial();
    benderArrows = [];

    cursor = [0, -1, 3];
    for (var i = 0; i<50; ++i)
    {
        cursor = [cursor[0], cursor[1], cursor[2]+0.5];
        benderArrows.push(cursor);
    }

    for (var i = 0; i<50; ++i)
    {      
        modelview = initialmodelview;
        modelview = mult(modelview, translate(benderArrows[i]));
        modelview = mult(modelview, rotate(90.0, 1, 0, 0));
        normalMatrix = extractNormalMatrix(modelview);
        modelview = mult(modelview, scale(0.01, 0.025, 0.01));
        box.render();
    }
}

function goldPile()
{
    goldMaterial();

    gl.uniform1i(noTexLoc, 1);

    gl.activeTexture(gl.TEXTURE7);
    gl.bindTexture(gl.TEXTURE_2D, goldTex);
    gl.uniform1i(gl.getUniformLocation(prog, "texture"), 7);

    modelview = initialmodelview;
    modelview = mult(modelview, translate(0.0,-0.5,25));
    modelview = mult(modelview, rotate(90.0, 1, 0, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(0.5, 0.1, 0.11));
    box.render();
    modelview = mult(modelview, translate(0.0,-15,0));
    box.render();
    modelview = mult(modelview, translate(0.0,30,0));
    box.render();
    modelview = mult(modelview, translate(0.0,-8,-10));
    box.render();
    modelview = mult(modelview, translate(0.0,-15,0));
    box.render();
    modelview = mult(modelview, translate(0.0,8,-10));
    box.render();

    gl.uniform1i(noTexLoc, 0);
}

function torsoDoor()
{
    whiteMaterial();

    gl.uniform1i(noTexLoc, 1);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, metal);
    gl.uniform1i(gl.getUniformLocation(prog, "texture"), 0);

    modelview = initialmodelview;
    modelview = mult(modelview, translate(-3.5,5,8));
    modelview = mult(modelview, rotate(0.0, 1, 0, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(0.05, 1.2555, 0.8));
    box.render();

    greyMaterial();

    modelview = initialmodelview;
    modelview = mult(modelview, translate(-3.5,5,11));
    modelview = mult(modelview, rotate(90.0, 0, 1, 0));
    normalMatrix = extractNormalMatrix(modelview);
    modelview = mult(modelview, scale(0.08,0.08, 0.065));
    cylinder.render();

    gl.uniform1i(noTexLoc, 0);
}

function render()
{
    gl.clearColor(0.79, 0.76, 0.27, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    projection = perspective(90.0, 1.0, 0.5, 200.0);

    flattenedmodelview = rotator.getViewMatrix();
    modelview = unflatten(flattenedmodelview);

	normalMatrix = extractNormalMatrix(modelview);
    initialmodelview = modelview;

    gl.useProgram(prog);

    gl.uniform4fv(gl.getUniformLocation(prog, "ambientProduct"), flatten(ambientProduct));
    gl.uniform4fv(gl.getUniformLocation(prog, "diffuseProduct"), flatten(diffuseProduct));
    gl.uniform4fv(gl.getUniformLocation(prog, "specularProduct"), flatten(specularProduct));
    gl.uniform1f(gl.getUniformLocation(prog, "shininess"), materialShininess);

    gl.uniform4fv(gl.getUniformLocation(prog, "lightPosition"), flatten(lightPosition));

    gl.uniformMatrix4fv(ProjectionLoc, false, flatten(projection));

	gl.enableVertexAttribArray(CoordsLoc);
    gl.enableVertexAttribArray(NormalLoc);
    gl.disableVertexAttribArray(TexCoordLoc); 

    traverse(torsoId);
}

function unflatten(matrix) 
{
    var result = mat4();
    result[0][0] = matrix[0]; result[1][0] = matrix[1]; result[2][0] = matrix[2]; result[3][0] = matrix[3];
    result[0][1] = matrix[4]; result[1][1] = matrix[5]; result[2][1] = matrix[6]; result[3][1] = matrix[7];
    result[0][2] = matrix[8]; result[1][2] = matrix[9]; result[2][2] = matrix[10]; result[3][2] = matrix[11];
    result[0][3] = matrix[12]; result[1][3] = matrix[13]; result[2][3] = matrix[14]; result[3][3] = matrix[15];

    return result;
}

function extractNormalMatrix(matrix) 
{
    var result = mat3();
    var upperleft = mat3();
    var tmp = mat3();

    upperleft[0][0] = matrix[0][0];
    upperleft[1][0] = matrix[1][0];
    upperleft[2][0] = matrix[2][0];

    upperleft[0][1] = matrix[0][1];
    upperleft[1][1] = matrix[1][1];
    upperleft[2][1] = matrix[2][1];

    upperleft[0][2] = matrix[0][2];
    upperleft[1][2] = matrix[1][2];
    upperleft[2][2] = matrix[2][2];

    tmp = matrixinvert(upperleft);
    result = transpose(tmp);

    return result;
}

function matrixinvert(matrix) 
{
    var result = mat3();

    var det = matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[2][1] * matrix[1][2]) -
                 matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) +
                 matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0]);

    var invdet = 1 / det;

    result[0][0] = (matrix[1][1] * matrix[2][2] - matrix[2][1] * matrix[1][2]) * invdet;
    result[0][1] = (matrix[0][2] * matrix[2][1] - matrix[0][1] * matrix[2][2]) * invdet;
    result[0][2] = (matrix[0][1] * matrix[1][2] - matrix[0][2] * matrix[1][1]) * invdet;
    result[1][0] = (matrix[1][2] * matrix[2][0] - matrix[1][0] * matrix[2][2]) * invdet;
    result[1][1] = (matrix[0][0] * matrix[2][2] - matrix[0][2] * matrix[2][0]) * invdet;
    result[1][2] = (matrix[1][0] * matrix[0][2] - matrix[0][0] * matrix[1][2]) * invdet;
    result[2][0] = (matrix[1][0] * matrix[2][1] - matrix[2][0] * matrix[1][1]) * invdet;
    result[2][1] = (matrix[2][0] * matrix[0][1] - matrix[0][0] * matrix[2][1]) * invdet;
    result[2][2] = (matrix[0][0] * matrix[1][1] - matrix[1][0] * matrix[0][1]) * invdet;

    return result;
}

function createModel(modelData) 
{
    var model = {};
    model.coordsBuffer = gl.createBuffer();
    model.normalBuffer = gl.createBuffer();
    model.textureBuffer = gl.createBuffer();
    model.indexBuffer = gl.createBuffer();
    model.count = modelData.indices.length;

    gl.bindBuffer(gl.ARRAY_BUFFER, model.coordsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, modelData.vertexPositions, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, model.normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, modelData.vertexNormals, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, model.textureBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, modelData.vertexTextureCoords, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, modelData.indices, gl.STATIC_DRAW);

    model.render = function () {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.coordsBuffer);
        gl.vertexAttribPointer(CoordsLoc, 3, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
        gl.vertexAttribPointer(NormalLoc, 3, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureBuffer);
        gl.vertexAttribPointer(TexCoordLoc, 2, gl.FLOAT, false, 0, 0);

        gl.enableVertexAttribArray(TexCoordLoc);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

        gl.uniformMatrix4fv(ModelviewLoc, false, flatten(modelview));
        gl.uniformMatrix3fv(NormalMatrixLoc, false, flatten(normalMatrix));

        gl.drawElements(gl.TRIANGLES, this.count, gl.UNSIGNED_SHORT, 0);
    }
    return model;
}

function createProgram(gl, vertexShaderSource, fragmentShaderSource) {
    var vsh = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vsh, vertexShaderSource);
    gl.compileShader(vsh);
    if (!gl.getShaderParameter(vsh, gl.COMPILE_STATUS)) {
        throw "Error in vertex shader:  " + gl.getShaderInfoLog(vsh);
    }
    var fsh = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fsh, fragmentShaderSource);
    gl.compileShader(fsh);
    if (!gl.getShaderParameter(fsh, gl.COMPILE_STATUS)) {
        throw "Error in fragment shader:  " + gl.getShaderInfoLog(fsh);
    }
    var prog = gl.createProgram();
    gl.attachShader(prog, vsh);
    gl.attachShader(prog, fsh);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        throw "Link error in program:  " + gl.getProgramInfoLog(prog);
    }
    return prog;
}

function getTextContent(elementID) 
{
    var element = document.getElementById(elementID);
    var fsource = "";
    var node = element.firstChild;
    var str = "";
    while (node) {
        if (node.nodeType == 3)
            str += node.textContent;
        node = node.nextSibling;
    }
    return str;
}

function initNodes(Id) 
{    
    var m = mat4();

    switch(Id) 
    {
        case torsoId :
            figure[torsoId] = createNode(torso, neckId, shoulderLeftId);
        break;
        case neckId :
            figure[neckId] = createNode(neck, headId, neckHoleId);
        break;
        case shoulderLeftId :
            figure[shoulderLeftId] = createNode(shoulderLeft, shoulderRightId, leftArmId);
        break;
        case shoulderRightId :
            figure[shoulderRightId] = createNode(shoulderRight, leftLegId, rightArmId);
        break;
        case headId :
            figure[headId] = createNode(head, null, headTopId);
        break;
        case headTopId :
            figure[headTopId] = createNode(headTop, null, antennaPopId);
        break;
        case antennaId :
            figure[antennaId] = createNode(antenna, null, antennaTopId);
        break;
        case antennaTopId :
            figure[antennaTopId] = createNode(antennaTop, null, VisiereId);
        break;
        case antennaPopId :
            figure[antennaPopId] = createNode(antennaPop, null, antennaId);
        break;
        case leftArmId :
            figure[leftArmId] = createNode(leftArm, null, leftHandId);
        break;
        case rightArmId :
            figure[rightArmId] = createNode(rightArm, null, rightHandID);
        break;
        case leftHandId :
            figure[leftHandId] = createNode(leftHand, null, leftHandDiskId);
        break;
        case rightHandID :
            figure[rightHandID] = createNode(rightHand, null, rightHandDiskId);
        break;
        case leftLegId :
            figure[leftLegId] = createNode(leftLeg, rightLegId, leftFootId);
        break;
        case rightLegId :
            figure[rightLegId] = createNode(rightLeg, null, rightFootId);
        break;
        case leftFootId :
            figure[leftFootId] = createNode(leftFoot, null, leftFootDiskId);
        break
        case rightFootId :
            figure[rightFootId] = createNode(rightFoot, null, rightFootDiskId);
        break;
        case leftHandDiskId :
            figure[leftHandDiskId] = createNode(leftHandDisk, null, leftArmJointsId);
        break;
        case rightHandDiskId :
            figure[rightHandDiskId] = createNode(rightHandDisk, null, rightArmJointsId);
        break;
        case leftFootDiskId :
            figure[leftFootDiskId] = createNode(leftFootDisk, null, leftLegJointsId);
        break;
        case rightFootDiskId :
            figure[rightFootDiskId] = createNode(rightFootDisk, null, rightLegJointsId);
        break;
        case leftLegJointsId :
            figure[leftLegJointsId] = createNode(leftLegJoints, null, legLeftClip1Id);
        break;
        case rightLegJointsId :
            figure[rightLegJointsId] = createNode(rightLegJoints, null, legRightClip1Id);
        break;
        case leftArmJointsId :
            figure[leftArmJointsId] = createNode(leftArmJoints, null, handLeftfinger1Id);
        break;
        case rightArmJointsId :
            figure[rightArmJointsId] = createNode(rightArmJoints, null, handRightfinger1Id);
        break;
        case legLeftClip1Id :
            figure[legLeftClip1Id] = createNode(legLeftClip1, legLeftClip2Id, null);
        break;
        case legLeftClip2Id :
            figure[legLeftClip2Id] = createNode(legLeftClip2, null, rightLegArrowId);
        break;
        case legRightClip1Id :
            figure[legRightClip1Id] = createNode(legRightClip1, legRightClip2Id, null);
        break;
        case legRightClip2Id :
            figure[legRightClip2Id] = createNode(legRightClip2, null, leftLegArrowId);
        break;
        case handLeftfinger1Id :
            figure[handLeftfinger1Id] = createNode(handLeftfinger1, handLeftfinger2Id, null);
        break;
        case handLeftfinger2Id :
            figure[handLeftfinger2Id] = createNode(handLeftfinger2, handLeftfinger3Id, null);
        break;
        case handLeftfinger3Id :
            figure[handLeftfinger3Id] = createNode(handLeftfinger3, null, leftArmPitId);
        break;
        case handRightfinger1Id :
            figure[handRightfinger1Id] = createNode(handRightfinger1, handRightfinger2Id, null);
        break;
        case handRightfinger2Id :
            figure[handRightfinger2Id] = createNode(handRightfinger2, handRightfinger3Id, null);
        break;
        case handRightfinger3Id :
            figure[handRightfinger3Id] = createNode(handRightfinger3, null, rightArmPitId);
        break;
        case VisiereId :
            figure[VisiereId] = createNode(Visiere, null, leftEyeId);
        break;
        case leftEyeId :
            figure[leftEyeId] = createNode(leftEye, rightEyeId, cigarId);
        break;
        case rightEyeId :
            figure[rightEyeId] = createNode(rightEye, eyeHolesId, mouthPieceId);
        break;
        case cigarId :
            figure[cigarId] = createNode(cigar, cigarBurnId, antennaHoleId);
        break;
        case mouthPieceId :
            figure[mouthPieceId] = createNode(mouthPiece, null, null);
        break;
        case eyeHolesId :
            figure[eyeHolesId] = createNode(eyeHoles, null, null);
        break;
        case leftArmPitId :
            figure[leftArmPitId] = createNode(leftArmPit, null, null);
        break;
        case rightArmPitId :
            figure[rightArmPitId] = createNode(rightArmPit, null, null);
        break;
        case neckHoleId :
            figure[neckHoleId] = createNode(neckHole, torsoHoleId, neckArrowId);
        break;
        case antennaHoleId :
            figure[antennaHoleId] = createNode(antennaHole, null, antennaArrowId);
        break;
        case cigarBurnId :
            figure[cigarBurnId] = createNode(cigarBurn, null, cigarArrowId);
        break;
        case torsoHoleId :
            figure[torsoHoleId] = createNode(torsoHole, null, null);
        break;
        case neckArrowId :
            figure[neckArrowId] = createNode(neckArrow, null, null);
        break;
        case antennaArrowId :
            figure[antennaArrowId] = createNode(antennaArrow, null, null);
        break;
        case cigarArrowId :
            figure[cigarArrowId] = createNode(cigarArrow, null, beer1Id);
        break;
        case leftLegArrowId :
            figure[leftLegArrowId] = createNode(leftLegArrow, null, null);
        break;
        case rightLegArrowId :
            figure[rightLegArrowId] = createNode(rightLegArrow, null, null);
        break;
        case beer1Id :
            figure[beer1Id] = createNode(beer1, null, beer2Id);
        break;
        case beer2Id :
            figure[beer2Id] = createNode(beer2, null, beer3Id);
        break;
        case beer3Id :
            figure[beer3Id] = createNode(beer3, null, beer4Id);
        break;        
        case beer4Id :
            figure[beer4Id] = createNode(beer4, null, beer5Id);
        break;
        case beer5Id :
            figure[beer5Id] = createNode(beer5, null, popcornBoxId);
        break;
        case popcornBoxId :
            figure[popcornBoxId] = createNode(popcornBox, null, popcornId);
        break;
        case popcornId :
            figure[popcornId] = createNode(popcorn, null, goldPileId);
        break;
        case torsoArrowId :
            figure[torsoArrowId] = createNode(torsoArrow, null, TorsoDoorId);
        break;
        case goldPileId :
            figure[goldPileId] = createNode(goldPile, null, torsoArrowId);
        break;
        case TorsoDoorId :
            figure[TorsoDoorId] = createNode(torsoDoor, null, null);
        break;
    }
}

function createNode(render, sibling, child)
{
    var node = {
    render: render,
    sibling: sibling,
    child: child,
    }
    return node;
}

function traverse(Id) 
{
    if(Id == null) return; 
    figure[Id].render();
    if(figure[Id].child != null) traverse(figure[Id].child); 
    if(figure[Id].sibling != null) traverse(figure[Id].sibling); 
}

window.onload = function init() 
{
    try
    {
        var canvas = document.getElementById("glcanvas");
        gl = canvas.getContext("webgl");
        if (!gl) {
            gl = canvas.getContext("experimental-webgl");
        }
        if (!gl) {
            throw "Could not create WebGL context.";
        }

        var vertexShaderSource = getTextContent("vshader");
        var fragmentShaderSource = getTextContent("fshader");
        prog = createProgram(gl, vertexShaderSource, fragmentShaderSource);

        gl.useProgram(prog);

        CoordsLoc = gl.getAttribLocation(prog, "vcoords");
        NormalLoc = gl.getAttribLocation(prog, "vnormal");
        TexCoordLoc = gl.getAttribLocation(prog, "vtexcoord");

        ModelviewLoc = gl.getUniformLocation(prog, "modelview");
        ProjectionLoc = gl.getUniformLocation(prog, "projection");
        NormalMatrixLoc = gl.getUniformLocation(prog, "normalMatrix");
        noTexLoc = gl.getUniformLocation(prog, "fnoTexture");

        gl.enableVertexAttribArray(CoordsLoc);
        gl.enableVertexAttribArray(NormalLoc);
        gl.enableVertexAttribArray(TexCoordLoc);

        gl.enable(gl.DEPTH_TEST);

        rotator = new SimpleRotator(canvas, render);
        rotator.setView([0.75, 0.75, 1], [0 ,1, 0], 50);

        sphere = createModel(uvSphere(10.0, 25.0, 25.0));
        box = createModel(cube(10.0));
        disk = createModel(ring(0.0, 10.0, 25.0));
        cone = createModel(uvCone(10.0, 20.0, 25.0, true));
        cylinder = createModel(uvCylinder(5.0, 10.0, 50.0, false, false));
        benderFoot = createModel(uvBenderSpecialParts(1.0, 0.75, 30.0, false));
        benderneck = createModel(uvBenderSpecialParts(1.0, 0.75, 30.0, false));
        benderHands = createModel(uvBenderSpecialParts(0.25,5, 30.0, false));
        benderMouthPiece = createModel(uvBenderSpecialParts(1.0,1.0,30.0, true));
        visiere = createModel(visiere(10.0));
        thindisk = createModel(uvTorus(3.3, 3.0, 30.0, 50.0));
        goldBar = createModel(gold(10.0));
		
        initTexture();

        ambientProduct = mult(lightAmbient, materialAmbient);
        diffuseProduct = mult(lightDiffuse, materialDiffuse);
        specularProduct = mult(lightSpecular, materialSpecular);

        for(i=0; i<numNodes; i++) initNodes(i);
        render();
    }
    catch (e) 
    {
        document.getElementById("message").innerHTML =
             "Could not initialize WebGL: " + e;
        return;
    }
    setInterval(render, 1000);
}

function initTexture() 
{
    metal = gl.createTexture();
    metal.isloaded = false; 

    metal.image = new Image();
    metal.image.onload = function () {
        handleLoadedTexture(metal)
    }
    metal.image.src = "Textures/steel.jpg";

    mouth = gl.createTexture();
    mouth.isloaded = false; 

    mouth.image = new Image();
    mouth.image.onload = function () {
        handleLoadedTexture(mouth)
    }
    mouth.image.src = "Textures/quadrille.jpg";

    cigarTex = gl.createTexture();
    cigarTex.isloaded = false; 

    cigarTex.image = new Image();
    cigarTex.image.onload = function () {
        handleLoadedTexture(cigarTex)
    }
    cigarTex.image.src = "Textures/cigar.jpg";

    eyes = gl.createTexture();
    eyes.isloaded = false; 

    eyes.image = new Image();
    eyes.image.onload = function () {
        handleLoadedTexture(eyes)
    }
    eyes.image.src = "Textures/eyes.jpg";

    burn = gl.createTexture();
    burn.isloaded = false; 

    burn.image = new Image();
    burn.image.onload = function () {
        handleLoadedTexture(burn)
    }
    burn.image.src = "Textures/burn.jpg";

    popcornBoxTex = gl.createTexture();
    popcornBoxTex.isloaded = false; 

    popcornBoxTex.image = new Image();
    popcornBoxTex.image.onload = function () {
        handleLoadedTexture(popcornBoxTex)
    }
    popcornBoxTex.image.src = "Textures/popcornBox.jpg";

    popcornTex = gl.createTexture();
    popcornTex.isloaded = false; 

    popcornTex.image = new Image();
    popcornTex.image.onload = function () {
        handleLoadedTexture(popcornTex)
    }
    popcornTex.image.src = "Textures/popcorn.jpg";

    goldTex = gl.createTexture();
    goldTex.isloaded = false; 

    goldTex.image = new Image();
    goldTex.image.onload = function () {
        handleLoadedTexture(goldTex)
    }
    goldTex.image.src = "Textures/gold.jpg";
}

function handleLoadedTexture(texture) 
{
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

    texture.isloaded = true;

    render();

    gl.bindTexture(gl.TEXTURE_2D, null);
}

function whiteMaterial()
{
    ambientProduct = mult(lightAmbient, whiteAmbient);
    diffuseProduct = mult(lightDiffuse, whiteDiffuse);
    specularProduct = mult(lightSpecular, whiteSpecular);
    gl.uniform4fv(gl.getUniformLocation(prog, "ambientProduct"), flatten(ambientProduct));
    gl.uniform4fv(gl.getUniformLocation(prog, "diffuseProduct"), flatten(diffuseProduct));
    gl.uniform4fv(gl.getUniformLocation(prog, "specularProduct"), flatten(specularProduct));
}

function blackMaterial()
{
    ambientProduct = mult(lightAmbient, blackAmbient);
    diffuseProduct = mult(lightDiffuse, blackDiffuse);
    specularProduct = mult(lightSpecular, blackSpecular);
    gl.uniform4fv(gl.getUniformLocation(prog, "ambientProduct"), flatten(ambientProduct));
    gl.uniform4fv(gl.getUniformLocation(prog, "diffuseProduct"), flatten(diffuseProduct));
    gl.uniform4fv(gl.getUniformLocation(prog, "specularProduct"), flatten(specularProduct));
}

function greyMaterial()
{
    ambientProduct = mult(lightAmbient, greyAmbient);
    diffuseProduct = mult(lightDiffuse, greyDiffuse);
    specularProduct = mult(lightSpecular, greySpecular);
    gl.uniform4fv(gl.getUniformLocation(prog, "ambientProduct"), flatten(ambientProduct));
    gl.uniform4fv(gl.getUniformLocation(prog, "diffuseProduct"), flatten(diffuseProduct));
    gl.uniform4fv(gl.getUniformLocation(prog, "specularProduct"), flatten(specularProduct));
}

function greenMaterial()
{
    ambientProduct = mult(lightAmbient, greenAmbient);
    diffuseProduct = mult(lightDiffuse, greenDiffuse);
    specularProduct = mult(lightSpecular, greenSpecular);
    gl.uniform4fv(gl.getUniformLocation(prog, "ambientProduct"), flatten(ambientProduct));
    gl.uniform4fv(gl.getUniformLocation(prog, "diffuseProduct"), flatten(diffuseProduct));
    gl.uniform4fv(gl.getUniformLocation(prog, "specularProduct"), flatten(specularProduct));
}

function goldMaterial()
{
    ambientProduct = mult(lightAmbient, goldAmbient);
    diffuseProduct = mult(lightDiffuse, goldDiffuse);
    specularProduct = mult(lightSpecular, goldSpecular);
    gl.uniform4fv(gl.getUniformLocation(prog, "ambientProduct"), flatten(ambientProduct));
    gl.uniform4fv(gl.getUniformLocation(prog, "diffuseProduct"), flatten(diffuseProduct));
    gl.uniform4fv(gl.getUniformLocation(prog, "specularProduct"), flatten(specularProduct));
}