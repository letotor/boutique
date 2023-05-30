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

export async function seed40articles(collectionName: string) {
  await fetch('https://restapi.fr/generator', {
    method: 'POST',
    body: JSON.stringify({
      times: 40,
      resourceName: collectionName,
      title: 'name',
      image: {
        type: 'image',
        theme: 'computer',
        height: 200,
        width: 300,
      },
      category: {
        type: 'collection',
        values: ['gamer', 'desktop', 'streaming'],
        unique: false,
      },
      description: {
        type: 'sentence',
        range: [9, 12],
      },
      price: {
        type: 'number',
        range: [800, 2500],
      },
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
