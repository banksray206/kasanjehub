import MarketplaceSection from '@/components/sections/marketplace-section';
import { fetchProducts } from './actions';
import { fetchAdvertisements } from '../advertisements/actions';

export default async function ProductsPage() {
  const products = await fetchProducts();
  const adverts = await fetchAdvertisements();
  return <MarketplaceSection initialProducts={products} initialAdverts={adverts} />;
}