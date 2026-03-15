const API_BASE = '/api';

export async function translateText(text, from = 'en') {
  const res = await fetch(`${API_BASE}/translate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, from }),
  });
  if (!res.ok) throw new Error('Translation failed');
  return res.json();
}

export async function detectLanguage(text) {
  const res = await fetch(`${API_BASE}/detect`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error('Detection failed');
  return res.json();
}
