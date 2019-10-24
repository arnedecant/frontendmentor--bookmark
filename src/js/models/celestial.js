'use strict'

export default class Celestial {

    constructor(state = 'sun', position = { x: 0, y: 0, z: 0 }) {

        // set properties

        this.state = state
        this.position = position

        this.materials = {
            sun: new THREE.MeshPhongMaterial({ color: COLORS.yellow, emissive: COLORS.yellow }),
            moon: new THREE.MeshPhongMaterial({ color: COLORS.white, emissibe: COLORS.white })
        }

        this.lights = {
            sun: new THREE.PointLight(COLORS.yellow, 1, 50, 2),
            moon: new THREE.PointLight(COLORS.white, 1, 50),
        }

        this.mesh = new THREE.Object3D()
        this.mesh.name = 'celestial'
        this.meshes = []

        this.radius = 2
        this.segments = 64

        // init

        this.init()

    }

    init() {

        // add sphere

        this.createSphere()

        // add light

        this.mesh.add(this.lights[this.state])

        // set shadow properties

        this.meshes.forEach((obj) => {

            obj.mesh.castShadow = true
            obj.mesh.receiveShadow = false

            this.mesh.add(obj.mesh)

        })

        // set position

        this.mesh.position.set(this.position.x, this.position.y, this.position.z)

    }

    createSphere() {

        let geometry = new THREE.SphereBufferGeometry(this.radius, this.segments, this.segments)
        let mesh = new THREE.Mesh(geometry, this.materials[this.state])

        mesh.name = 'celestial--sphere'

        this.meshes.push({ type: 'sphere', mesh: mesh })

    }

    render() {



    }

}
