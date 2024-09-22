import SignUpForm from '@/_libs/_nextjs/pages/components/sign-up-form';
import LandingGrid from '@/_components/landing-grid';
import AuthHeader from '@/_components/auth-header';

export default function SignUp() {
  return (
    <div className="flex md:items-center justify-center">
      <LandingGrid />
      <div className="mt-16 sm:pt-0 md:mt-40 px-3 w-full sm:max-w-[400px]">
        <AuthHeader
          title="Create an account"
          description="Create an account to Thon Labs"
          className="mb-14"
        />
        <SignUpForm />
      </div>
    </div>
  );
}
