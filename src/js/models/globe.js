'use strict'

import SandPlain from './sandplain.js'
import Pyramid from './pyramid.js'
import Celestial from './celestial.js'

export default class Globe {

    constructor() {

        // set properties

        this.materials = {
            glass: new THREE.MeshStandardMaterial({ 
                color: COLORS.white, 
                opacity: 0.2, 
                transparent: true,
                roughness: 0.1,
                metalness: 0.1,
                reflectivity: 1.0
            })
        }

        this.mesh = new THREE.Object3D()
        this.mesh.name = 'globe'
        this.meshes = []

        this.radius = 15
        this.segments = 64

        // init

        this.init()

    }

    init() {

        this.createSphere()
        this.createSandPlain()
        this.createPyramid()
        this.createCelestial()

        this.meshes.forEach((obj) => {

            obj.mesh.castShadow = true
            obj.mesh.receiveShadow = true

            this.mesh.add(obj.mesh)

        })

    }

    createSphere() {

        let geometry = new THREE.SphereBufferGeometry(this.radius, this.segments, this.segments)
        let mesh = new THREE.Mesh(geometry, this.materials.glass)

        // mesh.position.set(0.5, 0.1, 0)
        mesh.name = 'globe--sphere'

        this.meshes.push({ type: 'sphere', mesh: mesh })

    }

    createSandPlain() {

        this.sandplain = new SandPlain(this.radius - 0.2, this.segments)
        this.meshes.push(this.sandplain)

    }

    createPyramid() {

        this.pyramid = new Pyramid()
        this.meshes.push(this.pyramid)

    }

    createCelestial() {

        this.celestial = new Celestial('sun', { x: 5, y: 4, z: 10 })
        this.meshes.push(this.celestial)

    }

    render() {



    }

}
