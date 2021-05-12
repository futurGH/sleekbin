<template>
  <div class="flex flex-col h-screen bg-gray-900">
    <div>
      <NavBar />
      <header v-if="document" class="py-10">
        <div class="max-w-8xl mx-auto pb-4 px-4 sm:px-10 lg:px-16">
          <h1 class="text-3xl max-w-full font-bold text-white">
            {{ document.content.title }}
          </h1>
        </div>
      </header>
    </div>
    <!-- beforeRouteEnter refused to cooperate so this v-if is my workaround -->
    <ReadOnlyEditor class="pt-24" v-if="document" :document="document" />
    <Loading class="h-screen relative m-auto" v-else />
  </div>
</template>

<script lang="ts">
import axios from "axios";

import ReadOnlyEditor from "@/components/editor/ReadOnlyEditor.vue";
import NavBar from "@/components/ui/NavBar.vue";
import Loading from "@/components/ui/Loading.vue";

async function getDocument(id) {
  const { data } = await axios.get("/api/documents/" + id);
  return data;
}

export default {
  components: {
    Loading,
    ReadOnlyEditor,
    NavBar,
  },
  data() {
    return {
      error: null,
      document: null,
      loading: true,
    };
  },
  // beforeRouteEnter refused to cooperate so I'm doing everything in mounted instead
  async mounted() {
    try {
      this.document = await getDocument(this.$route.params.id);
      document.title = this.document.title || "Sleekbin";
      this.loading = false;
    } catch (e) {
      this.handleError(e);
    }
  },
  methods: {
    handleError(error) {
      console.error(error);
      this.$router.push({ name: "landing" });
    },
  },
};
</script>
