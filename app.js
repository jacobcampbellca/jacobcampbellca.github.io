//Variables for setup
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


  var ambient = new THREE.AmbientLight(0x404040, 0);
  scene.add(ambient);

  var light = new THREE.DirectionalLight(0xffffff, 5);
  light.position.set(50, 50, 100);
  scene.add(light);

  //Load object
  let objectLoader = new THREE.GLTFLoader();
  objectLoader.load("background/scene.gltf", function(gltf) {
    scene.add(gltf.scene);
    space = gltf.scene.children[0];
    animateSpace();
  });
}

function object() {
  var container = document.querySelector(".scene");

  var fov = 90;
  var aspect = container.clientWidth / container.clientHeight;
  var near = 0.1;
  var far = 1000;

  //Camera setup
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, -1, 30);

  

  //Load object
  let objectLoader = new THREE.GLTFLoader();
  objectLoader.load("object/scene.gltf", function(gltf) {
    scene.add(gltf.scene);
    man = gltf.scene.children[0];
    animateMan();
  });

}


function animateSpace() {
  requestAnimationFrame(animateSpace);
  space.rotation.z += -0.001;
  renderer.render(scene, camera);
}

function animateMan() {
    requestAnimationFrame(animateMan);
    man.rotation.x = 2.1;
    man.rotation.y += 0.01;
    man.rotation.z += 0;
    renderer.render(scene, camera);
  }

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

main();
object();
window.addEventListener("resize", onWindowResize);