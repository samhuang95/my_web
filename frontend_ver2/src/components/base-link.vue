<template>
  <router-link
    :to="props.data"
    class="base-link"
  >
    <slot />
  </router-link>
</template>

<script
  lang="ts"
  setup
>
interface Props {
  data: {
    name: string;
  };
}
const props = withDefaults(defineProps<Props>(), {});
</script>
