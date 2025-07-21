import { useNavigate } from 'react-router-dom';
import { LoginForm } from '@/components/auth/LoginForm';

export default function Login() {
  const navigate = useNavigate();
  
  return (
    <div className="relative">
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-white/80 hover:text-white transition-colors"
        >
          <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>
      </div>
      <LoginForm />
    </div>
  );
}