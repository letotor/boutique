import { faker } from '@faker-js/faker';
import { ProductInterface } from '../interfaces';

export default [
  {
    id: 1,
    title: 'Macbook Pro',
    image: 'src/assets/images/MacBookPro-mit-M1-scaled.webp',
    price: 1500,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing edolor tempore ipsam cum ipsum reiciendis',
    category: 'laptop',
  },
  {
    id: 2,
    image: 'src/assets/images/levono.webp',
    title: 'Levono Pro',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing edolor tempore ipsam cum ipsum reiciendis',
    price: 2300,
    category: 'all',
  },
  {
    id: 3,
    image: 'src/assets/images/rider.webp',
    title: 'Rider',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing edolor tempore ipsam cum ipsum reiciendis',
    price: 1200,
    category: 'laptop',
  },
  {
    id: 4,
    image: 'src/assets/images/ldlc.jpg',
    title: 'LDLC benolo',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing edolor tempore ipsam cum ipsum reiciendis',
    price: 4500,
    category: 'laptop',
  },
  {
    id: 5,
    image: 'src/assets/images/asus.jpg',
    title: 'Asus gamer',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing edolor tempore ipsam cum ipsum reiciendis',
    price: 3755,
    category: 'laptop',
  },
  {
    id: 6,
    image: 'src/assets/images/roc.jpg',
    title: 'Rog desktop',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing edolor tempore ipsam cum ipsum reiciendis',
    price: 2452,
    category: 'laptop',
  },
  {
    id: 7,
    image: 'src/assets/images/msi.jpg',
    title: 'MSI play',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing edolor tempore ipsam cum ipsum reiciendis',
    price: 1478,
    category: 'laptop',
  },
  {
    id: 8,
    image: 'src/assets/images/thinkpad.jpg',
    title: 'Think pad',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing edolor tempore ipsam cum ipsum reiciendis',
    price: 899,
    category: 'laptop',
  },
] as ProductInterface[];
