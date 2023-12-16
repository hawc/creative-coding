<script lang="ts">
  import { T } from '@threlte/core';
  import { OrbitControls, Text } from '@threlte/extras';

  import type { Config } from '$lib/client/canvasUtils';
  import { debug } from '$lib/store';

  export let object: Config;
</script>

<T.PerspectiveCamera makeDefault position={[-10, 20, 10]} fov={15}>
  <OrbitControls
    enableZoom={$debug}
    enablePan={$debug}
    enableDamping
    autoRotate
    autoRotateSpeed={1.5}
  />
</T.PerspectiveCamera>

<Text
  scale={100 * object.diameter.value}
  text={'test'}
  color={object.color.value}
  anchorX={0}
  anchorY={0}
/>
<T.DirectionalLight intensity={0.8 * object.diameter.value} position.x={10} position.y={10} />
<T.AmbientLight intensity={0.02} />
<T.Mesh scale={(1 * object.sineFrequency.value) / 10}>
  <T.SphereGeometry args={[1, 32, 32]} />
  <T.MeshStandardMaterial color={'#faf00'} roughness={0.2} />
</T.Mesh>
