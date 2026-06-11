# Firebase Setup Guide — CampusFinder

Follow these steps **once** to connect the app to your Firebase project.

---

## 1. Create a Firebase project

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add project**, give it a name (e.g. `CampusFinder`), and follow the prompts.

---

## 2. Register a Web app

1. In the Firebase Console, click the **</>** (Web) icon on the Project Overview page.
2. Give the app a nickname (e.g. `CampusFinder`), click **Register app**.
3. Copy the `firebaseConfig` object — you'll need it in the next step.

---

## 3. Paste your credentials into `firebaseConfig.js`

Open `firebaseConfig.js` in the project root and replace every `"YOUR_…"` placeholder:

```js
const firebaseConfig = {
  apiKey:            'AIzaSy…',
  authDomain:        'your-project-id.firebaseapp.com',
  projectId:         'your-project-id',
  storageBucket:     'your-project-id.appspot.com',
  messagingSenderId: '123456789012',
  appId:             '1:123456789012:web:abc123',
};
```

---

## 4. Enable Authentication

1. In the Firebase Console → **Authentication** → **Get started**.
2. Under **Sign-in method**, enable **Email/Password**.

This gives you user registration, login, and email verification automatically.

---

## 5. Create the Firestore database

1. Firebase Console → **Firestore Database** → **Create database**.
2. Choose **Start in test mode** (for development — you'll add security rules later).
3. Pick a region and click **Done**.

The app will automatically create these **three collections** on first use:

| Collection | What it stores |
|------------|----------------|
| `users`    | User profiles (name, email, uid, emailVerified) |
| `items`    | Lost & Found reports (name, description, location, type, imageUrl, reportedBy, reporterName, createdAt) |
| `chats`    | Conversations + sub-collection `messages` per chat |

---

## 6. Set up Cloudinary for item photos (free — no credit card)

Firebase Storage now requires a paid plan, so the app uses **Cloudinary** instead.

1. Create a free account at [https://cloudinary.com](https://cloudinary.com)
2. After login, copy your **Cloud name** from the top of the dashboard
3. Go to **Settings → Upload → Upload presets → Add upload preset**
   - Set **Signing mode** to `Unsigned`
   - Name it e.g. `campusfinder_items`
   - Click **Save**
4. Open `cloudinaryConfig.js` and fill in both values:

```js
export const CLOUDINARY_CLOUD_NAME   = 'your-cloud-name';
export const CLOUDINARY_UPLOAD_PRESET = 'campusfinder_items';
```

Free tier limits (plenty for a campus app):
- 25 GB storage
- 25 GB bandwidth / month

---

## 7. Add Firestore security rules (before going live)

Replace the default rules in **Firestore → Rules** with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Users can only read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Any signed-in user can read items; only the owner can update/delete
    match /items/{itemId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null
        && request.auth.uid == resource.data.reportedBy;
    }

    // Chat participants can read and write their own chats
    match /chats/{chatId} {
      allow read, write: if request.auth != null
        && request.auth.uid in resource.data.participants;

      match /messages/{messageId} {
        allow read, write: if request.auth != null;
      }
    }
  }
}
```

---

## 8. Run the app

```bash
npx expo start
```

- Scan the QR code with **Expo Go** on your phone, or
- Press **a** for Android emulator / **i** for iOS simulator.

---

## Data flow summary

```
User signs up
  └─► Firebase Auth creates account
  └─► Firestore `users/{uid}` document saved  (name, email)
  └─► Verification email sent

User verifies email
  └─► Firebase Auth marks emailVerified = true
  └─► Firestore `users/{uid}.emailVerified` updated

User reports a lost/found item
  └─► Image uploaded to Firebase Storage  → imageUrl
  └─► Firestore `items/{id}` document saved

User opens an item & starts chat
  └─► Firestore `chats/{id}` document created (participants, itemId)
  └─► Messages stored in `chats/{id}/messages/{msgId}`
  └─► Real-time listener updates the UI instantly
```

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `FirebaseError: auth/api-key-not-valid` | Double-check the `apiKey` in `firebaseConfig.js` |
| Firestore reads always return empty | Make sure you created the database and are in test mode |
| Storage uploads fail | Enable Firebase Storage and confirm the `storageBucket` value |
| Email verification not arriving | Check spam folder; make sure Email/Password auth is enabled |
