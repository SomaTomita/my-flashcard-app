<template>
  <div>
    <form @submit.prevent="addFlashcard">
      <div>
        <label for="question">Question:</label>
        <input type="text" id="question" v-model="question" />
      </div>
      <div>
        <label for="answer">Answer:</label>
        <input type="text" id="answer" v-model="answer" />
      </div>
      <button type="submit">Add Flashcard</button>
    </form>
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
    console.log("Document written with ID: ", docRef.id);
    alert("Flashcard added successfully!");

    // プロパティのリセット
    question.value = "";
    answer.value = "";
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
</script>
