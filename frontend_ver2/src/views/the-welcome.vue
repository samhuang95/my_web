<template>
  <q-page class="main-padding max-width m-auto">
    <div id="sticky">
      <canvas
        ref="iphoneCanvas"
        width="432"
        height="976"
      ></canvas>

      <div
        id="loading"
        :style="{ opacity: loadingOpacity }"
      >
        <p>
          iPhone SE packs our most powerful chip into our most popular size at
          our most affordable price. It’s just what you’ve been waiting for.
        </p>
      </div>

      <p
        class="left"
        :style="{ opacity: leftTextOpacity }"
      >
        Durable glass and<br />aluminum design
      </p>

      <p
        class="right"
        :style="{ opacity: rightTextOpacity }"
      >
        Brilliant 4.7”<br />Retina HD<br />display
      </p>
    </div>
  </q-page>
</template>
<script
  setup
  lang="ts"
>
import { ref, onMounted, onUnmounted } from 'vue';
import PxLoader from 'pxloader';

const iphoneCanvas = ref(null);
const loadingOpacity = ref(1);
const leftTextOpacity = ref(0);
const rightTextOpacity = ref(0);

const changeFrame = (frame: number) => {
  let index = frame - 1;
  if (index < 0) index = 0;
  if (index > 84) index = 84;

  const context = iphoneCanvas.value.getContext('2d');
  context.drawImage(images[index], 0, 0, 432, 976);
};

const moveDevice = (
  el: HTMLElement,
  current: number,
  toLeftFrom: number,
  toLeftTo: number,
  toRightFrom: number,
  toRightTo: number
) => {
  if (current <= toLeftTo) {
    if (current >= toLeftFrom) {
      const offsetRatio = (current - toLeftFrom) / (toLeftTo - toLeftFrom);
      el.style.left = `${(el.clientWidth / 2) * -1 * offsetRatio}px`;
    }
  } else {
    const offsetRatio = (current - toRightFrom) / (toRightTo - toRightFrom);
    el.style.left = `${
      (el.clientWidth / 2) * -1 + iphoneCanvas.value.width * offsetRatio
    }px`;
  }
};

const showHideText = (
  el: HTMLElement,
  current: number,
  showFrom: number,
  showTo: number,
  hideFrom?: number,
  hideTo?: number
) => {
  if (current < showFrom) {
    el.style.opacity = '0';
  }

  if (current >= showFrom && current <= showTo) {
    el.style.opacity = `${(current - showFrom) / (showTo - showFrom)}`;
  }

  if (typeof hideFrom !== 'undefined' && typeof hideTo !== 'undefined') {
    if (current > hideFrom && current <= hideTo) {
      el.style.opacity = `${(hideTo - current) / (hideTo - hideFrom)}`;
    }

    if (current > hideTo) {
      el.style.opacity = '0';
    }
  }
};

onMounted(() => {
  const loader = new PxLoader();
  const images = ref([]);

  for (let i = 0; i < 85; i++) {
    console.log(i)
    images[i] = loader.addImage(
      `https://s3-us-west-2.amazonaws.com/s.cdpn.io/2002878/iphone-se.${(
        '0' +
        (i + 1)
      ).slice(-2)}.png`
    );
  }


  loader.addCompletionListener(() => {
    const context = iphoneCanvas.value.getContext('2d');

    document.body.classList.add('loaded');

    context.drawImage(images[0], 0, 0, 432, 976);

    setTimeout(() => {
      document.documentElement.scrollTop = 2500;

      setTimeout(() => {
        document.documentElement.scrollTop = 5000;
      }, 3000);
    }, 3000);
  });

  loader.start();
});

onUnmounted(() => {
  // Cleanup logic if needed
});
</script>

<style scoped>
body {
  margin: 0;
}

body.loaded {
  height: 5000px;
}

#sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

canvas {
  position: relative;
  margin-top: -100px;
}

.left,
.right {
  font-size: 28px;
  color: #fff;
  font-family: Helvetica;
  font-weight: bold;
  position: absolute;
  top: 45%;
  opacity: 0;
}

.left {
  left: 50%;
}

.right {
  right: 50%;
}

#loading {
  font-size: 28px;
  font-family: Helvetica;
  color: #fff;
  position: absolute;
  width: 45vw;
  text-align: center;
  z-index: 10;
  font-weight: bold;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/2002878/iphone-se.01.png')
    no-repeat center center;
  background-size: contain;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -50px;
  transition: 0.5s opacity ease-in-out;
  transition-delay: 2s;
}

#loading p {
  margin-top: 40%;
}

body.loaded #loading {
  opacity: 0;
}
</style>
