<template>
  <div>
    <label
      v-if="label"
      :for="name"
      class="block text-sm font-medium text-gray-700"
      >{{ label }}</label
    >
    <div class="mt-2 mb-4 mx-7 sm:mx-14 lg:mx-20 flex rounded-md shadow-sm">
      <div class="relative flex items-stretch flex-grow focus-within:z-10">
        <div
          class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
        >
          <slot name="leading-content" />
        </div>
        <input
          v-model="localValue"
          class="block w-full rounded-none rounded-l-md sm:text-sm text-sm font-medium text-gray-200 bg-gray-700 border-none outline-none"
          type="text"
          :name="name"
          :id="name"
          :class="[
            { 'pl-10': $slots['leading-content'] },
            { 'select-text': readonly },
          ]"
          :readonly="readonly"
          @focus="$event.target.select()"
        />
      </div>
      <button
        class="-ml-px relative inline-flex items-center gap-2 px-4 py-2 outline-none text-sm font-medium rounded-r-md text-white bg-gray-800 hover:bg-gray-600"
        :id="`${name}-btn`"
        @click="emitButtonPress($event)"
      >
        <slot name="trailing-button-content" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      localValue: this.value,
    };
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    label: String,
    value: {
      type: String,
      required: true,
    },
    readonly: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    localValue() {
      this.emitValueChange(this.localValue);
    },
  },
  methods: {
    emitValueChange(newValue: string) {
      this.$emit("valueChange", {
        name: this.name,
        value: newValue,
      });
    },
    emitButtonPress(event: Event) {
      this.$emit("buttonPress", {
        name: this.name,
        target: event.target as HTMLButtonElement,
      });
    },
  },
};
</script>
