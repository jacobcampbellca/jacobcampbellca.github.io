//Variables for setup
function object() {
  var container = document.querySelector(".scene");

  var fov = 90;
  var aspect = container.clientWidth / container.clientHeight;
  var near = 0.1;
  var far = 1000;

  //Load object
  let objectLoader = new THREE.GLTFLoader();
  objectLoader.load("object/scene.gltf", function(gltf) {
    scene.add(gltf.scene);
    man = gltf.scene.children[0];
    man.position.x = 10;
    man.position.y = 10;
    man.rotation.x = 90;
    man.rotation.y = 3;
    animateMan();
  });

}

function moon() {
    var container = document.querySelector(".scene");
  
    var fov = 90;
    var aspect = container.clientWidth / container.clientHeight;
    var near = 0.1;
    var far = 1000;
  
    //Load object
    let moonLoader = new THREE.GLTFLoader();
    moonLoader.load("moon/scene.gltf", function(gltf) {
      scene.add(gltf.scene);
      moon = gltf.scene.children[0];
      moon.position.z = -50;
      moon.position.x = -80;
      moon.position.y = -80;
      moon.rotation.y = 3;
      animateMoon();
    });
  
}


function main() {
  var container = document.querySelector(".scene");

  //Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  
  container.appendChild(renderer.domElement);

  //Create scene
  scene = new THREE.Scene();

  var fov = 90;
  var aspect = container.clientWidth / container.clientHeight;
  var near = 0.1;
  var far = 1000;

  //Camera setup
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(3, 1, 35);


  var ambient = new THREE.AmbientLight(0x404040, 0);
  scene.add(ambient);

  var light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(50, 50, 100);
  scene.add(light);

  //Load object
  let objectLoader = new THREE.GLTFLoader();
  objectLoader.load("background/scene.gltf", function(gltf) {
    scene.add(gltf.scene);
    space = gltf.scene.children[0];
    animateSpace();
  });
  object();
  moon();
}






function animateSpace() {
  requestAnimationFrame(animateSpace);
  space.rotation.z += -0.001;
  renderer.render(scene, camera);
}

function animateMan() {
    requestAnimationFrame(animateMan);
    man.rotation.y += 0.01;
    renderer.render(scene, camera);
}

function animateMoon() {
    requestAnimationFrame(animateMoon);
    moon.rotation.x += 0.0001;
    moon.rotation.z += 0.001;
}

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

main();

window.addEventListener("resize", onWindowResize);