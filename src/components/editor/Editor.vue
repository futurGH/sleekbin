<template>
  <main class="flex items-center flex-grow -mt-32">
    <div
      class="flex flex-col w-full h-full max-w-8xl mx-auto pb-6 px-6 sm:px-10 lg:px-16"
    >
      <EditorSettings />
      <div class="bg-gray-700 rounded-bl-xl rounded-br-xl shadow h-full">
        <AceEditor :readonly="readonly" />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import AceEditor from "@/components/editor/AceEditor.vue";
import EditorSettings from "@/components/editor/EditorSettings.vue";

export default {
  components: { EditorSettings, AceEditor },
  props: {
    readonly: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
