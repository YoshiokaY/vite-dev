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

//       // ジオメトリー作成
//       const geometry = new THREE.BoxGeometry(20, 20, 20);

//       // テクスチャー用の画像を非同期で読み込む
//       let img = null;
//       img = this.fetchData("/_assets/img/top/sample.png");
//       // 画像が読み込めた場合の処理(Promise型で返ってくるのでthen()でResultの値を取り出す)
//       img
//         .then((img) => {
//           const material = new THREE.MeshBasicMaterial({ map: img });
//           // const material = new THREE.MeshLambertMaterial({ color: 0x3fff9d });

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
//       let mouse: THREE.Vector2;
//       let raycaster: THREE.Raycaster;
//       let clickFlg = false;
//       setControll();

//       function setControll() {
//         //マウス座標管理用のベクトル
//         mouse = new THREE.Vector2();

//         //レイキャストを生成
//         raycaster = new THREE.Raycaster();
//         canvas?.addEventListener("mousemove", handleMouseMove);

//         //マウスイベントを登録
//         canvas?.addEventListener("click", handleClick);

//         function handleMouseMove(event: { currentTarget: any; clientX: number; clientY: number }) {
//           const element = event.currentTarget;

//           //canvas上のマウスのXY座標
//           const x = event.clientX - element.offsetLeft;
//           const y = event.clientY - element.offsetTop;

//           //canvasの幅と高さを取得
//           const w = element.offsetWidth;
//           const h = element.offsetHeight;

//           //マウス座標を-1〜1の範囲に変換
//           mouse.x = (x / w) * 2 - 1;
//           mouse.y = -(y / h) * 2 + 1;
//         }
//         function handleClick(event: any) {
//           console.log("クリックしたよ");
//           console.log(clickFlg);
//           if (clickFlg) {
//             console.log("オブジェクトをクリック");
//             camera.position.z = 10;
//           }
//         }
//       }
//       rendering();
//       function rendering() {
//         requestAnimationFrame(rendering);

//         //マウス位置からまっすぐに伸びる光線ベクトルを生成
//         raycaster.setFromCamera(mouse, camera);

//         //光線と交差したオブジェクトを取得
//         const intersects = raycaster.intersectObjects(scene.children, false);

//         //光線と交差したオブジェクトがある場合
//         if (intersects.length > 0) {
//           clickFlg = true;
//           //交差したオブジェクトを取得
//           // const obj = intersects[0].object;
//         } else {
//           clickFlg = false;
//         }
//         renderer.render(scene, camera);
//       }
//     }
//     //canvasを取得
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
