<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tableau de bord</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div v-if="isProfileComplete">
        <p>Bienvenue, {{ user.nom }} !</p>
        <ion-card class="user-info-widget">
          <ion-card-header>
            <ion-card-title>Informations Utilisateur</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p><strong>Genre :</strong> {{ genre }}</p>
            <p><strong>Âge :</strong> {{ age }} ans</p>
            <p><strong>Taille :</strong> {{ taille }} cm</p>
            <p><strong>Poids :</strong> {{ poids }} kg</p>
          </ion-card-content>
        </ion-card>
        <ion-card class="bmr-widget">
          <ion-card-header>
            <ion-card-title>Calcul du Métabolisme Basal</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p><strong>Métabolisme Basal (BMR) :</strong> {{ bmr }} kcal/jour</p>
            <p><strong>Calories Dépensées par Jour (avec activité) :</strong> {{ tdee }} kcal/jour</p>
          </ion-card-content>
        </ion-card>
        <ion-button expand="full" color="primary" @click="editProfile" class="ion-margin-top">
          Modifier les informations
        </ion-button>
      </div>
      <div v-else>
        <ion-card>
          <ion-card-content>
            <form @submit.prevent="handleSubmit">
              <ion-item>
                <ion-label position="floating">Genre</ion-label>
                <ion-select :modelValue="genre" @ionChange="e => genre = e.detail.value" required>
                  <ion-select-option value="Homme">Homme</ion-select-option>
                  <ion-select-option value="Femme">Femme</ion-select-option>
                </ion-select>
              </ion-item>
              <ion-item>
                <ion-label position="floating">Âge</ion-label>
                <ion-input :modelValue="age" @ionChange="e => age = e.detail.value" type="number" required></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">Taille (cm)</ion-label>
                <ion-input :modelValue="taille" @ionChange="e => taille = e.detail.value" type="number" required></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">Poids (kg)</ion-label>
                <ion-input :modelValue="poids" @ionChange="e => poids = e.detail.value" type="number" required></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">Niveau d'activité</ion-label>
                <ion-select :modelValue="activityLevel" @ionChange="e => activityLevel = e.detail.value" required>
                  <ion-select-option value="1">Sédentaire (peu ou pas d'exercice)</ion-select-option>
                  <ion-select-option value="2">Activité légère (1-3 jours/semaine)</ion-select-option>
                  <ion-select-option value="3">Activité modérée (3-5 jours/semaine)</ion-select-option>
                  <ion-select-option value="4">Activité intense (6-7 jours/semaine)</ion-select-option>
                  <ion-select-option value="5">Très intense (2x par jour, entraînements très durs)</ion-select-option>
                </ion-select>
              </ion-item>
              <ion-button expand="full" type="submit" class="ion-margin-top">
                Enregistrer les informations
              </ion-button>
              <ion-button expand="full" color="medium" @click="cancelEdit" class="ion-margin-top">
                Annuler
              </ion-button>
            </form>
          </ion-card-content>
        </ion-card>
      </div>
      <ion-button expand="full" color="danger" @click="handleLogout" class="ion-margin-top">
        Se déconnecter
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { IonSelect, IonSelectOption, IonCardTitle, IonCardHeader, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCardContent, IonCard, IonItem, IonLabel, IonInput } from '@ionic/vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const user = ref(null);
const isProfileComplete = ref(false);
const genre = ref('');
const age = ref(null);
const taille = ref(null);
const poids = ref(null);
const activityLevel = ref('');
const router = useRouter();

const activityLevelLabel = computed(() => {
  const labels = {
    1: 'Très faible',
    2: 'Faible',
    3: 'Modéré',
    4: 'Actif',
    5: 'Très actif',
  };
  return labels[activityLevel.value] || null;
});

onMounted(async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    router.push('/login');
    return;
  }
  
  await fetchUserProfile(token);
});

const fetchUserProfile = async (token: string) => {
  try {
    const response = await axios.get('http://localhost:5000/api/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (response.status === 200) {
      const data = response.data;
      user.value = data;
      genre.value = data.genre || '';
      age.value = data.age || null;
      taille.value = data.taille || null;
      poids.value = data.poids || null;
      activityLevel.value = data.activityLevel || '';
      
      if (genre.value && age.value && taille.value && poids.value && activityLevel.value) {
        isProfileComplete.value = true;
      } else {
        isProfileComplete.value = false;
      }
    } else {
      router.push('/login');
    }
  } catch (err) {
    console.error(err);
    router.push('/login');
  }
};

const handleSubmit = async () => {
  const token = localStorage.getItem('token');

  try {
    const profileData = {
      genre: genre.value,
      age: parseInt(age.value),
      taille: parseFloat(taille.value),
      poids: parseFloat(poids.value),
      activityLevel: activityLevel.value,
    };

    const response = await axios.put('http://localhost:5000/api/users/updateprofile', profileData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      // Mettre à jour les informations de l'utilisateur localement
      user.value = { ...user.value, ...profileData };
      alert('Profil mis à jour avec succès.');
      isProfileComplete.value = true;
    } else {
      alert('Erreur : ' + (response.data.message || 'Erreur lors de la mise à jour du profil.'));
    }
  } catch (err) {
    console.error('Erreur lors de la mise à jour du profil :', err);
    alert('Une erreur est survenue. Veuillez réessayer plus tard.');
  }
};

const editProfile = () => {
  isProfileComplete.value = false;
};

const cancelEdit = () => {
  isProfileComplete.value = true;
};

const handleLogout = () => {
  localStorage.removeItem('token');
  router.push('/login');
};

const bmr = computed(() => {
  if (genre.value && age.value && taille.value && poids.value) {
    if (genre.value === 'Homme') {
      return 88.362 + (13.397 * poids.value) + (4.799 * taille.value) - (5.677 * age.value);
    } else if (genre.value === 'Femme') {
      return 447.593 + (9.247 * poids.value) + (3.098 * taille.value) - (4.330 * age.value);
    }
  }
  return 0;
});

const tdee = computed(() => {
  const activityFactors = {
    sédentaire: 1.2,
    leger: 1.375,
    modere: 1.55,
    intense: 1.725,
    tres_intense: 1.9,
  };
  return bmr.value * (activityFactors[activityLevel.value] || 1);
});
</script>

<style scoped>
/* Vos styles personnalisés */
.user-info-widget {
  margin-top: 20px;
}
.bmr-widget {
  margin-top: 20px;
}
</style>
