<template>
  <ion-app>
    <ErrorBoundary>
      <ion-router-outlet />
    </ErrorBoundary>
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import ErrorBoundary from './components/ErrorBoundary.vue'; // Un composant qui pourrait attraper les erreurs non gérées.
</script>