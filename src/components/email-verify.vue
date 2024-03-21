<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h1 class="mt-6 text-center text-3xl font-bold text-cyan-800">
        Please verify your email
      </h1>
      <p class="mt-4 text-center text-sm text-cyan-800">
        Check your email inbox for the verification link.
      </p>

      <div class="mt-8">
        <h2 class="text-center text-xl font-semibold text-cyan-800">
          After you've verified, please reload this page.
        </h2>
      </div>

      <div class="mt-10 pt-5 text-center">
        <p class="text-sm text-cyan-600">Can't find the email?</p>
        <button
          @click="sendVerificationEmail"
          class="mt-2 inline-flex items-center px-4 py-2 text-sm font-medium text-cyan-800 bg-cyan-300 border border-transparent rounded-md shadow-sm hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          Resend Verification Email
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { resendVerificationEmail, watchAuthState } from "../firebase";

const router = useRouter();

// ユーザーの認証状態を監視し、メールが認証済みの場合はリダイレクトする
const unsubscribe = watchAuthState((user) => {
  if (user && user.emailVerified) {
    router.push("/lists");
  }
});
// コンポーネントのアンマウント時にリスナーを解除
onUnmounted(unsubscribe);

const sendVerificationEmail = async () => {
  const success = await resendVerificationEmail(); // 成功時trueを返す
  if (success) {
    alert("Verification email sent!");
  } else {
    alert("Failed to send verification email. Please try again");
  }
};
</script>
