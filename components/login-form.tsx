'use client';

import { useId } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { atom, useAtom, useSetAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { Loader } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { CustomAPIError, loginUser } from '@/lib/api';
import { parseToken } from '@/lib/jwt';
import { loginSchema, type Login } from '@/lib/validations/auth';
import useAuth from '@/hooks/useAuth';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { toast } from './ui/use-toast';

export const authTokenAtom = atomWithStorage<string | null>(
  'bexjobs-token',
  null
);
export const sessionTimeoutAtom = atomWithStorage<number | null>(
  'bexjobs-session-timeout',
  null
);
export const hasPersistLoginAtom = atom(true);

export default function LoginForm() {
  const [hasPersistLogin, setHasPersistLogin] = useAtom(hasPersistLoginAtom);
  const setAuthToken = useSetAtom(authTokenAtom);
  const setSessionTimeout = useSetAtom(sessionTimeoutAtom);

  const id = useId();
  const router = useRouter();

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<Login>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const authInfo = parseToken(data.token);
      const currentTime = Date.now();

      const SESSION_TIMEOUT_NO_PERSIST_LOGIN_MS = currentTime + 30 * 60 * 1000; // add 30mins to current date
      const SESSION_TIMEOUT_PERSIST_LOGIN_MS =
        authInfo.tokenExpirationDate * 1000; // convert date to milliseconds

      setAuthToken(data.token);
      setSessionTimeout(
        hasPersistLogin
          ? SESSION_TIMEOUT_PERSIST_LOGIN_MS
          : SESSION_TIMEOUT_NO_PERSIST_LOGIN_MS
      );
      login({
        userId: authInfo.userId,
        username: authInfo.username,
        email: authInfo.email,
      });
      toast({
        description: data.msg,
      });
      router.push('/dashboard');
    },
    onError: (error: CustomAPIError) => {
      toast({
        description: error.message,
      });
    },
  });

  const onSubmit: SubmitHandler<Login> = (data) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-3 md:space-y-5">
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor={id + '-email'}>
            Email
          </Label>
          <Input
            type="email"
            id={id + '-email'}
            placeholder="name@example.com"
            autoComplete="email"
            autoCorrect="off"
            autoFocus
            disabled={isLoading}
            {...register('email')}
          />
          {errors?.email && (
            <p className="px-1 text-xs text-error-form-foreground">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor={id + '-password'}>
            Password
          </Label>
          <Input
            type="password"
            id={id + '-password'}
            placeholder="enter password"
            autoComplete="current-password"
            autoCorrect="off"
            disabled={isLoading}
            {...register('password')}
          />
          {errors?.password && (
            <p className="px-1 text-xs text-error-form-foreground">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <Switch
              id={id + '-persist-login'}
              checked={hasPersistLogin}
              onCheckedChange={() => setHasPersistLogin(!hasPersistLogin)}
              disabled={isLoading}
            />
            <Label
              htmlFor={id + '-persist-login'}
              className="cursor-pointer text-xs"
            >
              Stay logged in for 30 days
            </Label>
          </div>
          {!hasPersistLogin && (
            <p className="rounded-md border border-warning-border bg-warning px-3 py-2 text-xs text-warning-foreground">
              You will be logged out after 30 minutes of inactivity.
            </p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || !isValid || !isDirty}
        >
          {isLoading ? (
            <div role="status">
              <span className="sr-only">Logging in...</span>
              <Loader
                aria-hidden="true"
                className="mr-2 h-5 w-5 animate-spin"
              />
            </div>
          ) : (
            'Log in'
          )}
        </Button>
      </div>
      {/* <pre className="mt-2 text-sm">{JSON.stringify(watch(), null, 2)}</pre> */}
    </form>
  );
}
