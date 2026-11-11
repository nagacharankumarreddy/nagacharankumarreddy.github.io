import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import type { MutableRefObject } from "react";
import * as THREE from "three";

export interface RibbonState {
  target: number;
  current: number;
  velocity: number;
}

const CARD_W = 2;
const CARD_H = 1.12;
const CARD_STEP = CARD_W + 0.14;

const vertexShader = /* glsl */ `
  uniform float uVelocity;
  uniform float uTime;
  uniform float uPhase;
  uniform float uHalf;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec4 world = modelMatrix * vec4(position, 1.0);

    // An S-shaped wave fixed to the screen: the centre card stays flat, the edges bend up or down.
    float speed = clamp(uVelocity * 14.0, -1.0, 1.0);
    float n = world.x / uHalf;
    float edge = smoothstep(0.12, 1.15, abs(n));
    float amp = 0.42 + abs(speed) * 0.35;

    world.y += amp * edge * sin(n * 2.2 + uPhase);
    world.y += sin(world.x * 1.4 + uTime * 0.8) * 0.025;
    world.z -= 0.2 * n * n;

    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uMap;
  uniform vec2 uCover;
  uniform vec2 uSize;
  varying vec2 vUv;

  void main() {
    vec2 uv = (vUv - 0.5) * uCover + 0.5;
    vec3 color = texture2D(uMap, uv).rgb;

    vec2 p = (vUv - 0.5) * uSize;
    float r = 0.035;
    vec2 q = abs(p) - uSize * 0.5 + r;
    float dist = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
    float alpha = 1.0 - smoothstep(-0.006, 0.006, dist);

    gl_FragColor = vec4(color, alpha);
    #include <colorspace_fragment>
  }
`;

interface RibbonProps {
  images: string[];
  state: MutableRefObject<RibbonState>;
  onActive: (index: number) => void;
}

const Ribbon = ({ images, state, onActive }: RibbonProps) => {
  const textures = useLoader(THREE.TextureLoader, images);
  const group = useRef<THREE.Group>(null);
  const activeIndex = useRef(-1);
  const viewportWidth = useThree((three) => three.viewport.width);
  const scale = Math.min(1, viewportWidth / 2.9);

  const geometry = useMemo(() => new THREE.PlaneGeometry(CARD_W, CARD_H, 48, 12), []);
  const materials = useMemo(
    () =>
      textures.map((texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = 8;
        const image = texture.image as { width: number; height: number };
        const imageAspect = image.width / image.height;
        const planeAspect = CARD_W / CARD_H;
        const cover =
          imageAspect > planeAspect
            ? new THREE.Vector2(planeAspect / imageAspect, 1)
            : new THREE.Vector2(1, imageAspect / planeAspect);

        return new THREE.ShaderMaterial({
          uniforms: {
            uMap: { value: texture },
            uCover: { value: cover },
            uSize: { value: new THREE.Vector2(CARD_W, CARD_H) },
            uVelocity: { value: 0 },
            uTime: { value: 0 },
            uPhase: { value: 0 },
            uHalf: { value: 2.5 },
          },
          vertexShader,
          fragmentShader,
          transparent: true,
        });
      }),
    [textures]
  );

  useEffect(
    () => () => {
      geometry.dispose();
      materials.forEach((material) => material.dispose());
      textures.forEach((texture) => texture.dispose());
    },
    [geometry, materials, textures]
  );

  useFrame((_, delta) => {
    const s = state.current;
    const previous = s.current;
    s.current += (s.target - s.current) * Math.min(1, delta * 5);
    s.velocity += (s.current - previous - s.velocity) * 0.18;

    if (group.current) group.current.position.x = -s.current * CARD_STEP * scale;
    // The wave's shape drifts as the ribbon travels, so the edges alternate between rising and dipping.
    const phase = Math.sin(s.current * 1.3) * 0.9;
    for (const material of materials) {
      material.uniforms.uVelocity.value = s.velocity;
      material.uniforms.uTime.value += delta;
      material.uniforms.uPhase.value = phase;
      material.uniforms.uHalf.value = viewportWidth / 2;
    }

    const index = Math.min(images.length - 1, Math.max(0, Math.round(s.current)));
    if (index !== activeIndex.current) {
      activeIndex.current = index;
      onActive(index);
    }
  });

  return (
    <group ref={group} scale={scale}>
      {materials.map((material, i) => (
        <mesh key={i} geometry={geometry} material={material} position-x={i * CARD_STEP} />
      ))}
    </group>
  );
};

interface SceneProps extends RibbonProps {
  running: boolean;
}

const CurvedCarouselScene = ({ running, ...ribbon }: SceneProps) => (
  <Canvas
    camera={{ position: [0, 0, 3.2], fov: 35 }}
    dpr={[1, 1.75]}
    gl={{ antialias: true, alpha: true }}
    frameloop={running ? "always" : "never"}
  >
    <Suspense fallback={null}>
      <Ribbon {...ribbon} />
    </Suspense>
  </Canvas>
);

export default CurvedCarouselScene;
