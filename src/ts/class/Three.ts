//** ThreeSlide */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// glslファイルの読み込み
import vertexShader from "./glsl/vertex.glsl?raw";
import fragmentShader from "./glsl/fragment.glsl?raw";

// gsapの読み込み
import { gsap } from "gsap";

export class Three {
  constructor() {
    // canvasの設定
    const target = document.getElementById("myCanvas");
    const canvas = target?.querySelector("canvas");
    const width = 960;
    const height = 540;

    if (canvas) {
      // レンダラーを作成
      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
      });
      // アスペクト比
      renderer.setPixelRatio(window.devicePixelRatio);
      // canvasサイズ
      renderer.setSize(width, height);
      // 背景色
      renderer.setClearColor(0xffffff);

      // シーンを作成
      const scene = new THREE.Scene();

      // カメラを作成
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

      // ジオメトリー作成
      const geometry = new THREE.BoxGeometry(20, 20, 20);
      // const geometry = new THREE.PlaneGeometry(20, 20);

      // テクスチャー用の画像を非同期で読み込む
      let img = null;
      let img2 = null;

      // テクスチャ用画像を非同期で読み込む
      img = this.fetchData("/_assets/img/top/sample.png");
      img2 = this.fetchData("/_assets/img/top/sample01.png");
      // 画像が読み込めた場合の処理(Promise型で返ってくるのでthen()でResultの値を取り出す)
      img
        .then((img) => {
          img2.then((img2) => {
            const material = new THREE.ShaderMaterial({
              uniforms: {
                uTexFirst: { value: img },
                uTexSecond: { value: img2 },
                uProgress: { value: 0 },
                uNoiseScale: { value: new THREE.Vector2(2, 2) },
              },
              vertexShader,
              fragmentShader,
            });
            // const material = new THREE.MeshBasicMaterial({ map: img });
            // const material = new THREE.MeshLambertMaterial({ color: 0x3fff9d });

            // メッシュを作成
            const mesh = new THREE.Mesh(geometry, material);

            // 3D空間にメッシュを追加
            scene.add(mesh);

            // マウスコントロール
            const control = new OrbitControls(camera, renderer.domElement);
            // もし慣性が必要ならenableDamping、もしくはautoRotateをtrueにする
            control.enableDamping = true;
            control.autoRotate = true;

            // サイズ感
            camera.position.z = 50;

            // アニメーション
            function animate() {
              // enableDampingをtrueにした場合は、updateする
              control.update();
              requestAnimationFrame(animate);
              mesh.rotation.x = mesh.rotation.x + 0.01;
              mesh.rotation.y += 0.01;

              renderer.render(scene, camera);
            }
            animate();

            // canvasをレスポンシブ対応させる
            function onResize() {
              if (target) {
                // サイズを取得
                const width = target.clientWidth;
                const height = target.clientHeight;

                // レンダラーのサイズを調整する
                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.setSize(width, height);

                // カメラのアスペクト比を正す
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
              }
            }
            // ウィンドウ初期化のために実行
            onResize();
            // リサイズイベント発生時に実行
            window.addEventListener("resize", onResize);

            // オブジェクトのクリックイベントを取得する関数
            let mouse: THREE.Vector2;
            let raycaster: THREE.Raycaster;
            let clickFlg = false;

            function setControll() {
              //マウス座標管理用のベクトル
              mouse = new THREE.Vector2();

              //レイキャストを生成
              raycaster = new THREE.Raycaster();

              // マウスの座標取得
              canvas?.addEventListener("mousemove", handleMouseMove);
              function handleMouseMove(event: { currentTarget: any; clientX: number; clientY: number }) {
                const element = event.currentTarget;

                //canvas上のマウスのXY座標
                const x = event.clientX - element.offsetLeft;
                const y = event.clientY - element.offsetTop;

                //canvasの幅と高さを取得
                const w = element.offsetWidth;
                const h = element.offsetHeight;

                //マウス座標を-1〜1の範囲に変換
                mouse.x = (x / w) * 2 - 1;
                mouse.y = -(y / h) * 2 + 1;
              }

              // クリックイベント
              canvas?.addEventListener("click", handleClick);
              function handleClick(event: any) {
                console.log("クリックしたよ");
                console.log(clickFlg);
                if (clickFlg) {
                  console.log("オブジェクトをクリック");
                  gsap.to(material.uniforms.uProgress, {
                    value: !Boolean(material.uniforms.uProgress.value),
                    duration: 1.0,
                    ease: "Power2.inOut",
                  });
                }
              }
            }
            setControll();

            // ポインタの先に光源を設定し、オブジェクトと交差したらtrueを返す関数
            function rendering() {
              requestAnimationFrame(rendering);

              //マウス位置からまっすぐに伸びる光線ベクトルを生成
              raycaster.setFromCamera(mouse, camera);

              //光線と交差したオブジェクトを取得
              const intersects = raycaster.intersectObjects(scene.children, false);

              //光線と交差したオブジェクトがある場合
              if (intersects.length > 0) {
                clickFlg = true;
                //交差したオブジェクトを取得
                // const obj = intersects[0].object;
              } else {
                clickFlg = false;
              }
              renderer.render(scene, camera);
            }
            rendering();
          });
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    }
  }

  // 非同期でテクスチャ用の画像を読み込む
  async fetchData(url: string) {
    const texLoader = new THREE.TextureLoader();
    try {
      // texLoaderが非同期処理なのでawait
      const texture = await texLoader.loadAsync(url);
      return texture;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
}
