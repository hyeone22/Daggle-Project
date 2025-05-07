import { useLogin } from '@/action/post-login';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';

interface LoginFormData {
  username: string;
  password: string;
}

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<LoginFormData>();

  const mutation = useLogin();

  const onSubmit = (data: LoginFormData) => {
    mutation.mutate({
      loginId: data.username,
      password: data.password,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="flex flex-col gap-3">
        <Input
          placeholder="아이디를 입력해주세요."
          {...register('username', { required: '아이디를 입력해주세요.' })}
          className={clsx(
            'border',
            errors.username ? 'border-red-500' : 'border-gray-300'
          )}
        />
        {errors.username?.message && isSubmitted && (
          <p className="text-sm text-[#D11111]">{errors.username.message}</p>
        )}
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          {...register('password', { required: '비밀번호를 입력해주세요.' })}
          className={clsx(
            'border',
            errors.username ? 'border-red-500' : 'border-gray-300'
          )}
        />
        {errors.password?.message && isSubmitted && (
          <p className="text-sm text-[#D11111]">{errors.password.message}</p>
        )}
        <Button className="w-full last:mt-3" type="submit" text="로그인" />
      </div>
    </form>
  );
}

export default LoginForm;
