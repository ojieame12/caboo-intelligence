import { SignIn } from '@clerk/clerk-react'

const SignInPage = () => {
  return (
    <div className="min-h-screen bg-[#FCF6EF] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-lg rounded-3xl bg-white border border-neutral-200 shadow-2xl px-6 py-10 flex justify-center">
        <SignIn routing="path" path="/signin" signUpUrl="/signin" />
      </div>
    </div>
  )
}

export default SignInPage
