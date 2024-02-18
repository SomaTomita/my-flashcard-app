<template>
  <div class="email-verify-container">
    <h1>Please verify your email?</h1>
    <p>Check your email inbox for the verification link.</p>

    <br />
    <p>After you verified, Please reload this page</p>

    <br />
    <p>you can't find the email?</p>
    <button @click="sendVerificationEmail">Resend Verification Email</button>
  </div>
</template>

<script setup>
import { onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { auth, resendVerificationEmail, watchAuthState } from "../firebase";

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
