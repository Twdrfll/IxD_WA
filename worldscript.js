const scene = new THREE.Scene();
const canvasContainer = document.getElementById('globe');
const camera = new THREE.PerspectiveCamera(75, canvasContainer.offsetWidth / canvasContainer.offsetHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer(
    {
        antialias: true,
        canvas: document.getElementById('globeCanvas')
    }
);
renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const sphere = new THREE.Mesh(new THREE.SphereGeometry(5, 50, 50), new THREE.ShaderMaterial({
    vertexShader:
    'varying vec2 vertexUV; varying vec3 vertexNormal; void main() { vertexUV = uv; vertexNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1); }',
    fragmentShader:
    'uniform sampler2D globeTexture; varying vec2 vertexUV; varying vec3 vertexNormal; void main() { float intensity = 1.05 - dot(vertexNormal, vec3(0.0, 0.0, 1.0)); vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity, 1.5); gl_FragColor = vec4(atmosphere + texture2D(globeTexture, vertexUV).xyz, 1.0); }',
    uniforms: {
        globeTexture: {
            value: new THREE.TextureLoader().load('immagini/globe.jpeg')
        }
    }
}));

const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(5, 50, 50), new THREE.ShaderMaterial({
    vertexShader:
    'varying vec3 vertexNormal; void main() { vertexNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader:
    'varying vec3 vertexNormal; void main() { float intensity = pow(0.75 - dot(vertexNormal, vec3(0, 0, 1.0)), 2.0); gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity; }',
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide
}));

atmosphere.scale.set(1.1, 1.1, 1.1);

scene.add(atmosphere);

const group = new THREE.Group();
group.add(sphere);
scene.add(group);

const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff
})

const starVertices = [];

for(i = 0; i < 1000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = - Math.random() * 2000;
    starVertices.push(x, y, z);
}

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

camera.position.z = 15

const mouse = {
    x: undefined,
    y: undefined
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    sphere.rotation.y += 0.001;
}
animate()