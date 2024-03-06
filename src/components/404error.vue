<template>
  <main
    class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8"
  >
    <div class="text-center">
      <p class="text-base font-semibold text-cyan-600">404</p>
      <h1
        class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl"
      >
        Page not found
      </h1>
      <p class="mt-6 text-base leading-7 text-gray-600">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <button
          @click="goHome"
          class="rounded-md bg-cyan-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
        >
          Go back home
        </button>
        <a
          href="YOUR_GOOGLE_FORM_LINK"
          class="text-sm font-semibold text-gray-900"
          >Contact support <span aria-hidden="true">&rarr;</span></a
        >
      </div>
    </div>
  </main>
</template>

<script setup>
import { useRouter } from "vue-router";
import { auth } from "../firebase";

const router = useRouter();

const goHome = () => {
  if (auth.currentUser) {
    router.push("/lists");
  } else {
    router.push("/");
  }
};
</script>
