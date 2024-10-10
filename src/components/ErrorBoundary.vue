<template>
    <div>
      <slot v-if="!hasError" />
      <div v-else class="error-message">
        <h2>Une erreur est survenue</h2>
        <p>Il semble qu'une erreur ait eu lieu lors du rendu de cette page. Veuillez essayer de recharger la page.</p>
        <ion-button @click="reloadPage">Recharger</ion-button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onErrorCaptured } from 'vue';
  import { IonButton } from '@ionic/vue';
  
  export default defineComponent({
    name: 'ErrorBoundary',
    components: {
      IonButton,
    },
    setup() {
      const hasError = ref(false);
  
      const reloadPage = () => {
        window.location.reload();
      };
  
      onErrorCaptured(() => {
        hasError.value = true;
        return false; // Empêche la propagation de l'erreur
      });
  
      return {
        hasError,
        reloadPage,
      };
    },
  });
  </script>
  
  <style scoped>
  .error-message {
    padding: 20px;
    text-align: center;
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
    border-radius: 8px;
  }
  </style>