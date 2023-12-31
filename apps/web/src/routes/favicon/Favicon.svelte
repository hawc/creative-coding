<script lang="ts">
  import { rand } from '$lib/utils/mathUtils';

  const characters = [
    '👋',
    '🤚',
    '✋',
    '🖖',
    '👌',
    '🤌',
    '✌️',
    '🤞',
    '🫰',
    '🤟',
    '🤘',
    '🤙',
    '👍',
    '✊',
    '🫶',
    '🙌',
    '👐',
    '✍️',
    '💅',
    '💪',
    '👾',
    '🤖',
    '👽',
    '🤠',
    '💫',
    '✨',
    '⭐️',
    '⚡️',
    '🎨',
    '🧨',
    '🎊',
    '❤️‍🔥',
    '💘'
  ];
  const char = characters[Math.floor(Math.random() * characters.length)];

  function getRandomColor() {
    var h = rand(200, 360);
    var s = rand(54, 75);
    var l = rand(45, 55);
    return 'hsl(' + h + ',' + s + '%,' + l + '%)';
  }

  const randomColor = getRandomColor();
  const randomRotation = rand(-45, 45);
</script>

<div
  style="background-color: {randomColor}; transform: translate(-50%, -50%) rotate({randomRotation}deg)"
  class="box"
>
  {char}
</div>

<style>
  .box {
    position: absolute;
    width: 68%;
    height: 68%;
    top: 50%;
    left: 50%;
    color: white;
    font-size: 90px;
    line-height: 90px;
  }
</style>
