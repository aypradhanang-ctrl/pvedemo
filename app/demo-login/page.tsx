type DemoLoginPageProps = {
  searchParams: Promise<{
    error?: string;
    next?: string;
  }>;
};

function getMessage(error?: string) {
  if (error === "invalid") {
    return "Incorrect password. Please try again.";
  }

  if (error === "config") {
    return "Demo access is enabled, but the password configuration is incomplete.";
  }

  return null;
}

export default async function DemoLoginPage({
  searchParams,
}: DemoLoginPageProps) {
  const params = await searchParams;
  const nextPath = params.next?.startsWith("/") ? params.next : "/";
  const message = getMessage(params.error);

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-5 py-12 text-white">
      <div className="w-full max-w-md border border-white/10 bg-black/40 p-8 shadow-2xl">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-red-500">
          Client Demo Access
        </p>
        <h1 className="mt-4 text-4xl font-black uppercase leading-none tracking-[-0.04em]">
          Enter password
        </h1>
        <p className="mt-4 text-sm leading-7 text-white/65">
          This temporary demo is password-protected for client review.
        </p>

        {message ? (
          <p className="mt-5 border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {message}
          </p>
        ) : null}

        <form action="/demo-auth" method="post" className="mt-8 space-y-5">
          <input type="hidden" name="next" value={nextPath} />

          <label className="block text-sm text-white/70">
            Password
            <input
              name="password"
              type="password"
              required
              className="mt-2 h-12 w-full border border-white/10 bg-white/5 px-4 text-white outline-none transition focus:border-red-500"
              placeholder="Enter demo password"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-red-600 px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-red-500"
          >
            Access Demo
          </button>
        </form>
      </div>
    </main>
  );
}
