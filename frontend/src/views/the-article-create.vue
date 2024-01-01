<template>
  <div class="flex flex-col gap-2 p-10">
    <div class="grid gap-[1rem]">
      <div class="flex gap-[1rem] items-center">
        <div class="grid gap-[1.5rem]">
          <H4 class="h4">Title</H4>
          <H4 class="h4">English title</H4>
          <H4 class="h4">Article tag</H4>
          <H4 class="h4">State</H4>
          <H4 class="h4">Cover image URL</H4>
          <H4 class="h4">Summary</H4>
        </div>
        <div class="grid gap-[1rem] w-2/3">
          <base-input
            v-model="titleInput"
            :type="'text'"
            placeholder="Please enter the article title"
          />
          <base-input
            v-model="englishTitleInput"
            :type="'text'"
            placeholder="The English title will used on the url."
          />
          <base-input
            v-model="articleTagInput"
            :type="'text'"
            placeholder="Please enter 'tech' or 'marketing'"
          />
          <base-input
            v-model="stateInput"
            :type="'text'"
            placeholder="Please enter 'published' or 'draft'"
          />
          <base-input
            v-model="coverUrlInput"
            :type="'text'"
            placeholder="Please upload the cover image and paste the url here."
          />
          <base-input
            v-model="summaryInput"
            :type="'text'"
            placeholder="Maximum number of characters: 150."
          />
        </div>
      </div>
      <H3 class="h3 m-auto">Content</H3>
      <QuillEditor
        ref="rtfEditor"
        class="h-[60vh]"
        theme="snow"
        toolbar="full"
      />
    </div>
    <baseBtn
      label="Submit"
      btn-style="unelevated"
      btn-color="blue"
      @click="handleSubmit"
    />
  </div>
</template>

<script
  setup
  lang="ts"
>
import { ref } from 'vue';

import { QuillEditor } from '@vueup/vue-quill';

import baseBtn from '../components/base-btn.vue';
import baseInput from '../components/base-input.vue';

import { uploadToS3 } from '../common/aws';
import { useQuasar, QSpinnerGears } from 'quasar';
import { watch } from 'fs';
import { useArticleStore } from '../stores/article.store';
import { createArticleType } from '../types/article.type';
import { useAdminStore } from '../stores/admin.store';
const $q = useQuasar();
const articleStore = useArticleStore();
const adminStore = useAdminStore();

const hasClickSubmitBtn = ref<boolean>(false);

const rtfEditor = ref<QuillEditor | null>(null);

const isLoading = ref<boolean>(false);
const titleInput = ref<string>('');
const englishTitleInput = ref<string>('');
const articleTagInput = ref<string>('');
const stateInput = ref<string>('');
const coverUrlInput = ref<string>('');
const summaryInput = ref<string>('');
const contentInput = ref<string>('');

/**
 * parse data URI into Blob
 * this function is generate by GPT
 */
function dataURItoBlob(dataURI: string) {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const dataArray = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    dataArray[i] = byteString.charCodeAt(i);
  }

  return new Blob([arrayBuffer], { type: mimeString });
}

/**
 * replace data URI img tags in the text with tags using S3 files
 *
 * 1. use regular expressions to identify content containing img tags
 * 1.1 if no images have been uploaded, return the original text content
 * 2. process each img tag
 * 2.1 use regular expressions to identify data URI and file type content
 * 2.2 upload to S3 and obtain the URL
 * 2.3 replace the original img tag with the S3 URL
 * 3. return the processed text content
 */
const processAndUploadImages = async (content: string) => {
  const path = 'rtf-content';
  const imageTagRegex = /<img src=.*?>/g;
  const dataUriRegex = /<img[^>]+src=["'](.*?)["']/;
  const fileTypeRegex = /data:([^;]+);base64,/;

  const imageTags = content.match(imageTagRegex);
  let tmpContent = content;

  if (imageTags === null) return tmpContent.replaceAll('"', "'");

  for (let i = 0; i < imageTags.length; i++) {
    const tag = imageTags[i];

    const dataUri = tag.match(dataUriRegex)[1];
    const fileType = dataUri.match(fileTypeRegex)[1];
    const fileName = `${new Date().getTime().toString()}.${
      fileType.split('/')[1]
    }`;

    const blob = dataURItoBlob(dataUri);
    const fileUrl = await uploadToS3(blob, fileName, fileType, path);

    if (fileUrl === '') throw new Error('upload to S3 failed');

    tmpContent = content.replace(tag, `<img src='${fileUrl}'>`);
  }

  return tmpContent.replaceAll('"', "'");
};

const getContent = async () => {
  isLoading.value = true;
  const content = await processAndUploadImages(rtfEditor.value.getHTML());

  // navigator.clipboard.writeText(content);
  const textArea = document.createElement('textarea');

  textArea.value = content;

  // Move textarea out of the viewport so it's not visible
  textArea.style.position = 'absolute';
  textArea.style.left = '-999999px';

  document.body.prepend(textArea);

  contentInput.value = textArea.value;

  isLoading.value = false;
};

const clear = () => {
  rtfEditor.value?.setHTML('');
};

const isInputEmptyCheck = (inputData: createArticleType) => {
  if (
    hasClickSubmitBtn.value &&
    (inputData.title.trim() === '' ||
      inputData.eng_title.trim() === '' ||
      inputData.article_tag.trim() === '' ||
      inputData.state.trim() === '' ||
      inputData.cover_url.trim() === '' ||
      inputData.summary.trim() === '' ||
      inputData.content.trim() === '<p><br></p>')
  ) {
    return true;
  } else {
    return false;
  }
};

const handleSubmit = async () => {
  hasClickSubmitBtn.value = true;
  await getContent();

  const inputData = {
    title: titleInput.value,
    eng_title: englishTitleInput.value,
    article_tag: articleTagInput.value,
    state: stateInput.value,
    cover_url: coverUrlInput.value,
    summary: summaryInput.value,
    content: contentInput.value,
  };
  const isInputEmpty = isInputEmptyCheck(inputData);
  /**
   * Check if the input is empty.
   */
  if (isInputEmpty) {
    alert('Please fulfill all input form submission');
  } else {
    await articleStore.createArticle(inputData);
    const confirmation = window.confirm(
      'Article created successfully. Would you like to submit another article?'
    );

    if (confirmation) {
      // Clear input fields
      titleInput.value = '';
      englishTitleInput.value = '';
      articleTagInput.value = '';
      stateInput.value = '';
      coverUrlInput.value = '';
      summaryInput.value = '';
      contentInput.value = '';
      clear();
    } else {
      // Navigate or perform other actions
      adminStore.isOpenManagement = true;
      adminStore.isOpenCreatePage = false;
      adminStore.isOpenEditPage = false;
      adminStore.isOpenPreviewPage = false;
    }
  }
};
</script>
