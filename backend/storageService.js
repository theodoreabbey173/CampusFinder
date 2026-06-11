/**
 * backend/storageService.js
 * -------------------------
 * Image upload via Cloudinary's free REST API.
 * No Firebase Storage (paid) required.
 *
 * Free tier limits (more than enough for a campus app):
 *   • 25 GB storage
 *   • 25 GB bandwidth / month
 *   • Unlimited uploads on free plan
 *
 * Setup: fill in cloudinaryConfig.js  (see comments there)
 */

import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from '../cloudinaryConfig';

// ─── Upload ───────────────────────────────────────────────────────────────────

/**
 * Upload a local image URI to Cloudinary and return the public HTTPS URL.
 *
 * Uses an *unsigned* upload preset so no API secret is ever exposed in the app.
 *
 * @param {string} uri     Local file URI from expo-image-picker (e.g. "file:///…")
 * @param {string} folder  Cloudinary folder to organise uploads (default: "campusfinder")
 * @returns {Promise<string>} Public HTTPS URL of the uploaded image
 *
 * @example
 *   const url = await uploadImage(result.assets[0].uri);
 *   // Store `url` in Firestore as imageUrl
 */
export const uploadImage = async (uri, folder = 'campusfinder') => {
  // Build multipart form data — Cloudinary accepts this directly
  const extension = uri.split('.').pop()?.toLowerCase() ?? 'jpg';
  const mimeType  = extension === 'png' ? 'image/png' : 'image/jpeg';

  const formData = new FormData();
  formData.append('file', {
    uri,
    type: mimeType,
    name: `upload.${extension}`,
  });
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  formData.append('folder', folder);

  // POST to Cloudinary's unsigned upload endpoint
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body:   formData,
      // Note: do NOT set Content-Type header — fetch sets it automatically
      //       with the correct multipart boundary when body is FormData.
    },
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message ?? `Upload failed (HTTP ${response.status})`);
  }

  const data = await response.json();
  // secure_url is always HTTPS
  return data.secure_url;
};

// ─── Delete ───────────────────────────────────────────────────────────────────

/**
 * Deleting images via the Cloudinary API requires the API secret (server-side only).
 * For a mobile app, simply leave the old image in Cloudinary — free tier storage
 * is generous enough that this won't matter for a campus project.
 *
 * If you later add a backend server or Cloud Function you can call:
 *   DELETE https://api.cloudinary.com/v1_1/{cloud}/resources/image/upload/{publicId}
 */
export const deleteImage = async (_imageUrl) => {
  // No-op on the client side for now (requires server-side API secret)
  console.warn('deleteImage: client-side deletion not supported with unsigned preset.');
};
