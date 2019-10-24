'use strict'

export default class Sandplain {

    constructor(radius, segments = 64) {

        // set properties

        this.radius = radius
        this.segments = segments

        this.materials = {
            sand: new THREE.MeshPhongMaterial({ color: COLORS.beige })
        }
        this.mesh = new THREE.Object3D()
        this.mesh.name = this.type = 'sandplain'
        this.meshes = []

        // init

        this.init()

    }

    init() {

        // We want our hemisphere to be a bit below half a sphere
        // a default hemisphere would have a multiplier "0.5"

        let multiplier = 0.465

        let hemisphereGeometry = new THREE.SphereBufferGeometry(this.radius, this.segments, Math.round(this.segments / 4), 0, Math.PI * 2, 0, Math.PI * multiplier)
        let hemisphere = new THREE.Mesh(hemisphereGeometry, this.materials.sand)

        let capGeometry = new THREE.CircleBufferGeometry(this.radius * 0.99, this.segments)
        let cap = new THREE.Mesh(capGeometry, this.materials.sand)

        // Manipulate the cap to match the hemisphere
        // If we'd have a default hemisphere, the
        // y-position wouldn't need any modifications

        cap.rotateX(Math.PI * 0.5)
        cap.position.y = 1.9
        hemisphere.add(cap)

        hemisphere.rotateX(Math.PI * -multiplier)

        this.mesh.add(hemisphere)

    }

    render() {



    }

}
