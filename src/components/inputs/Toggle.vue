<template>
  <SwitchGroup as="div" class="flex items-center justify-between">
    <SwitchLabel as="span">
      <span class="text-sm font-medium text-gray-300">{{ this.name }}</span>
    </SwitchLabel>
    <Switch
      v-model="localValue"
      :class="[
        localValue ? 'bg-blue-500' : 'bg-gray-200',
        'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent outline-none rounded-full cursor-pointer transition-colors ease-in-out duration-200',
      ]"
    >
      <span class="sr-only">{{ this.name }}</span>
      <span
        :class="[
          localValue ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
        ]"
      >
        <span
          :class="[
            localValue
              ? 'opacity-0 ease-out duration-100'
              : 'opacity-100 ease-in duration-200',
            'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity',
          ]"
          aria-hidden="true"
        >
          <slot name="disabledIcon" />
        </span>
        <span
          :class="[
            localValue
              ? 'opacity-100 ease-in duration-200'
              : 'opacity-0 ease-out duration-100',
            'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity',
          ]"
          aria-hidden="true"
        >
          <slot name="enabledIcon" />
        </span>
      </span>
    </Switch>
  </SwitchGroup>
</template>

<script lang="ts">
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";

export default {
  components: { Switch, SwitchGroup, SwitchLabel },
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
      type: Boolean,
      default: false,
    },
  },
  watch: {
    localValue(newValue: boolean) {
      this.emitValueChange(newValue);
    },
    value(newValue: boolean) {
      this.localValue = newValue;
    },
  },
  methods: {
    emitValueChange(localValue: boolean) {
      this.$emit("valueChange", {
        name: this.name,
        value: localValue,
      });
    },
  },
};
</script>
