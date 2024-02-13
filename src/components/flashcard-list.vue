<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <!-- コンテナの最大幅を設定し、両サイドに余白を確保 -->
    <h2 class="text-2xl text-center mb-6">FlashCard List</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div v-for="card in cards" :key="card.id" 
	  	class="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between h-52" 
	  	@click="card.showAnswer = !card.showAnswer"
	  >
        <div class="mb-4">
          <p v-if="!card.showAnswer" class="text-lg text-gray-800">{{ card.question }}</p>
          <p v-else class="text-lg text-gray-600">{{ card.answer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { db } from '../firebase';
import { collection, getDocs } from "firebase/firestore";

const cards = ref([]);

const fetchAllCards = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "cards"));
    cards.value = querySnapshot.docs.map(doc => ({
		id: doc.id, ...doc.data(),

      showAnswer: false // 初期状態ではanswerを非表示
    }));
  } catch (error) {
    console.error("Error fetching cards:", error);
  }
};

onMounted(fetchAllCards);
</script>
