import type { Metadata } from 'next';
import Link from 'next/link';

import {
  openGraphImages,
  openGraphLocale,
  openGraphName,
  openGraphType,
  twitterCard,
  twitterCreator,
  twitterImages,
} from '~/lib/shared-metadata';
import SignupForm from '~/components/auth/signup-form';
import AnimatedCharacters from '~/components/common/animated-characters';

const title = 'Create An Account';
const description = 'Create an account to start managing your job applications';
const url = '/signup';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url,
    ...openGraphName,
    ...openGraphImages,
    ...openGraphLocale,
    ...openGraphType,
  },
  twitter: {
    title,
    description,
    ...twitterCard,
    ...twitterCreator,
    ...twitterImages,
  },
  alternates: {
    canonical: url,
  },
};

export default function SignupPage() {
  return (
    <div className="mx-auto w-[min(100%,400px)] space-y-3 rounded-lg border border-border bg-background/70 p-3 md:space-y-6 md:p-6">
      <h3 className="scroll-m-20 text-center text-2xl font-semibold tracking-tight">
        <AnimatedCharacters text="Signup" />
      </h3>
      <SignupForm />
      <p className="text-center text-sm text-muted-foreground">
        <Link
          href="/login"
          className="underline underline-offset-4 hover:text-foreground"
        >
          Already a member? Log In
        </Link>
      </p>
    </div>
  );
}
