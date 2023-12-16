<script lang="ts">
  import { T, useTask, useThrelte } from '@threlte/core';
  import { OrbitControls, Grid, Text } from '@threlte/extras';
  import { tick } from 'svelte';

  import { PARAMS } from './params';

  const { renderStage, autoRender, renderer, scene, camera } = useThrelte();

  export let diameter = 5;

  autoRender.set(false);
  useTask(
    async () => {
      await tick();
      renderer.render(scene, camera.current);
    },
    { stage: renderStage, autoInvalidate: false }
  );

  console.log('diameter', diameter);
  console.log('store diameter', $PARAMS.diameter);
  let color = $PARAMS.color;
</script>

<T.PerspectiveCamera makeDefault position={[-10, 20, 10]} fov={15}>
  <OrbitControls
    enableZoom={false}
    enablePan={false}
    enableDamping
    autoRotate
    autoRotateSpeed={1.5}
  />
</T.PerspectiveCamera>

<Grid sectionColor="#FF3E00" />
<Text text={'test'} {color} anchorX={0} anchorY={0} />
<T.DirectionalLight intensity={0.8} position.x={10} position.y={10} />
<T.AmbientLight intensity={0.02} />
<T.Mesh scale={1 * diameter}>
  <T.SphereGeometry args={[1, 32, 32]} />
  <T.MeshStandardMaterial color={'#faf00'} roughness={0.2} />
</T.Mesh>
