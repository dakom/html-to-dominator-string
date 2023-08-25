export const textNodeDefault = 
`<p id="container">
Or
<a id="inner">
  start your 14-day free trial
</a>
</p>`;
export const htmlDefault = 
`<header class="fancy">
  <div class="flex mb-4">
    <div class="cell">
        One of three columns
    </div>
    <div class="cell bg-indigo-100">
        <div class="green text-4xl">Two of three columns</div>
    </div>
    <div class="cell">
        Profile
    </div>
  </div>
</header>`;

export const svgDefault = 
`<svg class="h-5 h-5" fill="currentColor" viewBox="0 0 20 20">
	<path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"/>
</svg>`;

export const fullDefault = 
`<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
<div class="max-w-md w-full">
  <div>
    <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg" alt="Workflow" />
    <h2 class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
      Sign in to your account
    </h2>
    <p class="mt-2 text-center text-sm leading-5 text-gray-600">
      Or
      <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
        start your 14-day free trial
      </a>
    </p>
  </div>
  <form class="mt-8" action="#" method="POST">
    <input type="hidden" name="remember" value="true" />
    <div class="rounded-md shadow-sm">
      <div>
        <input aria-label="Email address" name="email" type="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Email address" />
      </div>
      <div class="-mt-px">
        <input aria-label="Password" name="password" type="password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Password" />
      </div>
    </div>

    <div class="mt-6 flex items-center justify-between">
      <div class="flex items-center">
        <input id="remember_me" type="checkbox" class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" checked />
        <label for="remember_me" class="ml-2 block text-sm leading-5 text-gray-900">
          Remember me
        </label>
      </div>

      <div class="text-sm leading-5">
        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
          Forgot your password?
        </a>
      </div>
    </div>

    <div class="mt-6">
      <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
          <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
          </svg>
        </span>
        Sign in
      </button>
    </div>
  </form>
</div>
</div>`;