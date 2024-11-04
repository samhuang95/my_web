<template>
  <div class="w-full flex flex-col items-start">
    <q-tabs
      v-model="tab"
      active-color="brand-400"
      class="text-grey-600 p2-2 translate-y-[2px]"
    >
      <q-tab
        v-for="item in props.rtfData"
        :key="item[props.tabColumnName]"
        no-caps
        :name="item[props.tabColumnName]"
        :label="item[props.tabColumnName]"
        @click="setInputHTML(item[props.htmlColumnName])"
      />
    </q-tabs>
    <div>
      <QuillEditor
        ref="rtfEditor"
        class="!border-0"
        theme="snow"
        :toolbar="[]"
        read-only
      />
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { ref, onMounted } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';

const rtfEditor = ref<typeof QuillEditor | null>(null);

/**
 * 這是一個用於呈現 RTF 內容的基礎組件。
 * @component base-rtf-editor
 *
 * @prop {object} rtfData - 一個包含 RTF 數據的物件。
 * @prop {String} tabColumnName - 用於做為遞迴使用的 Tab 欄位名稱。
 * @prop {String} htmlColumnName - 用於做為遞迴使用的 HTML 欄位名稱。
 * @prop {String} firstTab - 預設一開始選中的 Tab 名稱。
 * @prop {String} firstHtml - 預設一開始呈現的 HTML 內容。
 */
interface Props {
  rtfData: object;
  tabColumnName: string;
  htmlColumnName: string;
  firstTab: string;
  firstHtml: string;
}

const props = withDefaults(defineProps<Props>(), {});

const tab = ref(props.firstTab);

const setInputHTML = (richTextHTML: string) => {
  rtfEditor.value?.setHTML(richTextHTML);
};

onMounted(() => {
  setInputHTML(props.firstHtml);
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
