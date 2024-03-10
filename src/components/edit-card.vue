<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl mb-4">Edit Card</h1>
    <!-- onMounted で card が実際に設定されるまで、フォームが表示されないようにする -->
    <div v-if="card">
      <div class="mb-4">
        <label for="question" class="block mb-2">Question:</label>
        <input
          type="text"
          id="question"
          v-model="card.question"
          class="border rounded p-2 w-full"
          required
        />
      </div>
      <div class="mb-4">
        <label for="answer" class="block mb-2">Answer:</label>
        <input
          type="text"
          id="answer"
          v-model="card.answer"
          class="border rounded p-2 w-full"
          required
        />
      </div>
      <button
        @click="confirmAndUpdate"
        class="border bg-cyan-200 hover:bg-cyan-300 text-cyan-800 font-bold py-2 px-4 rounded"
      >
        Update
      </button>
      <button
        @click="router.push('/lists')"
        class="border bg-gray-200 hover:bg-red-300 text-cyan-800 font-bold py-2 px-4 rounded"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

// listsで指定されたカードのドキュメントのidを取得
const route = useRoute();
const cardId = route.params.cardId;

const router = useRouter();

const card = ref(null);

onMounted(async () => {
  try {
    //　指定のカード情報を取得
    const docRef = doc(db, "cards", cardId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      card.value = { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching card:", error);
  }
});

const confirmAndUpdate = async () => {
  const message = `Are you sure to update this card?
  \nQuestion: "${card.value.question}"\nAnswer: "${card.value.answer}"`;

  if (window.confirm(message)) {
    try {
      const cardRef = doc(db, "cards", cardId);
      await updateDoc(cardRef, {
        question: card.value.question,
        answer: card.value.answer,
      });
      // update成功後一覧画面へ
      router.push("/lists");
    } catch (error) {
      console.error("Error updating card:", error);
    }
  }
};
</script>
