import * as THREE from 'three';

//const scene = new THREE.scene();

// Create an empty scene
var renderer = new THREE.WebGLRenderer();
var scene = new THREE.Scene();

// Create a basic perspective camera

//var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var camera = new THREE.OrthographicCamera(-5,5,-5,5,0.1,1000);
camera.position.z = 5;

// Create a renderer with Antialiasing

//var renderer = new THREE.WebGLRenderer({antialias:true});

// Configure renderer clear color

renderer.setClearColor("#00000F");

// Configure renderer size

renderer.setSize( window.innerWidth, window.innerHeight );

// Append Renderer to DOM

document.body.appendChild( renderer.domElement );

// ------------------------------------------------

// FUN STARTS HERE

// ------------------------------------------------

// Create a Cube Mesh with basic material

var geometry = new THREE.BoxGeometry( 1, 1, 1 );

var material = new THREE.MeshBasicMaterial( { color: "" } );

var cube = new THREE.Mesh( geometry, material );

// Add cube to Scene

scene.add( cube );

// Render Loop

var render = function () {

//  requestAnimationFrame( render );


    
//    cube.rotation.x += 0.01;
//    cube.rotation.y += 0.01;
//    cube.translateX(2);
//    cube.rotation.y = Math.PI/4;
    var v = 3
    for(var i = 0 ; i<=v;i++)
    {
        var newCube = cube.clone();
        newCube.rotation.x = i*(360/v)*(Math.PI/180);
        
        newCube.translateY(2.0);
        scene.add(newCube);
      }
     // renderer.render(scene , camera);
  
    
  // Render the scene

  renderer.render(scene, camera);

};



render();