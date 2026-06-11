/**
 * backend/itemsService.js
 * -----------------------
 * Firestore CRUD for the `items` collection (lost & found reports).
 *
 * Collection: `items`
 *   Document shape:
 *   {
 *     id:           string  (auto-generated),
 *     name:         string,
 *     description:  string,
 *     location:     string,
 *     type:         'Lost' | 'Found',
 *     imageUrl:     string | null,
 *     reportedBy:   string  (user uid),
 *     reporterName: string,
 *     createdAt:    Timestamp,
 *   }
 */

import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';

const COLLECTION = 'items';

// ─── Create ───────────────────────────────────────────────────────────────────

/**
 * Add a new lost/found item to Firestore.
 *
 * @param {{
 *   name: string,
 *   description: string,
 *   location: string,
 *   type: 'Lost'|'Found',
 *   imageUrl: string|null,
 *   reportedBy: string,
 *   reporterName: string,
 * }} itemData
 * @returns {Promise<string>} The new document ID
 */
export const createItem = async (itemData) => {
  const ref = await addDoc(collection(db, COLLECTION), {
    ...itemData,
    createdAt: serverTimestamp(),
  });
  return ref.id;
};

// ─── Read (one-time) ──────────────────────────────────────────────────────────

/**
 * Fetch all items once, newest first.
 *
 * @returns {Promise<object[]>}
 */
export const getItems = async () => {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

/**
 * Fetch a single item by its document ID.
 *
 * @param {string} itemId
 * @returns {Promise<object|null>}
 */
export const getItemById = async (itemId) => {
  const snap = await getDoc(doc(db, COLLECTION, itemId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

// ─── Read (real-time) ─────────────────────────────────────────────────────────

/**
 * Subscribe to live item updates, newest first.
 * Call the returned unsubscribe function to stop listening.
 *
 * @param {(items: object[]) => void} callback
 * @returns {() => void} Unsubscribe function
 *
 * @example
 *   useEffect(() => {
 *     const unsub = subscribeToItems(setItems);
 *     return unsub;
 *   }, []);
 */
export const subscribeToItems = (callback) => {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snap) => {
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(items);
  });
};

// ─── Update ───────────────────────────────────────────────────────────────────

/**
 * Partially update an item document.
 *
 * @param {string} itemId
 * @param {object} data   Fields to update
 */
export const updateItem = async (itemId, data) => {
  await updateDoc(doc(db, COLLECTION, itemId), data);
};

// ─── Delete ───────────────────────────────────────────────────────────────────

/**
 * Permanently delete an item document.
 *
 * @param {string} itemId
 */
export const deleteItem = async (itemId) => {
  await deleteDoc(doc(db, COLLECTION, itemId));
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Convert a Firestore Timestamp (or null) to a human-readable relative string.
 *
 * @param {import('firebase/firestore').Timestamp|null} timestamp
 * @returns {string}
 */
export const formatItemDate = (timestamp) => {
  if (!timestamp) return 'Just now';
  const date = timestamp.toDate();
  const diffMs = Date.now() - date.getTime();
  const mins  = Math.floor(diffMs / 60_000);
  const hours = Math.floor(diffMs / 3_600_000);
  const days  = Math.floor(diffMs / 86_400_000);

  if (mins  < 1)  return 'Just now';
  if (mins  < 60) return `${mins} min${mins > 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (days  < 7)  return `${days} day${days > 1 ? 's' : ''} ago`;
  return date.toLocaleDateString();
};
