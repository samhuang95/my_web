<template>
  <q-btn
    :label="props.label"
    :to="props.to"
    :href="props.href"
    :class="resultBtnClass"
    :icon="props.icon"
    :flat="props.btnStyle === 'flat'"
    :outline="props.btnStyle === 'outline'"
    :unelevated="props.btnStyle === 'unelevated'"
    class="general-rounded font-semibold text-[0.875rem] w-full md:w-auto whitespace-nowrap"
    no-caps
  >
    <slot />
  </q-btn>
</template>

<script lang="ts">
export enum BtnStyle {
  OUTLINE = 'outline',
  UNELEVATED = 'unelevated',
  FLAT = 'flat',
}

export enum BtnColor {
  RED = 'red',
  BRAND = 'brand',
  TEAL = 'teal',
  BLACK = 'black',
  GREY = 'grey',
  BLUE = 'blue',
}

export enum BtnSize {
  MD = 'md',
  SM = 'sm',
}
</script>

<script
  lang="ts"
  setup
>
import { computed } from 'vue';

interface Props {
  to?: {
    name: string;
    params?: unknown;
  };
  label: string;
  btnStyle: `${BtnStyle}`;
  btnColor?: `${BtnColor}`;
  btnSize?: `${BtnSize}`;
  icon?: string;
}
const props = withDefaults(defineProps<Props>(), {
  to: undefined,
  href: undefined,
  icon: undefined,
  btnColor: 'brand',
  btnSize: 'md',
});

/**
 * set button class styles
 * based on btnStyle, btnColor and btnSize tag. (btnColor default is brand)
 */
const resultBtnClass = computed(() => {
  let classList = [];

  if (props.btnStyle === 'outline') {
    // After testing various methods, this one allows us to maintain the specified border color
    classList.push('outline-btn');
  } else if (props.btnStyle === 'unelevated') {
    classList.push('text-white');
  } else if (props.btnStyle === 'flat') {
    classList.push('p3');
  }

  const isUnelevated = props.btnStyle === 'unelevated';

  // if isUnelevated is true, set background class otherwise set text class
  if (props.btnColor === 'brand') {
    classList.push(isUnelevated ? 'bg-brand-400' : 'text-brand-400');
  } else if (props.btnColor === 'red') {
    classList.push(isUnelevated ? 'bg-red-500' : 'text-red-500');
  } else if (props.btnColor === 'teal') {
    classList.push(isUnelevated ? 'bg-teal-500' : 'text-teal-500');
  } else if (props.btnColor === 'black') {
    classList.push(isUnelevated ? 'bg-grey-800' : 'text-grey-800');
  } else if (props.btnColor === 'grey') {
    classList.push(isUnelevated ? 'bg-[#858585]' : 'text-[#858585]');
  } else if (props.btnColor === 'blue') {
    classList.push(isUnelevated ? 'bg-[#5580A0]' : 'text-[#5580A0]');
  }

  if (props.btnSize === BtnSize.MD) classList.push('min-h-[36px]');
  else if (props.btnSize === BtnSize.SM) classList.push('min-h-[31px]');

  return classList;
});
</script>

<style
  lang="sass"
  scoped
>
.outline-btn
  background-color: #fff !important
  &::before
    border: solid 1px theme('colors.grey.800') !important

:deep() .q-icon
  width: 1.25rem
</style>
