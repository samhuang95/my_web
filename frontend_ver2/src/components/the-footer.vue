<template>
  <footer
    class="flex justify-center items-center w-full bg-white border-top"
    :class="{ 'pl-[300px]': isSellerDashboard }"
  >
    <div
      class="w-full normal-padding flex flex-col md:flex-row items-center justify-between gap-[0.5rem] lg:gap-[2.5rem]"
      :class="{ 'max-width': !isSellerDashboard }"
    >
      <div class="flex items-center gap-[1rem]">
        <a
          href=""
          class="flex items-center justify-center w-[2.5rem] h-[2.5rem]"
          target="_blank"
        >
          <img
            class="w-[1rem]"
            :src="facebookIcon"
            alt=""
          />
        </a>
        <a
          href=""
          class="flex items-center justify-center w-[2.5rem] h-[2.5rem]"
          target="_blank"
        >
          <img
            class="w-[1rem]"
            :src="linkinkIcon"
            alt=""
          />
        </a>
        <a
          href=""
          class="flex items-center justify-center w-[2.5rem] h-[2.5rem]"
          target="_blank"
        >
          <img
            class="w-[1rem]"
            :src="youtubeIcon"
            alt=""
          />
        </a>
        <a
          href=""
          class="flex items-center justify-center w-[2.5rem] h-[2.5rem]"
          target="_blank"
        >
          <img
            class="w-[1rem]"
            :src="instagramIcon"
            alt=""
          />
        </a>
      </div>
      <div
        class="flex py-[0.5rem] gap-[1rem] md:gap-[1.5rem] flex-col items-center md:flex-row"
      >
        <!-- <router-link
          :to="{
            path: '/terms',
          }"
          ><p class="p3">Terms</p></router-link
        > -->
        <!-- <router-link
          :to="{
            path: '/privacy',
          }"
          ><p class="p3">Privacy Policy</p></router-link
        > -->

        <p class="p3 text-brandBlue-50">@ 2023 Sam Huang</p>
      </div>
    </div>
  </footer>
</template>

<script
  lang="ts"
  setup
>
import facebookIcon from '../assets/icon/facebook-icon.svg';
import linkinkIcon from '../assets/icon/linkin-icon.svg';
import youtubeIcon from '../assets/icon/youtube-icon.svg';
import instagramIcon from '../assets/icon/instagram-icon.svg';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { RouteName } from '../router/router';

const route = useRoute();

const isSellerDashboard = computed(() => {
  if (route.name === RouteName.SELLER_DASHBOARD) {
    return true;
  } else {
    return false;
  }
});
</script>
