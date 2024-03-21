<template>
  <div class="flex min-h-screen justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Edit your Flashcard
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Enter the question and answer for the flashcard you wish to update.
        </p>
      </div>
      <!-- onMounted で card が実際に設定されるまで、フォームが表示されないようにする -->
      <div v-if="card" class="mt-8 space-y-6">
        <div>
          <label for="question" class="block text-sm font-medium text-gray-700"
            >Question:</label
          >
          <textarea
            id="question"
            v-model="card.question"
            rows="4"
            class="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm"
            required
            placeholder="Type here..."
          ></textarea>
        </div>
        <div>
          <label for="answer" class="block text-sm font-medium text-gray-700"
            >Answer:</label
          >
          <textarea
            id="answer"
            v-model="card.answer"
            rows="4"
            class="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm"
            required
            placeholder="Type here..."
          ></textarea>
        </div>
        <button
          @click="confirmAndUpdate"
          class="group relative flex w-full justify-center rounded-md border border-transparent bg-cyan-600 py-2 px-4 text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
        >
          Update
        </button>
        <button
          @click="router.push('/lists')"
          class="mt-4 group relative flex w-full justify-center rounded-md border border-transparent bg-gray-200 hover:bg-gray-300 py-2 px-4 text-sm font-medium text-cyan-800"
        >
          Cancel
        </button>
      </div>
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
      alert("Edit your flashcard in successfully!");
      router.push("/lists");
    } catch (error) {
      console.error("Error updating card:", error);
    }
  }
};
</script>
