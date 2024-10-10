<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Connexion</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-content>
          <form @submit.prevent="handleSubmit">
            <ion-item>
              <ion-label position="floating">Adresse e-mail</ion-label>
              <ion-input :modelValue="email" @ionChange="e => email = e.detail.value" type="email" required></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Mot de passe</ion-label>
              <ion-input :modelValue="password" @ionChange="e => password = e.detail.value" type="password" required></ion-input>
            </ion-item>
            <ion-button expand="full" type="submit" class="ion-margin-top">
              Se connecter
            </ion-button>
          </form>
          <div class="ion-text-center ion-margin-top">
            Pas de compte ? <router-link to="/register">Inscrivez-vous ici</router-link>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCardContent, IonCard, IonItem, IonLabel, IonInput } from '@ionic/vue';
import { loginUser } from '@/services/useService';

const email = ref('');
const password = ref('');
const router = useRouter();

const handleSubmit = async () => {

  try {
    const response = await loginUser(email.value, password.value)

    if (response.status === 200) {
      const data = await response.data;
      console.log('Réponse du serveur :', data);
      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    } else {
      console.error('Erreur:', response.data);
      alert('Erreur : ' + (response.data.message || 'Erreur lors de la connexion.'));
    }
  } catch (err) {
    console.error('Erreur lors de la connexion :', err);
    if (err.response) {
      alert('Erreur : ' + err.response.data.message);
    } else {
      alert('Une erreur est survenue. Veuillez réessayer plus tard.');
    }
  }
};
</script>

<style scoped>
/* Vos styles personnalisés */
</style>