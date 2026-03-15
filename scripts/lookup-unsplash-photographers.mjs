/**
 * Looks up Unsplash photographer names for photos used in culturalImages.js.
 *
 * Usage:
 *   1. Create a free app at https://unsplash.com/developers
 *   2. Copy your Access Key
 *   3. Run:  node scripts/lookup-unsplash-photographers.mjs YOUR_ACCESS_KEY
 *
 * The script searches Unsplash for each photo's CDN image ID and prints
 * the photographer name when a match is found.
 */

const ACCESS_KEY = process.argv[2];
if (!ACCESS_KEY) {
  console.error('Usage: node scripts/lookup-unsplash-photographers.mjs <UNSPLASH_ACCESS_KEY>');
  process.exit(1);
}

const PHOTOS = [
  { id: 'photo-1640546088631-fd6e3e88dec0', desc: 'Fushimi Inari torii gates Kyoto', query: 'fushimi inari torii gates kyoto' },
  { id: 'photo-1682768029347-0425b90fa196', desc: 'Mount Fuji reflected in lake', query: 'mount fuji reflected lake snow' },
  { id: 'photo-1709889580157-e7e741d5aafc', desc: 'Japanese garden koi pond bonsai', query: 'japanese garden koi pond bonsai' },
  { id: 'photo-1763775360405-9fca3c8da95d', desc: 'Shibuya crossing neon Tokyo', query: 'shibuya crossing neon tokyo night' },
  { id: 'photo-1545569341-9eb8b30979d9', desc: 'Bamboo forest Arashiyama Kyoto', query: 'bamboo forest arashiyama kyoto' },
  { id: 'photo-1528360983277-13d401cdc186', desc: 'Japanese sushi platter sashimi', query: 'japanese sushi platter sashimi' },
  { id: 'photo-1524413840807-0c3cb6fa808d', desc: 'Cherry blossom trees river', query: 'cherry blossom trees river japan' },
  { id: 'photo-1551641506-ee5bf4cb45f1', desc: 'Osaka Castle autumn foliage', query: 'osaka castle autumn foliage' },
];

const HEADERS = { Authorization: `Client-ID ${ACCESS_KEY}` };

async function searchPhoto({ id, desc, query }) {
  const ts = id.replace('photo-', '').split('-')[0];

  for (let page = 1; page <= 10; page++) {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=30&page=${page}`;
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) {
      console.error(`  API error ${res.status} for "${query}" page ${page}`);
      break;
    }
    const data = await res.json();
    if (!data.results?.length) break;

    for (const photo of data.results) {
      const rawUrl = photo.urls?.raw || '';
      if (rawUrl.includes(ts)) {
        return { id, desc, photographer: photo.user?.name, username: photo.user?.username, photoUrl: photo.links?.html };
      }
    }
  }
  return { id, desc, photographer: 'Unknown', username: null, photoUrl: null };
}

async function main() {
  console.log('Looking up Unsplash photographers...\n');
  const results = [];

  for (const photo of PHOTOS) {
    process.stdout.write(`Searching: ${photo.desc}...`);
    const result = await searchPhoto(photo);
    console.log(result.photographer !== 'Unknown' ? ` ✓ ${result.photographer}` : ' ✗ Not found');
    results.push(result);
    await new Promise(r => setTimeout(r, 500));
  }

  console.log('\n--- Results ---\n');
  for (const r of results) {
    const credit = r.photographer !== 'Unknown'
      ? `${r.photographer} (@${r.username}) — ${r.photoUrl}`
      : 'Unknown';
    console.log(`${r.id} | ${r.desc} | ${credit}`);
  }
}

main().catch(console.error);
