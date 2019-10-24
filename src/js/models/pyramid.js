'use strict'

export default class Pyramid {

    constructor(size = 7) {

        // set properties

        this.materials = {
            sandstone: new THREE.MeshLambertMaterial({ color: 0xffffaa })
        }
        this.mesh = new THREE.Object3D()
        this.mesh.name = this.type = 'pyramid'
        this.meshes = []

        this.size = size

        // init

        this.init()

    }

    init() {

        let geometry = new THREE.ConeBufferGeometry(this.size, this.size, 4)
        this.mesh = new THREE.Mesh(geometry, this.materials.sandstone)

        this.mesh.position.set(-2, 2, 2)
        this.mesh.rotateX(Math.PI * 0.52)
        this.mesh.rotateY(Math.PI * 0.4)

        this.mesh.castShadow = true
        this.mesh.receiveShadow = true

    }

    render() {

        

    }

}
