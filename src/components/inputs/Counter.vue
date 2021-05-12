<template>
  <SwitchGroup as="div" class="flex items-center justify-between">
    <SwitchLabel as="span" class="mr-4 leading-4">
      <span class="text-sm font-medium text-gray-300">{{ this.name }}</span>
    </SwitchLabel>
    <div class="flex flex-row">
      <button
        type="button"
        class="h-8 w-8 inline-flex items-center justify-center rounded-l-lg shadow-sm text-gray-50 bg-gray-700 hover:bg-gray-800 outline-none"
        @click="changeValue(step)"
      >
        <PlusIcon class="h-6 w-6" aria-hidden="true" />
      </button>
      <input
        type="number"
        v-model.number="localValue"
        :step="step"
        class="bg-gray-700 h-8 w-32 text-white text-sm text-center outline-none border-0 ring-0"
      />
      <button
        type="button"
        class="h-8 w-8 inline-flex items-center justify-center rounded-r-lg shadow-sm text-gray-50 bg-gray-700 hover:bg-gray-800 outline-none"
        @click="changeValue(-step)"
      >
        <MinusIcon class="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  </SwitchGroup>
</template>

<script lang="ts">
import { SwitchGroup, SwitchLabel } from "@headlessui/vue";
import PlusIcon from "@/assets/icons/PlusIcon.vue";
import MinusIcon from "@/assets/icons/MinusIcon.vue";

export default {
  components: {
    SwitchGroup,
    SwitchLabel,
    MinusIcon,
    PlusIcon,
  },
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
    value: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: Infinity,
    },
    step: {
      type: Number,
      default: 1,
    },
  },
  watch: {
    localValue(newValue: number | string) {
      if (typeof newValue === "string") return;

      if (newValue < this.min) newValue = this.min;
      if (newValue > this.max) newValue = this.max;
      if (this.localValue !== newValue) this.localValue = newValue;
      this.emitValueChange(this.localValue);
    },
    value(newValue: number) {
      this.localValue = newValue;
    },
  },
  methods: {
    changeValue(amount: number | string = this.step) {
      if (typeof amount === "string") {
        this.localValue = this.min;
      } else {
        // I hate floating point precision
        this.localValue = parseFloat((this.localValue + amount).toFixed(2));
      }
    },
    emitValueChange(localValue: number) {
      this.$emit("valueChange", {
        name: this.name,
        value: localValue,
      });
    },
  },
};
</script>

<style>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
