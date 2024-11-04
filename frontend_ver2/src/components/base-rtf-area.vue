<template>
  <div>
    <QuillEditor
      ref="rtfEditor"
      class="!border-0"
      theme="snow"
      :toolbar="[]"
      read-only
    />
  </div>
</template>

<script
  setup
  lang="ts"
>
import { ref, onMounted } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';

const rtfEditor = ref<typeof QuillEditor | null>(null);

interface Props {
  html: string;
}

const props = withDefaults(defineProps<Props>(), {});

const setInputHTML = (html: string) => {
  rtfEditor.value?.setHTML(html);
};

onMounted(() => {
  setInputHTML(props.html);
});
</script>

<style
  lang="sass"
  scoped
>
::v-deep()
  .ql-editor p
    font-family: Inter
    font-size: 14px
    font-style: normal
    font-weight: 400
    line-height: 20px
    letter-spacing: 0.07px

  .ql-toolbar.ql-snow
    height: 0px
    padding: 0px
    border: 0px
</style>
