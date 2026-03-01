import { Loading } from '../../components/ui';

export const VendorDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Vendor Dashboard</h1>
      <div className="flex items-center justify-center h-64">
        <Loading size="lg" text="Coming soon..." />
      </div>
    </div>
  );
};

export const VendorProducts = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Vendor Products</h1>
      <div className="flex items-center justify-center h-64">
        <Loading size="lg" text="Coming soon..." />
      </div>
    </div>
  );
};

export const VendorOrders = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Vendor Orders</h1>
      <div className="flex items-center justify-center h-64">
        <Loading size="lg" text="Coming soon..." />
      </div>
    </div>
  );
};