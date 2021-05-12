<template>
  <div class="max-w-8xl mx-auto sm:px-10 lg:px-16">
    <div
      class="flex flex-col gap-4 sm:gap-0 sm:flex-row items-center justify-center xs:justify-between h-auto sm:h-16 px-4 sm:px-0 py-4"
    >
      <div class="hidden xs:flex items-center">
        <a href="/">
          <Logo class="w-32" />
        </a>
      </div>
      <Button>
        <template v-slot:icon>
          <GitHubIcon class="mr-2 h-5 w-5" aria-hidden="true" />
        </template>
        Sign in with GitHub
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import Button from "@/components/inputs/Button.vue";
import GitHubIcon from "@/assets/icons/GitHubIcon.vue";
import Logo from "@/assets/Logo.vue";

export default {
  components: { Button, GitHubIcon, Logo },
};
</script>
