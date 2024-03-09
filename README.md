# FlashCard App

https://my-flashcard-app.vercel.app/

## Technology

- **Vue.js** : v3.4.15
- **Vite** : v5.1.0
- **Tailwind CSS** : v3.4.1
- **Firebase** : v10.8.0
- **Vercel**

## Firebase features used

- **Firebase Authentication**
  - **New user registration** (createUserWithEmailAndPassword)
  - **Login** (signInWithEmailAndPassword)
  - **Logout** (SIgnOut)
  - **Authentication by email** (sendEmailVerification)
  - **Email verification state monitoring**: (onAuthStateChanged)
  - **Password reset** (sendPasswordResetEmail)
- **Cloud Firestore**
  - **Create, edit, delete, list flashcards data** (getDoc, addDoc, updateDoc, deleteDoc)

## Ingenuity Point

### router.js

- The project's routing system uses Vue Router's “beforeEach” navigation guard to ensure that pages requiring authentication cannot be accessed by unauthenticated users. This mechanism prompts users to log in first, enhancing the application's security and user experience by redirecting unauthorized access attempts to the login page.

### add-card.vue

- A custom dialog system is implemented to improve user interaction. Upon successfully adding a new flashcard, users are presented with a dialog offering the choice to add more flashcards or return to the flashcard list. This feature not only confirms the successful operation but also offers a smooth navigation flow, thus enhancing the overall user experience.

### email-verify.vue

- A special approach is used to manage the user's email verification status. The component subscribes to authentication state changes and automatically redirects the user once their email is verified. To prevent memory leaks and ensure efficient resource management, an unsubscribe function from Firebase's watchAuthState is called on component unmount. This implementation ensures a smooth user experience while maintaining application performance and security standards.
