import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='h-screen w-screen flex item-center justify-center'>
      <SignIn />
    </div>
  )
}