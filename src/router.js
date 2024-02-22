import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/login.vue';
import Signup from './components/signup.vue';
import FlashcardList from './components/flashcard-list.vue';
import AddCard from './components/add-card.vue';
import EditCard from './components/edit-card.vue';
import EmailVerify from './components/email-verify.vue';
import ResetPassword from './components/reset-password.vue'

import { auth } from "./firebase"
import { onAuthStateChanged } from "firebase/auth";


const routes = [
	{ path: '/', name: 'Login', component: Login },
	{ path: '/signup', name: 'Signup', component: Signup },
	{ path: '/emailverify', name: 'EmailVerify', component: EmailVerify },
	{ path: '/resetpassword', name: 'ResetPassword', component: ResetPassword },
	{
		path: '/lists', name: 'FlashcardList', component: FlashcardList, meta: { requiresAuth: true }
	},
	{
		path: '/addcard', name: 'AddCard', component: AddCard, meta: { requiresAuth: true }
	},
	{
		path: '/edit/:cardId', name: 'EditCard', component: EditCard, meta: { requiresAuth: true }
	},
];


const router = createRouter({
	history: createWebHistory(),
	routes
});


router.beforeEach((to, from, next) => {
	onAuthStateChanged(auth, (user) => {
		// requiresAuthがあるページはログイン必須
		const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
		if (requiresAuth && !user) {
			next('/login');
		} else {
			next();
		}
	});
});

export default router;
