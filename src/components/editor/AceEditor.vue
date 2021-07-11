<template>
  <div id="editor" class="w-full h-full rounded-bl-xl rounded-br-xl"></div>
</template>

<script lang="ts">
import WebFont from "webfontloader";

import ace from "ace-builds/src-min-noconflict/ace";
import { modes } from "ace-builds/src-min-noconflict/ext-modelist";
import themes from "@/assets/theme/list";

import "ace-builds/webpack-resolver";
import "@/assets/theme/sleekula";

import { useDocument } from "@/stores/document";

export default {
  data: () => ({
    aceEditor: null,
    documentDataStore: useDocument(),
  }),
  mounted() {
    this.aceEditor = ace.edit("editor", {
      theme: "ace/theme/sleekula",
      mode: modes.find((m) => m.caption === this.language).mode,
      fontSize: this.fontSize,
      showPrintMargin: false,
    });
    this.aceEditor.focus();
    this.aceEditor.navigateFileEnd();
    this.aceEditor.getSession().on("change", () => {
      this.documentContent.body = this.aceEditor.getValue();
    });
    this.loadFont(this.font);
  },
  props: {
    readonly: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    documentContent() {
      return this.documentDataStore.$state.content;
    },
    language() {
      return this.documentDataStore.$state.language;
    },
    theme() {
      return this.documentDataStore.$state.theme;
    },
    font() {
      return this.documentDataStore.$state.font;
    },
    fontSize() {
      return this.documentDataStore.$state.font_size;
    },
    lineHeight() {
      return this.documentDataStore.$state.line_height;
    },
    showLineNumbers() {
      return this.documentDataStore.$state.show_line_numbers;
    },
    firstLineNumber() {
      return this.documentDataStore.$state.first_line_number;
    },
  },
  methods: {
    loadFont(font: string) {
      WebFont.load({
        google: {
          families: [font],
        },
        fontactive: () => {
          this.aceEditor.container.style.fontFamily = font;
        },
      });
    },
  },
  watch: {
    language(newValue: string) {
      this.aceEditor.session.setMode(
        modes.find((m) => m.caption === newValue).mode
      );
    },
    theme(newValue: string) {
      this.aceEditor.setTheme(themes.find((t) => t.caption === newValue).theme);
    },
    font(newValue: string) {
      this.loadFont(newValue);
    },
    fontSize(newValue: number) {
      this.aceEditor.setFontSize(newValue);
    },
    lineHeight(newValue: number) {
      this.aceEditor.container.style.lineHeight = newValue;
    },
    showLineNumbers(newValue: boolean) {
      this.aceEditor.setOption("showGutter", newValue);
    },
    firstLineNumber(newValue: number) {
      this.aceEditor.setOption("firstLineNumber", newValue);
    },
    readonly(newValue: boolean) {
      this.aceEditor.setOption("readOnly", newValue);
      this.aceEditor.setOption("highlightActiveLine", !newValue);
      this.aceEditor.setOption("highlightGutterLine", !newValue);
      this.aceEditor.renderer.$cursorLayer.element.style.display = "none";
    },
  },
};
</script>
