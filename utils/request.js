const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// Fetch all jokes
async function fetchJokes() {
  try {
    // Handle the case where the domain is not available yet (Because of Vercel deployment)
    if (!apiDomain) {
      return [];
    }

    const res = await fetch(`${apiDomain}/jokes`);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

// Fetch single joke
async function fetchJoke(id) {
  try {
    // Handle the case where the domain is not available yet (Because of Vercel deployment)
    if (!apiDomain) {
      return null;
    }

    const res = await fetch(`${apiDomain}/jokes/${id}`);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { fetchJokes, fetchJoke };
