import Link from 'next/link'

function Header() {
  return (
    <header className="mx-auto flex max-w-7xl justify-between p-5">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img
            src="https://gcdnb.pbrd.co/images/ZFf9K2y6cNon.png?o=1"
            alt=""
            className="h-20 w-44 cursor-pointer object-contain"
          />
        </Link>
        <div className="hidden items-center space-x-5 md:inline-flex">
          <h3>About</h3>
          <h3>Contact</h3>
          <h3 className="rounded-full bg-green-600 px-4 py-4 text-white">
            Follow
          </h3>
        </div>
      </div>
      <div className="flex items-center space-x-5">
        <h3 className="text-green-600"> SignIn</h3>
        <h3 className="rounded-full border border-green-600 px-4 py-1">
          Get Started
        </h3>
      </div>
    </header>
  )
}

export default Header
