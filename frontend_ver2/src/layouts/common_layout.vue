<template>
  <v-app id="inspire">
    <common_header></common_header>

    <v-main class="d-flex flex-column">
      <v-container>
        <v-row>
          <v-col cols="12" xl="">
            <v-sheet min-height="268" rounded="lg">
              <!-- 左側 -->
            </v-sheet>
          </v-col>
          <v-col cols="12" xl="">
            <v-sheet min-height="70vh" rounded="lg">
              <!-- 中間 -->
            </v-sheet>
          </v-col>
          <v-col cols="12" xl="">
            <v-sheet min-height="268" rounded="lg">
              <!-- 右側 -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import common_header from './common_header.vue'
</script>

<style scoped>
.v-tabs {
  min-width: 0; /* 確保 tabs 可以正確縮放 */
}
</style>
