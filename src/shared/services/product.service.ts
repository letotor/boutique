import { query } from 'express';
import { FiltersInterface, ProductInterface } from '../../interfaces';

export async function fetchProduct(
  filter: FiltersInterface,
): Promise<ProductInterface[] | ProductInterface | undefined> {
  try {
    // let queryBuilder = 'filter='; //new URLSearchParams();
    // queryBuilder += `[price][_gte]=${filter.priceRange[0].toString()}`;
    //   queryBuilder += `{"price": {"_gte" : "${filter.priceRange[0].toString()}"},"price": {"_lte" : "${filter.priceRange[1].toString()}"}`;
    // if (filter.category !== 'all') {
    //   queryBuilder += `,"category": {"_eq": "${filter.category}" }`;
    // }

    // queryBuilder += '}';
    let queryBuilder = `filter[category][_eq]="gamer"`;
    // queryBuilder += '&sort=price:asc';
    queryBuilder += '&limit=20';
    queryBuilder += '&page=2';
    console.debug('queryBuilder', queryBuilder);
    // queryBuilder.append('limit', 20 + '');
    // queryBuilder.append('price', `$gte:${filter.priceRange[0].toString()}`);
    // queryBuilder.append('price', `$lte:${filter.priceRange[1].toString()}`);
    const { data } = await (
      await fetch(
        `http://energieteam.dgweb.fr:8157/items/projetproducts?${queryBuilder.toString()}`,
      )
    ).json();

    console.log('Données des produits récupérées :', data);

    return data;
  } catch (error) {
    console.error(error);
  }
}
