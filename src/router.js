import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/login.vue';
import Signup from './components/signup.vue';
import FlashcardList from './components/flashcard-list.vue';
import AddCard from './components/add-card.vue';
import EditCard from './components/edit-card.vue';


const routes = [
	{ path: '/', name: 'Login', component: Login },
	{ path: '/signup', name: 'Signup', component: Signup },
	{ path: '/lists', name: 'FlashcardList', component: FlashcardList },
	{ path: '/addcard', name: 'AddCard', component: AddCard },
	{ path: '/edit/:cardId', name: 'EditCard', component: EditCard }
];


const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;