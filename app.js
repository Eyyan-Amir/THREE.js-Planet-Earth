
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(90 , window.innerWidth / window.innerHeight , 0.1 , 1000);
let renderer = new THREE.WebGLRenderer({antialais : true});

camera.position.set(0,0,100);


window.addEventListener("resize",()=>{
    renderer.setSize(window.innerWidth,innerHeight);
    camera.aspects = (window.innerWidth / window.innerHeight);
    camera.updateProjectionMatrix();
})

renderer.setSize(window.innerWidth,innerHeight);
document.body.appendChild(renderer.domElement);

let controls = new THREE.OrbitControls(camera,renderer.domElement);
controls.update();
controls.enableDamping = true;
controls.screenSpacePanning = false;
controls.autoRotate = true,
controls.autoRotateSpeed =.6,
controls.enabled = true,
controls.zoomSpeed = 0.6,
// controls.enableZoom = false,
// controls.dampingFactor = 2,
// controls.minDistance = 100;
// controls.maxDistance = 500;
controls.maxPolarAngle = Math.PI / 2;


scene.add(new THREE.AmbientLight(0x333333));

var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5,3,5);
scene.add(light);

let box = new THREE.SphereGeometry(30,30,30);
let material = new THREE.MeshPhongMaterial();
let mesh = new THREE.Mesh(box, material);
material.map = THREE.ImageUtils.loadTexture('img/earth.jpg');
material.bumpMap   = THREE.ImageUtils.loadTexture('img/texture.jpg');     
material.bumpScale = 0.05;
material.specularMap = THREE.ImageUtils.loadTexture('img/bW.jpg')

mesh.position.set(-1,-1,0)
scene.add (mesh )

const box2 = new THREE.SphereGeometry( .7, 4 ,4 );
let material2 = new THREE.MeshBasicMaterial( { color: 0xffffff , wireframe : false } );
for(let i = 0 ; i < 6000 ; i++){
    let mesh2 = new THREE.Mesh(box2 , material2);
    mesh2.position.x = Math.random() * 600 -300;
    mesh2.position.y = Math.random() * 600 -300;
    mesh2.position.z = Math.random() * 600 -300;

    scene.add (mesh2 )
}

const update =()=>{

    mesh.rotation.x += 0.05;
    mesh.rotation.y += 0.05;
    // mesh2.rotation.z += 0.05;
}
const render=()=>{
renderer.render(scene,camera)
}
const animate=()=>{
    requestAnimationFrame(animate);
    render();
    controls.update()
    // update();
}
animate()