<template>
  <Popover
    :v-slot="{ open }"
    class="relative flex space-y-10 justify-center 2bt:justify-end"
  >
    <PopoverButton
      class="inline-flex justify-center items-center w-full h-8 rounded-md px-4 py-2 bg-gray-700 text-sm font-medium text-white hover:bg-gray-600 outline-none"
      @click="toggleOpen"
    >
      <slot name="icon"></slot>
      {{ this.name }}
      <ChevronDownIcon class="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
    </PopoverButton>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <slot v-if="open"></slot>
    </transition>
  </Popover>
</template>

<script lang="ts">
import { Popover, PopoverButton } from "@headlessui/vue";
import ChevronDownIcon from "@/assets/icons/ChevronDownIcon.vue";

export default {
  components: {
    Popover,
    PopoverButton,
    ChevronDownIcon,
  },
  data() {
    return {
      open: false,
    };
  },
  props: {
    name: {
      type: String,
      default: "Options",
    },
  },
  methods: {
    toggleOpen() {
      this.open = !this.open;
    },
  },
};
</script>
