import LoginForm from '@/component/form/LoginForm';
import LoginTitle from '@/component/ui/text/LoginTitle';

function Login() {
  return (
    <div className="flex items-center justify-center mobile:justify-start mobile:items-start min-h-[calc(100vh-80px)]">
      <div className="w-[454px] h-[413px] flex flex-col justify-center mobile:justify-start items-center mobile:items-start px-8 py-10 mobile:px-0 mobile:py-0 rounded-md bg-white border mobile:border-0 gap-4">
        <LoginTitle />
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
