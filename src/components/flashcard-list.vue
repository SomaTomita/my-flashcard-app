<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="mt-6 mb-4 text-center text-3xl font-extrabold text-gray-900">
      FlashCard List
    </h2>
    <!-- カードが存在しない場合のメッセージ -->
    <div v-if="cards.length === 0" class="text-center">
      <p class="mt-2 mb-8 text-center text-sm text-gray-600">
        No card!　Let's add a flashcard with the "Add Card" button below!
      </p>
      <!-- Add Cardボタン -->
      <button
        @click="router.push('/addcard')"
        class="mt-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Card
      </button>
    </div>
    <!-- カード一覧 -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="card in cards"
        :key="card.id"
        class="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between h-52 relative"
        @click.stop="toggleShowAnswer(card)"
      >
        <div class="mb-4">
          <p v-if="!card.showAnswer" class="text-lg text-gray-800">
            {{ card.question }}
          </p>
          <p v-else class="text-lg text-gray-800">{{ card.answer }}</p>
        </div>
        <div class="absolute bottom-2 right-2 flex space-x-2">
          <button
            @click.stop="confirmEdit(card)"
            class="text-xs bg-gray-200 hover:bg-cyan-300 text-cyan-800 px-2 py-1 rounded"
          >
            Edit
          </button>
          <button
            @click.stop="confirmDelete(card)"
            class="text-xs bg-gray-200 hover:bg-red-300 text-cyan-800 px-2 py-1 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db, auth } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "vue-router";

const router = useRouter();

const cards = ref([]);

onMounted(async () => {
  try {
    // コレクションからuidに紐づく複数のドキュメントを取得
    const q = query(
      collection(db, "cards"),
      where("uid", "==", auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
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
    // edit-card画面に飛ばす
    router.push({ name: "EditCard", params: { cardId: card.id } });
  }
};

const confirmDelete = async (card) => {
  const message = `Are you sure to delete this card?
  \nQuestion: "${card.question}"\nAnswer: "${card.answer}"`;

  if (window.confirm(message)) {
    await deleteDoc(doc(db, "cards", card.id));
    // 削除されたカードをフィルター
    cards.value = cards.value.filter((c) => c.id !== card.id);
  }
};
</script>
