import { Loading } from '../../components/ui';

const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-8">Forgot Password</h1>
        <Loading size="lg" text="Coming soon..." />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;