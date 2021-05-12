<template>
  <SwitchGroup as="div" class="flex items-center justify-between">
    <SwitchLabel as="span" class="mr-4 leading-4">
      <span class="text-sm font-medium text-gray-300">{{ this.name }}</span>
    </SwitchLabel>
    <ElSelect
      v-model="localValue"
      filterable
      remote
      reserve-keyword
      :remote-method="filterOptions"
      :loading="loading"
      @focus="filterOptions('')"
      @change="emitValueChange"
    >
      <ElOption
        v-for="element in filteredOptions"
        :key="element.value"
        :label="element.label"
        :value="element.value"
      />
    </ElSelect>
  </SwitchGroup>
</template>

<script lang="ts">
import { PropType } from "vue";

import { ElSelect, ElOption } from "element-plus";
import "element-plus/lib/theme-chalk/el-select.css";
import "element-plus/lib/theme-chalk/el-option.css";

import { SwitchGroup, SwitchLabel } from "@headlessui/vue";

export default {
  components: { ElSelect, ElOption, SwitchGroup, SwitchLabel },
  data() {
    return {
      options: new Array<{
        value: string;
        label: string;
      }>(),
      filteredOptions: new Array<{
        value: string;
        label: string;
      }>(),
      localValue: this.value,
      loading: false,
    };
  },
  props: {
    value: {
      type: String,
      required: true,
    },
    getOptionList: {
      type: Function as PropType<() => Array<string>>,
      default: () => [],
    },
    name: {
      type: String,
    },
  },
  mounted() {
    this.loading = true;
    // For simplicity, resolves the function as if it's async regardless of whether it is
    Promise.resolve(this.getOptionList()).then((opts) => {
      this.options = opts.map((opt) => {
        return { value: opt, label: opt };
      });
      this.loading = false;
    });
  },
  watch: {
    localValue(newValue: number) {
      if (this.localValue !== newValue) this.localValue = newValue;
      this.emitValueChange(this.localValue);
    },
    value(newValue: number) {
      this.localValue = newValue;
    },
  },
  methods: {
    filterOptions(query: string) {
      this.loading = true;
      this.filteredOptions = this.options.filter((opt) => {
        return opt.label.toLowerCase().includes(query.toLowerCase());
      });
      this.loading = false;
    },
    emitValueChange(value: string) {
      this.$emit("valueChange", {
        name: this.name,
        value,
      });
    },
  },
};
</script>
