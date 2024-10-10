<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Inscription</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding">
        <ion-card>
          <ion-card-content>
            <form @submit.prevent="handleSubmit">
              <ion-item>
                <ion-label position="floating">Nom complet</ion-label>
                <ion-input :modelValue="nom" @ionChange="e => nom = e.detail.value" required></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">Adresse e-mail</ion-label>
                <ion-input :modelValue="email" type="email" @ionChange="e => email = e.detail.value" required></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">Mot de passe</ion-label>
                <ion-input :modelValue="password" type="password" @ionChange="e => password = e.detail.value" required></ion-input>
              </ion-item>
              <ion-button expand="full" type="submit" class="ion-margin-top">
                Créer un compte
              </ion-button>
            </form>
            <div class="ion-text-center ion-margin-top">
              Déjà un compte ? <router-link to="/login">Connectez-vous ici</router-link>
            </div>
          </ion-card-content>
        </ion-card>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCardContent, IonCard, IonItem, IonLabel, IonInput } from '@ionic/vue';
  import { useRouter } from 'vue-router';
  import { registerUser } from '@/services/useService'
  
  const nom = ref('');
  const email = ref('');
  const password = ref('');
  const router = useRouter();
  
  const handleSubmit = async () => {
    try {
      // Vérification des valeurs de nom, email et password
      console.log('Nom:', nom.value);
      console.log('Email:', email.value);
      console.log('Mot de Passe:', password.value);
  
      const userData = {
        nom: nom.value.trim(),
        email: email.value.trim(),
        motDePasse: password.value,
      };
  
      console.log('Données envoyées :', userData);
  
      const response = await registerUser(userData);
  
      if (response.status === 200) {
        alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
        router.push('/login');
      } else {
        alert('Erreur : ' + (response.data.message || 'Une erreur est survenue.'));
      }
    } catch (err) {
      console.error('Erreur lors de l\'inscription :', err);
      if (err.response && err.response.data && err.response.data.message) {
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