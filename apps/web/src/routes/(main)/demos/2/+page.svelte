<script lang="ts">
  import { Canvas, T } from '@threlte/core';
  import { OrbitControls } from '@threlte/extras';

  import Renderer from '$lib/components/Renderer.svelte';
</script>

<Renderer>
  <div class="absolute w-full h-full top-0 left-0">
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

      <T.Mesh scale={1}>
        <T.SphereGeometry args={[1, 32, 32]} />
        <T.MeshStandardMaterial color={`rgb(155,10,0)`} roughness={0.2} />
      </T.Mesh>
    </Canvas>
  </div>
</Renderer>
