export default function Footer() {
  return (
    <div className="text-center">
      <h1 className="mb-2 text-xl font-extrabold text-gray-900 dark:text-white md:text-4xl">
        <p className="mb-1 text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Need fast lab testing?
        </p>
        <a
          href="https://plantalysis.com"
          className="mt-0 font-extrabold text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400"
        >
          Visit plantalysis.com
        </a>
      </h1>
      <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
        <p className="my-1">(929) 276-2706</p>
        <p className="my-1">team@altumlabs.co</p>
      </div>
    </div>
  )
}
