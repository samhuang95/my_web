<template>
  <div class="flex-1">
    <q-input
      v-model="data"
      outlined
      dense
      no-error-icon
      color="brand-400"
      :placeholder="props.placeholder"
      :hint="props.hint"
      :disable="props.disable"
      :rules="props.rules"
      hide-bottom-space
      :type="props.type"
    />
  </div>
</template>
<script
  lang="ts"
  setup
>
import { useVModel } from '@vueuse/core';
import { QInput } from 'quasar';
import { ref, watch } from 'vue';

interface Props {
  modelValue: string | number | null;
  placeholder?: string;
  hint?: string;
  disable?: boolean;
  rules?: InstanceType<typeof QInput>['$props']['rules'];
  type: 'password' | 'text' | 'number';
}
const props = withDefaults(defineProps<Props>(), {
  placeholder: undefined,
  hint: undefined,
  disable: undefined,
  rules: undefined,
});
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

// const data = ref('')
// watch(()=>props.modelValue, (newValue)=>{
//   data.value = newValue
// }, {
//   immediate: true
// })
// watch(data, (newValue)=>{
//   emit('update:modelValue', newValue)
// })
const data = useVModel(props, 'modelValue');
</script>
<style
  lang="sass"
  scoped
>
// .q-field
//   background-color: #fff
.q-field--outlined
  :deep() .q-field__control
    height: 3rem
  :deep() .q-field__control:before
    background-color: #fff
    border: solid 1px theme('colors.grey.200')
    border-radius: 0.375rem
.q-field--disabled
  :deep() .q-field__control:before
    background-color: theme('colors.grey.300')
    opacity: .13
    border: solid 1px theme('colors.grey.500') !important
:deep() .q-field__bottom
  padding-top: 0.625rem
  padding-left: 0px
.q-field--error
  ::v-deep() .q-field__control:after
    border-width: 1px
</style>
