import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/login.vue';
import Signup from './components/signup.vue';
import FlashcardList from './components/flashcard-list.vue';
import AddCard from './components/add-card.vue';
import EditCard from './components/edit-card.vue';
import EmailVerify from './components/email-verify.vue';
import ResetPassword from './components/reset-password.vue'
import ErrorPage from "./components/404error.vue"

import { auth } from "./firebase"

const routes = [
	{ path: '/', name: 'Login', component: Login },
	{ path: '/signup', name: 'Signup', component: Signup },
	{ path: '/emailverify', name: 'EmailVerify', component: EmailVerify },
	{ path: '/resetpassword', name: 'ResetPassword', component: ResetPassword },
	{ path: '/lists', name: 'FlashcardList', component: FlashcardList, meta: { requiresAuth: true } },
	{ path: '/addcard', name: 'AddCard', component: AddCard, meta: { requiresAuth: true } },
	{ path: '/edit/:cardId', name: 'EditCard', component: EditCard, meta: { requiresAuth: true } },
	// すべてのパスをキャッチ
	{ path: '/:matchAll(.*)', name: 'Error', component: ErrorPage }
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

router.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
	// 【TODO】 ログアウト時にalertが出る
	auth.onAuthStateChanged(user => {
		if (requiresAuth && !user) {
			// 認証が必要なページへのアクセスに対してログインページへリダイレクト
			alert("Please login first.");
			next('/');
		} else {
			// 認証が不要、またはユーザーがログインしている場合
			next();
		}
	});
});

export default router;
