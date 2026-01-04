// src/utils/assets.js
export const asset = (path) => {
  if (!path) return '';
  const base = import.meta.env.BASE_URL.replace(/\/$/, ''); // Quita la barra final de la base si existe
  const cleanPath = path.startsWith('/') ? path : `/${path}`; // Asegura que el path empiece con una barra
  return `${base}${cleanPath}`;
};