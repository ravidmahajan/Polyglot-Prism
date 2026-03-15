import translate from 'google-translate-api-x';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { text } = JSON.parse(event.body || '{}');
    if (!text) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Text is required' }) };
    }

    const result = await translate(text, { to: 'en' });
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        detectedLanguage: result.from.language.iso,
        translated: result.text,
      }),
    };
  } catch (error) {
    console.error('Detection Error:', error);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Failed to detect language' }) };
  }
};
