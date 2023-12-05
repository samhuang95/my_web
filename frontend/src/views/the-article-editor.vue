<template>
  <div class="flex flex-col gap-2 p-10">
    <div>
      <QuillEditor
        ref="rtfEditor"
        class="h-[60vh]"
        theme="snow"
        toolbar="full"
      />
    </div>
    <div class="flex gap-2">
      <base-btn
        label="Get Html"
        btn-style="unelevated"
        btn-color="brand"
        :disable="isLoading"
        @click="getContent"
      />
      <base-btn
        label="Clear"
        btn-style="unelevated"
        btn-color="red"
        :disable="isLoading"
        @click="clear"
      />
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { ref } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';

import baseBtn from '../components/base-btn.vue';

import { uploadToS3 } from '../common/aws';
import { useQuasar, QSpinnerGears } from 'quasar';

const $q = useQuasar();

const rtfEditor = ref<QuillEditor | null>(null);
const isLoading = ref<boolean>(false);

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
  textArea.select();

  try {
    document.execCommand('copy');
    $q.notify({
      spinner: QSpinnerGears,
      message: 'Copying...',
      timeout: 100,
      color: 'teal-7',
    });
  } catch (error) {
    console.error(error);
  } finally {
    textArea.remove();
  }
  isLoading.value = false;
};

const clear = () => {
  rtfEditor.value?.setHTML('');
};
</script>
