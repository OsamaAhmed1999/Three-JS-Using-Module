import * as THREE from 'three';

var OrbitControls = require('three-orbitcontrols');

//Scene
var scene = new THREE.Scene();

//Perspective Camera
var camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0,-15,15);
camera.lookAt(new THREE.Vector3(0,0,0))

//Orthographic Camera
//var camera = new THREE.OrthographicCamera(-10,10,10,-10,0.1,1000)
//camera.position.z = 1;

//Render
var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setClearColor("#FF0000");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var controls = new THREE.OrbitControls( camera, renderer.domElement );

//Grid
var size = 4, step = 1;
var geometryGrid = new THREE.Geometry();
var materialGrid = new THREE.LineBasicMaterial({color:0xcccccc, opacity: 0.2})

console.log("run")
for(var i = -size; i<= size; i+=step){
    //XY plane for 2D working
    geometryGrid.vertices.push(new THREE.Vector3(-size,i,0));
    geometryGrid.vertices.push(new THREE.Vector3(size,i,0));
    geometryGrid.vertices.push(new THREE.Vector3(i, -size,0));
    geometryGrid.vertices.push(new THREE.Vector3(i, size, 0));
    
//    //XZ plane for 3D working
//    geometryGrid.vertices.push(new THREE.Vector3(-size, 0, i));
//    geometryGrid.vertices.push(new THREE.Vector3(size,0 , i));
//    geometryGrid.vertices.push(new THREE.Vector3(i,0, -size));
//    geometryGrid.vertices.push(new THREE.Vector3(i, 0, size));

}
var line = new THREE.LineSegments(geometryGrid, materialGrid)
scene.add(line);


var render = function () {
    //Transformation
//    Triangle();
//    Cube();
    Box();

  renderer.render(scene, camera);

};

function Cube(){
    
    var geometryCube = new THREE.BoxGeometry(1,1,1);
    var materialCube = new THREE.MeshBasicMaterial({color: "#433F81"})
    var cube = new THREE.Mesh(geometryCube,materialCube);
    cube.position.set(0,0,0);
    cube.rotation.set(0,0,0);
    cube.scale.set(0.5,0.5,0.5);
    
    scene.add(cube);
}

function Triangle(){
    var geometryTri = new THREE.Geometry();
    var materialTri = new THREE.MeshBasicMaterial({color: 0xff00ff, opacity:0.2});
    geometryTri.vertices.push(new THREE.Vector3(3, 0, 0));
    geometryTri.vertices.push(new THREE.Vector3(0, 3, 0));
    geometryTri.vertices.push(new THREE.Vector3(-3, 0, 0));
    geometryTri.faces.push(new THREE.Face3(0, 1, 2));

    var triangle = new THREE.Mesh(geometryTri, materialTri);
    triangle.position.set(0.0, 0.0, 0.0);

    scene.add(triangle);
    
//    TRANSFORMATON ON TRIANGLE
    
    /*var m1 = new THREE.Matrix4().makeTranslation(3,-3,0);
    var m2 = new THREE.Matrix4();
    var m3= new THREE.Matrix4();

    var sx = 2.0/3.0;
    var sy = Math.sqrt(3)/2;
    var sz = 1.0;

    m2.set(sx,0,0,0,
          0,sy,0,0,
          0,0,sz,0,
          0,0,0,1);

    var xshear = -1.0/Math.sqrt(3.0)
    var yshear = 1;
    var zshear = 1;
    m3.set(1,xshear,0,0,
          0,yshear,0,0,
          0,0,zshear,0,
          0,0,0,1);
    

    var m = new THREE.Matrix4();
    m = m.multiply(m2)
        .multiply(m2).multiply(m1);
    console.log(m);

    var newTriangle = triangle.clone();
    newTriangle.matrixAutoUpdate = false;
    var color = 0xffffff;
    newTriangle.material.color.setHex(color);
    newTriangle.applyMatrix(m);
    newTriangle.verticesNeedUpdate = true;

    scene.add(newTriangle);*/
}

function Box(){
    var geometryBox = new THREE.Geometry();
    var materialBox = new THREE.LineBasicMaterial({color: 0x00ff00, opacity: 0.2, side: THREE.DoubleSide});
    geometryBox.vertices.push(new THREE.Vector3(0,0,0));
    geometryBox.vertices.push(new THREE.Vector3(2,1,0));
    geometryBox.vertices.push(new THREE.Vector3(0,5,0));
    geometryBox.vertices.push(new THREE.Vector3(-2,4,0));
    geometryBox.faces.push(new THREE.Face3(0, 1, 2));
    geometryBox.faces.push(new THREE.Face3(0, 2, 3));
    var boxPolygon = new THREE.Mesh(geometryBox, materialBox);
    boxPolygon.position.set(0.0,0.0,0.0);
    scene.add(boxPolygon);

    var scaleMatrix = new THREE.Matrix4();
    var sx = 1.0/2.0
    var sy = 1.0/5.0
    scaleMatrix.set(sx,0,0,0,
          0,sy,0,0,
          0,0,1,0,
          0,0,0,1);

    boxPolygon.matrixAutoUpdate = false;
    var R = new THREE.Matrix4().makeTranslation(0,0,0).makeRotationZ(-26.57*Math.PI/180);
    var SR= scaleMatrix.multiply(R);
    boxPolygon.applyMatrix(SR);
    boxPolygon.verticesNeedUpdate = true;
    var newPolygon = boxPolygon.clone();
    var color = 0xffffff;
    boxPolygon.material.color.setHex(color);

    scene.add(newPolygon)
}

render();