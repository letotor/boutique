import data from '../../../data/product';
export async function seed(collectionName: string) {
  try {
    const res = await fetch(
      `http://energieteam.dgweb.fr:8157/items/projetproducts/${collectionName}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
}
