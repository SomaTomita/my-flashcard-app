<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-2xl text-center mb-6">FlashCard List</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="card in cards"
        :key="card.id"
        class="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between h-52 relative"
        @click="toggleShowAnswer(card)"
      >
        <div class="mb-4">
          <p v-if="!card.showAnswer" class="text-lg text-gray-800">
            {{ card.question }}
          </p>
          <p v-else class="text-lg text-gray-600">{{ card.answer }}</p>
        </div>
        <div class="absolute bottom-2 right-2 flex space-x-2">
          <button
            @click.stop="confirmEdit(card)"
            class="text-xs bg-blue-200 hover:bg-blue-300 text-blue-800 px-2 py-1 rounded"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "vue-router";

const router = useRouter();

const cards = ref([]);

onMounted(async () => {
  try {
    // すべてのカードの全ての情報を取得
    const querySnapshot = await getDocs(collection(db, "cards"));
    cards.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      // 初期状態ではanswerを非表示
      showAnswer: false,
    }));
  } catch (error) {
    console.error("Error fetching cards:", error);
  }
});

const toggleShowAnswer = (card) => {
  card.showAnswer = !card.showAnswer;
};

const confirmEdit = (card) => {
  const message = `Are you sure to edit this card?
  \nQuestion: "${card.question}"\nAnswer: "${card.answer}"`;

  if (window.confirm(message)) {
    router.push({ name: "EditCard", params: { cardId: card.id } });
  }
};
</script>