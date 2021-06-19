<template>
  <main class="flex items-center flex-grow -mt-32">
    <div
      class="flex flex-col bg-gray-700 shadow w-full h-full rounded-xl max-w-8xl mx-auto pb-6 px-6 sm:px-10 lg:px-16"
    >
      <div id="editor" class="w-full h-full rounded-xl"></div>
    </div>
  </main>
</template>

<script lang="ts">
import { PropType } from "vue";
import WebFont from "webfontloader";

import ace from "ace-builds";
import { modes } from "ace-builds/src-noconflict/ext-modelist";
import themes from "@/assets/theme/list";
import "ace-builds/webpack-resolver";
import "@/assets/theme/sleekula";

import { Document } from "@/stores/document";

export default {
  data: () => ({
    aceEditor: null,
  }),
  mounted() {
    this.aceEditor = ace.edit("editor");

    const { theme, language } = this;
    // For whatever reason, setOptions does not seem to work
    /* User-provided config options */
    this.aceEditor.setOption(
      "theme",
      themes.find((t) => t.caption === theme).theme
    );
    this.aceEditor.setOption(
      "mode",
      modes.find((m) => m.caption === language).mode
    );
    this.aceEditor.setOption("fontSize", this.fontSize);
    this.aceEditor.setOption("showGutter", this.showLineNumbers);
    this.aceEditor.setOption("firstLineNumber", this.firstLineNumber);

    /* Context-specific default options */
    this.aceEditor.setOption("showPrintMargin", false);
    this.aceEditor.setOption("readOnly", true);
    this.aceEditor.setOption("highlightActiveLine", false);
    this.aceEditor.setOption("highlightGutterLine", false);

    this.aceEditor.getSession().setValue(this.documentContent.body);

    /* Custom styling beyond provided options */
    this.aceEditor.renderer.$cursorLayer.element.style.display = "none";
    this.aceEditor.container.style.lineHeight = this.lineHeight;

    WebFont.load({
      google: {
        families: [this.font],
      },
      fontactive: () => {
        this.aceEditor.container.style.fontFamily = this.font;
      },
    });
  },
  props: {
    document: {
      type: Object as PropType<Document>,
      required: true,
    },
  },
  computed: {
    documentContent() {
      return this.document.content;
    },
    language() {
      return this.document.language;
    },
    theme() {
      return this.document.theme;
    },
    font() {
      return this.document.font;
    },
    fontSize() {
      return this.document.font_size;
    },
    lineHeight() {
      return this.document.line_height;
    },
    showLineNumbers() {
      return this.document.show_line_numbers;
    },
    firstLineNumber() {
      return this.document.first_line_number;
    },
  },
};
</script>

<style>
.ace_gutter,
.ace_content,
.ace_line {
  @apply pt-2;
}
</style>
