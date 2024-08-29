// //** ThreeSlide */
// import test from "node:test";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// export class Three {
//   constructor() {
//     // サイズを指定
//     const width = 960;
//     const height = 540;

//     // レンダラーを作成
//     const target = document.getElementById("myCanvas");
//     const canvas = target?.querySelector("canvas");
//     if (canvas) {
//       const renderer = new THREE.WebGLRenderer({
//         canvas: canvas,
//       });
//       renderer.setPixelRatio(window.devicePixelRatio);
//       renderer.setSize(width, height);
//       // 背景色を変更する
//       renderer.setClearColor(0xffffff);

//       // シーンを作成
//       const scene = new THREE.Scene();

//       // カメラを作成
//       const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

//       // DirectionalLight: 並行に照らすライト
//       // 第一引数：色、第二引数:強度
//       const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
//       // ライトをあてる方向を指定できる
//       // x,y,z軸をそれぞれ設定し、そこから原点(0,0,0)に向かってライトが照らされる
//       directionalLight.position.set(0, 10, 10);
//       // 原点(0,0,0)に向かって照らすのではなくズラしたいときはtargetを使う
//       directionalLight.target.position.set(5, 0, 0);

//       // ジオメトリー作成
//       const geometry = new THREE.BoxGeometry(20, 20, 20);

//       // テクスチャー用の画像を非同期で読み込む
//       const img = this.fetchData("/_assets/img/top/sample.png");
//       // 画像が読み込めた場合の処理(Promise型で返ってくるのでthen()でResultの値を取り出す)
//       img
//         .then((img) => {
//           // const material = new THREE.MeshBasicMaterial({ map: img });
//           const material = new THREE.MeshStandardMaterial({ color: 0x3fff9d, roughness: 0 });

//           // メッシュを作成
//           const mesh = new THREE.Mesh(geometry, material);
//           // 3D空間にメッシュを追加
//           scene.add(mesh);

//           // カメラ、キャンバスのDOMエレメント
//           const control = new OrbitControls(camera, renderer.domElement);
//           // 3. もし慣性が必要ならenableDamping、もしくはautoRotateをtrueにする
//           control.enableDamping = true;
//           control.autoRotate = true;

//           camera.position.z = 50;

//           function animate() {
//             // 4. enableDampingをtrueにした場合は、updateする
//             control.update();
//             requestAnimationFrame(animate);
//             mesh.rotation.x = mesh.rotation.x + 0.01;
//             mesh.rotation.y += 0.01;

//             renderer.render(scene, camera);
//           }
//           animate();
//         })
//         .catch((error) => {
//           console.log(error);
//           return;
//         });
//       // mapを使ってtextureを設定

//       // 初期化のために実行

//       onResize();
//       // リサイズイベント発生時に実行
//       window.addEventListener("resize", onResize);

//       function onResize() {
//         if (target) {
//           // サイズを取得
//           const width = target.clientWidth;
//           const height = target.clientHeight;

//           // レンダラーのサイズを調整する

//           renderer.setPixelRatio(window.devicePixelRatio);
//           renderer.setSize(width, height);

//           // カメラのアスペクト比を正す
//           camera.aspect = width / height;
//           camera.updateProjectionMatrix();
//         }
//       }
//     }
//   }
//   async fetchData(url: string) {
//     const texLoader = new THREE.TextureLoader();
//     try {
//       // texLoaderが非同期処理なのでawait
//       const texture = await texLoader.loadAsync(url);
//       return texture;
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   }
// }
