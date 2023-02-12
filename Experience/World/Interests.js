import * as THREE from 'three'
import Experience from '../Experience.js'
import { EventEmitter } from 'events'

export default class Interests {
  constructor() {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.camera = this.experience.camera
    this.debug = this.experience.debug

    // Debug
    if(this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('interest1')
    }

    this.obj = {
      x: 4,
      y: 1.2,
      z: 0.5
    }

    // Setup
    this.points = []
    this.raycaster = new THREE.Raycaster()
    this.setInterests()
  }

  setInterests() {
    this.points = [
      {
        position: new THREE.Vector3(4, 1.2, 0.5),
        element: document.querySelector('.point-0')
      },
      {
        position: new THREE.Vector3(-3.75, 1.2, 0.3),
        element: document.querySelector('.point-1')
      },
      {
        position: new THREE.Vector3(-3.75, 1.2, -0.3),
        element: document.querySelector('.point-2')
      }
    ]

    // Debug
    if(this.debug.active) {
      this.debugFolder
        .add(this.points[1].position, 'x')
        .name('x')
        .min(-10)
        .max(10)
        .step(0.01)

        this.debugFolder
        .add(this.points[1].position, 'y')
        .name('y')
        .min(-10)
        .max(10)
        .step(0.01)

        this.debugFolder
        .add(this.points[1].position, 'z')
        .name('z')
        .min(-10)
        .max(10)
        .step(0.01)

        this.debugFolder
        .add(this.points[2].position, 'x')
        .name('x2')
        .min(-10)
        .max(10)
        .step(0.01)

        this.debugFolder
        .add(this.points[2].position, 'y')
        .name('y2')
        .min(-10)
        .max(10)
        .step(0.01)

        this.debugFolder
        .add(this.points[2].position, 'z')
        .name('z2')
        .min(-10)
        .max(10)
        .step(0.01)
    }
  }

  resize() {}

  update() {
      for(const point of this.points) {
        const screenPosition = point.position.clone()
        screenPosition.project(this.camera.orthographicCamera)

        this.raycaster.setFromCamera(screenPosition, this.camera.orthographicCamera)
        const intersects = this.raycaster.intersectObjects(this.scene.children, true)

        if(intersects.length === 0) {
          point.element.classList.add('visible')
        } else {
          const intersectionDistance = intersects[0].distance
          const pointDistance = point.position.distanceTo(this.camera.orthographicCamera.position)

          if(intersectionDistance < pointDistance) {
            point.element.classList.remove('visible')
          } else {
            point.element.classList.add('visible')
          }
        }

        const translateX = screenPosition.x * this.sizes.width * 0.5
        const translateY = - screenPosition.y * this.sizes.height * 0.5
        point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
      }
  }
}