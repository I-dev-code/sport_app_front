<template>
    <ion-item>
      <ion-label :position="position">{{ label }}</ion-label>
      <ion-input :type="type" v-model:modelValue="modelValue" :required="required" />
    </ion-item>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  
  const props = defineProps({
    label: String,
    type: String,
    modelValue: String,
    required: Boolean,
    position: {
      type: String,
      default: 'floating',
    },
  });
  </script>