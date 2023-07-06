'use client';

import { useId } from 'react';
import dynamic from 'next/dynamic';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import { signupSchema, TSignup } from '~/schemas/auth';
import { useSignup } from '~/hooks/api/useSignup';

import LoadingIndicator from '../common/loading-indicator';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const DevTool: React.ElementType = dynamic(
  () => import('@hookform/devtools').then((module) => module.DevTool),
  { ssr: false }
);

export default function SignupForm() {
  const id = useId();

  const form = useForm<TSignup>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });
  const { register, handleSubmit, formState, control } = form;
  const { errors, isDirty, isValid } = formState;

  const { mutate, isLoading } = useSignup();

  const onSubmit: SubmitHandler<TSignup> = (data) => {
    mutate(data);
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-3 md:gap-6">
        <div className="grid grid-cols-1 items-start gap-3 md:grid-cols-2 md:gap-6">
          <div className="space-y-1">
            <Label className="sr-only" htmlFor={id + '-firstName'}>
              First Name
            </Label>
            <Input
              type="text"
              id={id + '-firstName'}
              {...register('firstName')}
              placeholder="enter first name"
              autoComplete="name"
              autoCorrect="off"
              autoFocus
              disabled={isLoading}
            />
            {errors.firstName && (
              <small className="text-error-form-foreground">
                {errors.firstName.message}
              </small>
            )}
          </div>
          <div className="space-y-1">
            <Label className="sr-only" htmlFor={id + '-lastName'}>
              Last Name
            </Label>
            <Input
              type="text"
              id={id + '-lastName'}
              {...register('lastName')}
              placeholder="enter last name"
              autoComplete="name"
              autoCorrect="off"
              disabled={isLoading}
            />
            {errors.lastName && (
              <small className="text-error-form-foreground">
                {errors.lastName.message}
              </small>
            )}
          </div>
        </div>
        <div className="space-y-1">
          <Label className="sr-only" htmlFor={id + '-email'}>
            Email
          </Label>
          <Input
            type="email"
            id={id + '-email'}
            {...register('email')}
            placeholder="name@example.com"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading}
          />
          {errors.email && (
            <small className="text-error-form-foreground">
              {errors.email.message}
            </small>
          )}
        </div>
        <div className="space-y-1">
          <Label className="sr-only" htmlFor={id + '-password'}>
            Password
          </Label>
          <Input
            type="password"
            id={id + '-password'}
            {...register('password')}
            placeholder="enter password"
            autoComplete="new-password"
            autoCorrect="off"
            disabled={isLoading}
          />
          {errors.password && (
            <small className="text-error-form-foreground">
              {errors.password.message}
            </small>
          )}
        </div>
        <div className="space-y-1">
          <Label className="sr-only" htmlFor={id + '-confirm-password'}>
            Confirm Password
          </Label>
          <Input
            type="password"
            id={id + '-confirm-password'}
            {...register('passwordConfirm')}
            placeholder="confirm password"
            autoComplete="new-password"
            autoCorrect="off"
            disabled={isLoading}
          />
          {errors.passwordConfirm && (
            <small className="text-error-form-foreground">
              {errors.passwordConfirm.message}
            </small>
          )}
        </div>
        <Button type="submit" disabled={isLoading || !isValid || !isDirty}>
          {isLoading ? <LoadingIndicator msg="Signing up..." /> : 'Sign up'}
        </Button>
      </div>
      <DevTool control={control} />
    </form>
  );
}
