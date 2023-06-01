import { query } from 'express';
import { FiltersInterface, ProductInterface } from '../../interfaces';

export async function fetchProduct(
  filter: FiltersInterface,
  page: number,
): Promise<ProductInterface[] | ProductInterface> {
  let queryBuilder = 'filter='; //new URLSearchParams();
  queryBuilder += `{"price": {"_gte" : "${filter.priceRange[0].toString()}"},"price": {"_lte" : "${filter.priceRange[1].toString()}"}`;
  // if (filter.category !== 'all') {
  //   queryBuilder += `,"category": {"_eq": "${filter.category}" }`;
  // }
  queryBuilder += '}';
  // let queryBuilder = `filter[category][_eq]="gamer"`;
  // queryBuilder += '&sort=price:asc';
  queryBuilder += '&limit=20';
  if (page != 1) queryBuilder += `&page=${page}`;
  // queryBuilder.append('skip', ((page - 1) * 20).toString()+'');
  console.debug('queryBuilder', queryBuilder);
  // queryBuilder.append('limit', 20 + '');
  // queryBuilder.append('price', `$gte:${filter.priceRange[0].toString()}`);
  // queryBuilder.append('price', `$lte:${filter.priceRange[1].toString()}`);
  const { data } = await (
    await fetch(
      `http://energieteam.dgweb.fr:8157/items/projetproducts?${queryBuilder.toString()}`,
    )
  ).json();

  console.debug('Données des produits récupérées a partir du fetch :', data);

  return data;
}
