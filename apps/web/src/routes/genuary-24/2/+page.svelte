<script lang="ts">
  import { Canvas , T } from '@threlte/core';
    import { OrbitControls } from '@threlte/extras';
</script>

<main>
  <div class="sphere-canvas">
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
</main>

<style>
  main {
    font-family: sans-serif;
  }
  .sphere-canvas {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
</style>
