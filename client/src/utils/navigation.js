import { paths } from './paths';

export default {
  categories: [
    {
      id: 'featured',
      name: 'Featured',
      featured: [],
    },
  ],
  pages: [
    { name: 'Store', to: paths.store, validation: false },
    { name: 'Add Product', to: paths.addProduct, validation: true },
  ],
};
