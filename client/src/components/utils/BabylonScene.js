import React, { Component } from "react";
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";

class BabylonScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      engine: null,
      scene: null
    };
  }

  componentDidMount = () => {
    let engine = new BABYLON.Engine(this.mount, true);
    let scene = this.createScene();

    engine.runRenderLoop(() => {
      scene.render();
    });
    console.log(scene);

    window.addEventListener("resize", () => {
      engine.resize();
    });

    this.engine = engine;
    this.scene = scene;
  };

  createScene = engine => {
    // Create a basic BJS Scene object.
    let scene = new BABYLON.Scene(engine);

    // Create a FreeCamera, and set its position to (x:0, y:5, z:-10).
    let camera = new BABYLON.ArcRotateCamera(
      "camera",
      0,
      0,
      0,
      new BABYLON.Vector3(0, 5, -10),
      scene
    );

    // Target the camera to scene origin.
    camera.setTarget(BABYLON.Vector3.Zero());

    // Attach the camera to the canvas.
    camera.attachControl(this.mount, false);
    camera.lowerRadiusLimit = 5;
    camera.upperRadiusLimit = 30;

    // Create a basic light, aiming 0,1,0 - meaning, to the sky.
    /*
    var hdrTexture = new BABYLON.HDRCubeTexture("assets/hdr/factory.hdr", scene, 1024);

    var sphere = BABYLON.Mesh.CreateSphere("sphere1", 32, 100, scene);
    var sphereMtl = new BABYLON.PBRMaterial("sphereMtl", scene);
    sphereMtl.reflectionTexture = hdrTexture;
    sphereMtl.backFaceCulling = false;
    sphere.material = sphereMtl;*/

    var skybox = BABYLON.Mesh.CreateBox("skyBox", 800.0, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.HDRCubeTexture(
      "assets/hdr/kitchen.hdr",
      scene,
      1024
    );
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;

    /*
    scene.createDefaultEnvironment();

    scene.environmentTexture = new BABYLON.CubeTexture(
      "https://assets.babylonjs.com/environments/environmentSpecular.env",
      scene
    );*/

    var pbr = new BABYLON.PBRMaterial("pbr", scene);

    pbr.albedoColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    pbr.metallic = 1.0; // set to 1 to only use it from the metallicRoughnessTexture
    pbr.roughness = 0.0; // set to 1 to only use it from the metallicRoughnessTexture
    pbr.reflectionTexture = new BABYLON.HDRCubeTexture("assets/hdr/kitchen.hdr", scene, 1024);
    pbr.useRoughnessFromMetallicTextureAlpha = false;
    pbr.useRoughnessFromMetallicTextureGreen = true;
    pbr.useMetallnessFromMetallicTextureBlue = true;

    BABYLON.SceneLoader.Append("assets/3d/", "can.gltf", scene, function(scene) {
      pbr.backFaceCulling = scene.meshes[2].material.backFaceCulling;
      pbr.sideOrientation = scene.meshes[2].material.sideOrientation;

      //scene.meshes[0].material = pbr;
      //scene.meshes[1].material = pbr;
      scene.meshes[2].material = pbr;
      scene.meshes[3].material = pbr;
    });

    console.log(scene);

    // Return the created scene.
    return scene;
  };

  componentDidUpdate() {
    //let myMaterial = new BABYLON.StandardMaterial("myMaterial", this.scene);
    let myMaterial = new BABYLON.PBRMaterial("pbr2", this.scene);
    //myMaterial.diffuseColor = new BABYLON.Color3(1, 0, 1);
    //myMaterial.diffuseTexture = new BABYLON.Texture(this.props.img, this.scene);
    //myMaterial.diffuseTexture.uScale = 1;
    //myMaterial.diffuseTexture.vScale = -1;
    myMaterial.albedoTexture = new BABYLON.Texture(this.props.img, this.scene);
    myMaterial.albedoTexture.vScale = -1;
    myMaterial.metallic = 0;
    myMaterial.roughness = 1.0;
    myMaterial.backFaceCulling = this.scene.meshes[2].material.backFaceCulling;
    myMaterial.sideOrientation = this.scene.meshes[2].material.sideOrientation;
    myMaterial.reflectionTexture = new BABYLON.HDRCubeTexture(
      "assets/hdr/factory.hdr",
      this.scene,
      1024
    );
    myMaterial.useRoughnessFromMetallicTextureAlpha = false;
    myMaterial.useRoughnessFromMetallicTextureGreen = true;
    myMaterial.useMetallnessFromMetallicTextureBlue = true;

    //this.scene.meshes[0].material = myMaterial;
    this.scene.meshes[2].material = myMaterial;
    //this.scene.meshes[2].material = myMaterial;

    console.log(this.scene);
  }

  render() {
    return <canvas style={{ width: "500px", height: "500px" }} ref={c => (this.mount = c)} />;
  }
}

export default BabylonScene;
