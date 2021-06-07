<template>
  <div
    class="flex flex-row items-center justify-center space-x-8 bg-gray-800 rounded-tl-xl rounded-tr-xl px-8 py-2 h-auto gap-x-8 xl:gap-x-12"
  >
    <SearchDropdown
      :value="documentStore.language"
      :get-option-list="fetchLanguages"
      name="Language"
      @valueChange="handleValueChange"
      class="hidden 2bt:flex"
    />
    <SearchDropdown
      :value="documentStore.theme"
      :get-option-list="fetchThemes"
      name="Theme"
      @valueChange="handleValueChange"
      class="hidden 3bt:flex"
    />
    <SearchDropdown
      :value="documentStore.font"
      :get-option-list="fetchFonts"
      name="Font"
      @valueChange="handleValueChange"
      class="hidden 4bt:flex"
    />
    <Dropdown name="Options">
      <template v-slot:icon>
        <OptionsIcon class="-ml-1 mr-2 h-4 w-4" aria-hidden="true" />
      </template>
      <PopoverPanel
        static
        class="flex flex-col flex-grow left-0 2bt:left-auto space-y-2 gap-y-2 2bt:space-y-4 2bt:gap-y-4 px-4 py-4 origin-top fixed 2bt:absolute z-10 w-screen 2bt:w-96 mt-2 rounded-md shadow-lg bg-gray-600"
      >
        <SearchDropdown
          :value="documentStore.language"
          :get-option-list="fetchLanguages"
          name="Language"
          @valueChange="handleValueChange"
          class="2bt:hidden 2bt:invisible"
        />
        <SearchDropdown
          :value="documentStore.theme"
          :get-option-list="fetchThemes"
          name="Theme"
          @valueChange="handleValueChange"
          class="3bt:hidden 3bt:invisible"
        />
        <SearchDropdown
          :value="documentStore.font"
          :get-option-list="fetchFonts"
          name="Font"
          @valueChange="handleValueChange"
          class="4bt:hidden 4bt:invisible"
        />
        <Counter
          name="Font size"
          :value="documentStore.font_size"
          @valueChange="handleValueChange"
        />
        <Counter
          name="Line height"
          :value="documentStore.line_height"
          :step="0.05"
          @valueChange="handleValueChange"
        />
        <Toggle
          name="Show line numbers"
          :value="documentStore.show_line_numbers"
          @valueChange="handleValueChange"
        />
        <Counter
          name="First line number"
          :value="documentStore.first_line_number"
          @valueChange="handleValueChange"
        />
      </PopoverPanel>
    </Dropdown>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { mapStores } from "pinia";

import { useDocument } from "@/stores/document";

import { modes } from "ace-builds/src-noconflict/ext-modelist";
import themes from "@/assets/theme/list";

import { PopoverPanel } from "@headlessui/vue";
import SearchDropdown from "@/components/inputs/SearchDropdown.vue";
import Dropdown from "@/components/inputs/Dropdown.vue";
import Counter from "@/components/inputs/Counter.vue";
import Toggle from "@/components/inputs/Toggle.vue";

import OptionsIcon from "@/assets/icons/OptionsIcon.vue";

export default {
  components: {
    Toggle,
    PopoverPanel,
    Counter,
    SearchDropdown,
    Dropdown,
    OptionsIcon,
  },
  computed: {
    ...mapStores(useDocument),
  },
  methods: {
    async fetchFonts() {
      const { data: response } = await axios.get(
        "https://www.googleapis.com/webfonts/v1/webfonts?sort=alpha&key=" +
          process.env.VUE_APP_GOOGLE_FONTS_API_KEY
      );
      return response.items
        .filter((item) => item.category === "monospace")
        .map((item) => item.family);
    },
    fetchLanguages() {
      return modes.map((mode) => mode.caption).sort();
    },
    fetchThemes() {
      return themes.map((theme) => theme.caption).sort();
    },
    handleValueChange({ name, value }: { name: string; value: any }) {
      name = name.toLowerCase().replace(/\s/g, "_");
      this.documentStore[name] = value;
    },
  },
};
</script>
