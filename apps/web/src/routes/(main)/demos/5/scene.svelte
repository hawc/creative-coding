<script lang="ts">
  import { T, useThrelte } from '@threlte/core';
  import { OrbitControls, SoftShadows, Portal, Text } from '@threlte/extras';
  import { onDestroy } from 'svelte';
  import { DoubleSide } from 'three';
  import { degToRad } from 'three/src/math/MathUtils.js';

  import { debug, type Config } from '$lib/store';
  import { CIRCLE_DEGREES, getRandomInt } from '$lib/utils/mathUtils';

  export let params: Config;

  const { scene } = useThrelte();

  const stacks = params.count.value;

  const getPositions = (stacks: number): { x: number; y: number; z: number }[] => {
    const array = [];
    for (let items = 0; items < stacks; items++) {
      array.push({
        x: getRandomInt(-10, 10),
        y: getRandomInt(-10, 10),
        z: getRandomInt(params.minHeight.value, params.maxHeight.value)
      });
    }
    return array;
  };
  const positions = getPositions(stacks);

  let posY = 0;
  let handleTick: number;

  const tick = () => {
    posY = Math.sin(Date.now() / 20000);
    handleTick = window.requestAnimationFrame(tick);
  };

  tick();

  onDestroy(() => {
    if (handleTick) cancelAnimationFrame(handleTick);
  });
</script>

<T.PerspectiveCamera makeDefault position={[15, 3, 25]} fov={15}>
  <OrbitControls enableZoom={$debug} enablePan={$debug} enableDamping target={[0, 2.5, 0]} />
</T.PerspectiveCamera>
<SoftShadows />

<T.AmbientLight color={params.lightColor.value} intensity={0.2} />
<T.DirectionalLight
  let:ref
  position={[8, 8, 0]}
  castShadow
  shadow.mapSize.width={1024}
  shadow.mapSize.height={1024}
  shadow.camera.left={-10}
  shadow.camera.right={10}
  shadow.camera.top={-10}
  shadow.camera.bottom={10}
  intensity={8}
>
  <Portal object={scene}>
    {#if $debug}
      <T.DirectionalLightHelper args={[ref]} />
    {/if}
  </Portal>
</T.DirectionalLight>

<T.Group rotation.y={degToRad(posY * CIRCLE_DEGREES)}>
  {#each positions as position}
    <T.Mesh
      castShadow
      receiveShadow
      position.y={(position.z * 0.175) / 2 + 0.0125}
      position.z={position.x * 0.25}
      position.x={position.y * 0.25}
    >
      <T.BoxGeometry args={[0.95, position.z * 0.175, 0.95]} />
      <T.MeshStandardMaterial color={'#333333'} roughness={0.2} side={DoubleSide} />
    </T.Mesh>

    <T.Group
      position.x={position.y * 0.25}
      position.y={position.z * 0.175 + 0.1875}
      position.z={position.x * 0.25}
      rotation.y={degToRad(getRandomInt(0, 3) * 90)}
    >
      <T.Mesh castShadow receiveShadow>
        <T.BoxGeometry args={[1, 0.375, 1]} />
        <T.MeshStandardMaterial color={'#ffffff'} roughness={0.2} side={DoubleSide} />
      </T.Mesh>

      <Text
        castShadow
        receiveShadow
        text={'Mundsburg'}
        scale={0.8}
        position={[0.02, -0.07, 0.501]}
        color={'#000000'}
        outlineWidth={0.005}
      />
    </T.Group>
    {#each Array(position.z) as _, index}
      <T.Mesh
        castShadow
        receiveShadow
        position.y={index * 0.175 + 0.0125}
        position.z={position.x * 0.25}
        position.x={position.y * 0.25}
      >
        <T.BoxGeometry args={[1, 0.025, 1]} />
        <T.MeshStandardMaterial color={'#ffffff'} roughness={0.2} side={DoubleSide} />
      </T.Mesh>
    {/each}
  {/each}
  <T.Mesh castShadow receiveShadow position.y={-0.5}>
    <T.BoxGeometry args={[6, 1, 6]} />
    <T.MeshStandardMaterial color={'#333333'} roughness={0.2} side={DoubleSide} />
  </T.Mesh>
</T.Group>

<T.Mesh position.y={-1} rotation.x={-Math.PI / 2} receiveShadow>
  <T.CircleGeometry args={[100, 100]} />
  <T.MeshStandardMaterial color={'#ffffff'} />
</T.Mesh>
