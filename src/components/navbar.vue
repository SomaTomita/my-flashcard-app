<template>
  <nav class="bg-cyan-500">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <!-- Mobile menu button -->
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white sm:hidden"
          @click="toggleMobileMenu"
        >
          <svg
            :class="{ hidden: isMobileMenuOpen, block: !isMobileMenuOpen }"
            class="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
          <!-- Icon when menu is open -->
          <svg
            class="hidden h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div
          class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
        >
          <!-- Logo image here -->
          <div class="flex-shrink-0 flex items-center">
            <img class="block lg:hidden h-8 w-auto" src="/icon.svg" alt="" />
            <img class="hidden lg:block h-8 w-auto" src="/icon.svg" alt="" />
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <!-- Navigation Links -->
              <router-link
                @click="toggleMobileMenu"
                to="/lists"
                class="block text-white hover:bg-cyan-400 px-3 py-2 rounded-md text-base font-medium"
                >Lists</router-link
              >
              <router-link
                @click="toggleMobileMenu"
                to="/addcard"
                class="block text-white hover:bg-cyan-400 px-3 py-2 rounded-md text-base font-medium"
                >Add Card</router-link
              >
              <a
                v-if="isLoggedIn"
                href="https://forms.gle/qRJpBZk1xm5HxPeR7"
                target="_blank"
                class="block text-white hover:bg-cyan-400 px-3 py-2 rounded-md text-base font-medium"
                >Contact</a
              >
              <router-link
                v-if="isLoggedIn"
                @click="signout"
                to="/"
                class="block text-white hover:bg-cyan-400 px-3 py-2 rounded-md text-base font-medium"
                >Sign Out</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Mobile menu -->
    <div
      :class="{ block: isMobileMenuOpen, hidden: !isMobileMenuOpen }"
      class="sm:hidden"
      id="mobile-menu"
    >
      <div class="px-2 pt-2 pb-3 space-y-1">
        <!-- Mobile Navigation Links -->
        <router-link
          @click="toggleMobileMenu"
          to="/lists"
          class="block text-white hover:bg-cyan-400 px-3 py-2 rounded-md text-base font-medium"
          >Lists</router-link
        >
        <router-link
          @click="toggleMobileMenu"
          to="/addcard"
          class="block text-white hover:bg-cyan-400 px-3 py-2 rounded-md text-base font-medium"
          >Add Card</router-link
        >
        <a
          v-if="isLoggedIn"
          href="https://forms.gle/qRJpBZk1xm5HxPeR7"
          target="_blank"
          class="block text-white hover:bg-cyan-400 px-3 py-2 rounded-md text-base font-medium"
          >Contact</a
        >
        <router-link
          v-if="isLoggedIn"
          @click="signout"
          to="/"
          class="block text-white hover:bg-cyan-400 px-3 py-2 rounded-md text-base font-medium"
          >Sign Out</router-link
        >
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { auth, signoutUser } from "../firebase";

const router = useRouter();

const isMobileMenuOpen = ref(false);

const isLoggedIn = ref(false);
onMounted(() => {
  auth.onAuthStateChanged((user) => {
    isLoggedIn.value = !!user;
  });
});

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const signout = async () => {
  const signedOut = await signoutUser();
  if (signedOut) {
    if (isMobileMenuOpen.value) toggleMobileMenu();
    alert("Signout in successfully!");
    router.push("/");
  }
};
</script>
