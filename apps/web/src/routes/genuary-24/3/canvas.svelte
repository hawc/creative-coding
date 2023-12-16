<script lang="ts">
  import { Canvas, T, useTask, useThrelte } from '@threlte/core';
  import { OrbitControls, interactivity, transitions } from '@threlte/extras';
  import { tick } from 'svelte';

  import { PARAMS } from './params';

  interactivity();
  transitions();

  const { renderStage, autoRender, renderer, scene, camera } = useThrelte();

  export let diameter = 1;
  autoRender.set(false);
  useTask(
    async () => {
      await tick();
      renderer.render(scene, camera.current);
    },
    { stage: renderStage, autoInvalidate: false }
  );
</script>

<Canvas>
  <T.PerspectiveCamera makeDefault position={[-10, 20, 10]} fov={15}>
    <OrbitControls
      enableZoom={false}
      enablePan={false}
      enableDamping
      autoRotate
      autoRotateSpeed={1.5}
    />
  </T.PerspectiveCamera>

  <T.DirectionalLight intensity={0.8} position.x={10} position.y={10} />
  <T.AmbientLight intensity={0.02} />

  <T.Mesh scale={1 * diameter}>
    <T.SphereGeometry args={[1, 32 * diameter, 32 * $PARAMS.diameter]} />
    <T.MeshStandardMaterial color={$PARAMS.color} roughness={0.2} />
  </T.Mesh>
</Canvas>
