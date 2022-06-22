import * as THREE from '/build/three.module.js'
import {OrbitControls} from '/jsm/controls/OrbitControls.js'
import Stats from '/jsm/libs/stats.module.js'

// import * as THREE from '../node_modules/three/build/three.module.js'
// import {OrbitControls} from '../node_modules/three/examples/jsm/controls/OrbitControls.js'
// import Stats from '../node_modules/three/examples/jsm/libs/stats.module.js'

let scene = new THREE.Scene()

const fov = 60
const aspect = window.innerWidth / window.innerHeight
const near = 0.1
const far = 1000
const canvas = document.querySelector('#webGL')

let camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.z = 2
scene.add(camera)

let renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.autoClear = false
renderer.setClearColor(0x000000, 0.0)

const controls = new OrbitControls(camera, renderer.domElement)

const earthGeometry = new THREE.SphereGeometry(0.6, 32, 32)
const earthMaterial = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load('./texture/earthmap_hires.jpg'),
    bumpMap: new THREE.TextureLoader().load('./texture/earthbump.jpg'),
    bumpScale: 0.05
})
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial)
scene.add(earthMesh)

const cloudGeometry = new THREE.SphereGeometry(0.61, 32, 32)
const cloudMaterial = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load('./texture/earthCloud.png'),
    transparent: true
})
const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial)
scene.add(cloudMesh)

const starGeometry = new THREE.SphereGeometry(80, 64, 64)
const starMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('./texture/galaxy.png'),
    side: THREE.BackSide
})
const starMesh = new THREE.Mesh(starGeometry, starMaterial)
scene.add(starMesh)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.set(5, 3, 5)
scene.add(pointLight)

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer()
}, false)

const stats = Stats()
document.body.appendChild(stats.dom)

const animate = () => {
    requestAnimationFrame(animate)
    earthMesh.rotation.y -= 0.0015
    cloudMesh.rotation.y -= 0.001
    starMesh.rotation.y -= 0.002
    controls.update()
    renderer.render(scene, camera)
}

animate()