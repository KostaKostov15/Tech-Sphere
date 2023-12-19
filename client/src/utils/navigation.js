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
    { name: 'Home', to: paths.home, validation: false },
    { name: 'Store', to: paths.store, validation: false },
    { name: 'Add Product', to: paths.addProduct, validation: true },
  ],
};
