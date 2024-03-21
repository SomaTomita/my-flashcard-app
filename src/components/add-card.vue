<template>
  <div class="flex min-h-screen justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Add a New Flashcard
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Enter the question and answer for your new flashcard.
        </p>
      </div>
      <form
        v-if="!showDialog"
        @submit.prevent="addFlashcard"
        class="mt-8 space-y-6"
      >
        <div>
          <label for="question" class="block text-sm font-medium text-gray-700"
            >Question:</label
          >
          <textarea
            id="question"
            v-model="question"
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
            v-model="answer"
            rows="4"
            class="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm"
            required
            placeholder="Type here..."
          ></textarea>
        </div>
        <button
          type="submit"
          class="group relative flex w-full justify-center rounded-md border border-transparent bg-cyan-600 py-2 px-4 text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
        >
          Add Flashcard
        </button>
      </form>

      <!-- Dialog -->
      <div
        v-if="showDialog"
        class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
      >
        <div class="bg-white rounded-lg shadow-xl p-8 space-y-4">
          <h2 class="text-center text-2xl font-extrabold text-gray-600">
            Flashcard added successfully!
          </h2>
          <p class="text-center text-sm text-gray-600">
            Please choose your next action.
          </p>
          <div class="p-6 flex justify-center space-x-8">
            <button
              @click="addMore"
              class="inline-flex items-center justify-center rounded-md border border-transparent bg-cyan-600 hover:bg-cyan-700 px-4 py-2 text-sm font-medium text-white"
            >
              Add more card🪪
            </button>
            <button
              @click="backToLists"
              class="inline-flex items-center justify-center rounded-md border border-transparent bg-cyan-600 hover:bg-cyan-700 px-4 py-2 text-sm font-medium text-white"
            >
              Back to lists🏠
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

const router = useRouter();

const question = ref("");
const answer = ref("");

const showDialog = ref(false);

const addFlashcard = async () => {
  if (!auth.currentUser) {
    console.error("please login first");
    router.push("/");
    return;
  }

  try {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "cards"), {
      uid: auth.currentUser.uid,
      question: question.value,
      answer: answer.value,
    });

    const message = `Are you sure to add this card?
  \nQuestion: "${question.value}"\nAnswer: "${answer.value}"`;
    if (window.confirm(message)) {
      console.log("Document written with ID: ", docRef.id);
      // ダイアログ表示
      showDialog.value = true;
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const addMore = () => {
  // ダイアログを非表示にして、フォームをリセット
  showDialog.value = false;
  question.value = "";
  answer.value = "";
};

const backToLists = () => router.push("/lists");
</script>
