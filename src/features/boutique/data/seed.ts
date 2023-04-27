import data from '../../../data/product'
export async function seed(collectionName: string) {
  try {
    const res = await fetch(`https://restapi.fr/api/${collectionName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
}
