let scene, camera, renderer, cabinet;

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1e1e1e);

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(100, 100, 150);
    
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(100, 100, 100);
    scene.add(directionalLight);

    createCabinet(110, 40, 35);
    
    animate();
}

function createCabinet(height, width, depth) {
    if (cabinet) {
        cabinet.traverse((child) => {
            if (child.isMesh) {
                child.geometry.dispose();
                child.material.dispose();
            }
        });
        scene.remove(cabinet);
    }

    const material = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.5 });

    const bodyGeometry = new THREE.BoxGeometry(width, height, depth);
    const body = new THREE.Mesh(bodyGeometry, material);

    const drawerGeometry = new THREE.BoxGeometry(width, 15, depth);
    const drawer = new THREE.Mesh(drawerGeometry, material);
    drawer.position.y = height / 2 - 7.5;

    cabinet = new THREE.Group();
    cabinet.add(body, drawer);
    scene.add(cabinet);
}

function updateCabinet() {
    const height = parseFloat(document.getElementById("height").value);
    const width = parseFloat(document.getElementById("width").value);
    const depth = parseFloat(document.getElementById("depth").value);
    createCabinet(height, width, depth);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

init();