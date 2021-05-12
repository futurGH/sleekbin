<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="18"
    :height="18"
    viewBox="0 0 18 18"
    :aria-labelledby="iconName"
  >
    <g :fill="iconColor">
      <slot />
    </g>
  </svg>
</template>

<script lang="ts">
export default {
  props: {
    iconName: {
      type: String,
      default: "box",
    },
    iconColor: {
      type: String,
      default: "currentColor",
    },
  },
};
</script>
