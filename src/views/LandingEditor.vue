<template>
  <div class="flex flex-col h-screen bg-gray-900">
    <div class="pb-24">
      <NavBar />
      <header class="py-10">
        <div class="max-w-8xl mx-auto px-4 sm:px-10 lg:px-16">
          <input
            v-model="title"
            type="text"
            maxlength="28"
            class="text-3xl tracking-tighter max-w-full font-bold bg-transparent rounded-lg border-none hover:bg-gray-800 focus:bg-gray-700"
            :class="
              title === 'Untitled' ? ['text-gray-300', 'italic'] : 'text-white'
            "
          />
        </div>
        <div class="flex flex-row">
          <InputWithTrailingButton
            v-if="url"
            name="URL"
            :value="url"
            @valueChange="handleURLValueChange"
            @buttonPress="handleURLCopy"
          >
            <template v-slot:trailing-button-content>Copy</template>
          </InputWithTrailingButton>
          <Button
            v-else
            ref="saveButton"
            class="border-none mt-2 mb-4 mx-8 sm:mx-14 lg:mx-20 w-24"
            @click="saveDocument($event)"
            >Save</Button
          >
        </div>
      </header>
    </div>
    <Editor :readonly="readOnlyEditor" />
  </div>
</template>

<script lang="ts">
import axios from "axios";

import { mapStores } from "pinia";
import { useDocument } from "@/stores/document";

import Editor from "@/components/editor/Editor.vue";
import NavBar from "@/components/ui/NavBar.vue";
import Button from "@/components/inputs/Button.vue";
import InputWithTrailingButton from "@/components/inputs/InputWithTrailingButton.vue";

import ClipboardJS from "clipboard";

// Credit: Axios https://github.com/axios/axios/blob/master/lib/helpers/combineURLs.js
function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "")
    : baseURL;
}

export default {
  components: {
    NavBar,
    Editor,
    Button,
    InputWithTrailingButton,
  },
  data() {
    return {
      title: "Untitled",
      url: null,
      readOnlyEditor: false,
    };
  },
  mounted() {
    new ClipboardJS("#URL-btn", { text: () => this.url });
  },
  computed: {
    ...mapStores(useDocument),
  },
  watch: {
    title() {
      this.documentStore.content.title = this.title;
    },
  },
  methods: {
    async saveDocument({ target: element }: { target: HTMLButtonElement }) {
      element.textContent = "Saving..";
      element.style.width = "auto";

      try {
        const { data: slug } = await axios.post(
          "/api/documents",
          this.documentStore.$state
        );
        this.url = combineURLs(window.location.host, slug);
        this.readOnlyEditor = true;
        element.textContent = "Save";
      } catch (e) {
        element.textContent = "There was an error while saving the document!";
        element.disabled = true;
        setTimeout(() => {
          element.textContent = "Save";
          element.disabled = false;
        }, 2000);
      }
    },
    handleURLValueChange(newValue: string) {
      this.url = newValue;
    },
    handleURLCopy({ target: element }: { target: HTMLButtonElement }) {
      const width = element.style.width;
      element.style.width = "auto";
      element.textContent = "Copied!";
      element.disabled = true;

      setTimeout(() => {
        element.style.width = width;
        element.textContent = "Copy";
        element.disabled = false;
      }, 2500);
    },
  },
};
</script>
