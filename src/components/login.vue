<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="flex sm:mx-auto sm:w-full sm:max-w-2xl lg:justify-between">
      <!-- Flashcard Logo -->
      <img
        class="h-auto w-1/2 max-w-xs self-center opacity-75 mr-10"
        :src="flashcardLogo"
        alt="Flashcard Logo"
      />
      <!-- Sign in Form -->
      <div class="flex-1">
        <div class="w-full max-w-md space-y-8">
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in
          </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" @submit.prevent="login">
            <div>
              <label
                for="email"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Email address</label
              >
              <div class="mt-2">
                <input
                  v-model="email"
                  id="email"
                  type="email"
                  autocomplete="email"
                  required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label
                  for="password"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Password</label
                >
                <div class="text-sm">
                  <a
                    href="/resetpassword"
                    class="font-semibold text-cyan-600 hover:text-cyan-500"
                    >Forgot password?</a
                  >
                </div>
              </div>
              <div class="mt-2">
                <input
                  v-model="password"
                  id="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
              >
                Sign in
              </button>
            </div>
            <div class="mt-4 text-center">
              <p class="text-sm text-gray-600">
                Don't have an account?
                <router-link
                  to="/signup"
                  class="font-medium text-cyan-600 hover:text-cyan-500"
                >
                  Let's Sign up!
                </router-link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { signin } from "../firebase";
import flashcardLogo from "../assets/flashcardimg.webp";

const email = ref("");
const password = ref("");

const router = useRouter();

const login = async () => {
  try {
    const Credential = await signin(email.value, password.value);

    if (Credential.user.emailVerified) {
      alert("Signed in successfully!");
      router.push("/lists");
    } else {
      // ログイン時メール未認証の場合、メール認証の画面にリダイレクト
      alert("Please complete email verification first");
      router.push("/emailverify");
    }
  } catch (error) {
    alert(error.message);
  }
};
</script>
