<script lang="ts">
  import { T, useThrelte } from '@threlte/core';
  import { OrbitControls, SoftShadows, Portal, Text } from '@threlte/extras';
  import { onDestroy } from 'svelte';
  import { DoubleSide, Object3D } from 'three';
  import type { DirectionalLightHelper } from 'three';
  import { degToRad } from 'three/src/math/MathUtils';

  import type { Config } from '$lib/client/canvasUtils';
  import { getRandomInt } from '$lib/client/mathUtils';
  import { debug } from '$lib/store';

  // eslint-disable-next-line svelte/valid-compile
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
  let handle: number;

  const tick = () => {
    posY = Math.sin(Date.now() / 20000);
    handle = window.requestAnimationFrame(tick);
  };

  tick();

  onDestroy(() => {
    if (handle) cancelAnimationFrame(handle);
  });

  let helperA: DirectionalLightHelper;

  const targetObject = new Object3D();
  targetObject.position.set(0, 100, 0);
  scene.add(targetObject);
</script>

<T.PerspectiveCamera makeDefault position={[15, 3, 25]} fov={15}>
  <OrbitControls enableZoom={$debug} enablePan={$debug} enableDamping target={[0, 2.5, 0]} />
</T.PerspectiveCamera>
<SoftShadows />

<T.AmbientLight color={params.color.value} intensity={0.2} />
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
      <T.DirectionalLightHelper args={[ref]} bind:ref={helperA} />
    {/if}
  </Portal>
</T.DirectionalLight>

<T.Group rotation.y={degToRad(posY * 360)}>
  {#each positions as position}
    <T.Mesh
      castShadow
      receiveShadow
      position.y={(position.z * 0.175) / 2 + 0.0125}
      position.z={position.x * 0.25}
      position.x={position.y * 0.25}
    >
      <T.BoxGeometry args={[0.95, position.z * 0.175, 0.95]} />
      <T.MeshStandardMaterial color={'#000000'} roughness={0.2} side={DoubleSide} />
    </T.Mesh>

    <T.Group
      position.y={position.z * 0.175 + 0.1875}
      position.z={position.x * 0.25}
      position.x={position.y * 0.25}
      rotation.y={degToRad(getRandomInt(0, 3) * 90)}
    >
      <T.Mesh castShadow receiveShadow>
        <T.BoxGeometry args={[1, 0.375, 1]} />
        <T.MeshStandardMaterial color={'#ffffff'} roughness={0.2} side={DoubleSide} />
      </T.Mesh>

      <Text
        text={'Mundsburg'}
        scale={0.8}
        position={[0.02, -0.07, 0.501]}
        color={'#000000'}
        font={'Helvetica'}
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
    <T.MeshStandardMaterial color={'#222222'} roughness={0.2} side={DoubleSide} />
  </T.Mesh>
</T.Group>

<T.Mesh position.y={-1} rotation.x={-Math.PI / 2} receiveShadow>
  <T.CircleGeometry args={[100, 100]} />
  <T.MeshStandardMaterial color={'#ffffff'} />
</T.Mesh>
