<script lang="ts">
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
    '🙏',
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

  function rand(min: number, max: number) {
    return parseInt((Math.random() * (max - min + 1)).toString(), 10) + min;
  }

  function get_random_color() {
    var h = rand(200, 360);
    var s = rand(54, 75);
    var l = rand(45, 55);
    return 'hsl(' + h + ',' + s + '%,' + l + '%)';
  }

  const randomColor = get_random_color();
  const randomRotation = (Math.random() - 0.5) * 90; // rotate between -45 to 45 degrees
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
