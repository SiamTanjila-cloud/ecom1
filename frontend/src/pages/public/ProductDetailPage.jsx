import { Loading } from '../../components/ui';

const ProductDetailPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Product Detail</h1>
      <div className="flex items-center justify-center h-64">
        <Loading size="lg" text="Coming soon..." />
      </div>
    </div>
  );
};

export default ProductDetailPage;