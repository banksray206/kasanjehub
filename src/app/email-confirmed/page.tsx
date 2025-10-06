export default function EmailConfirmedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4 text-green-600">Email Confirmed!</h1>
      <p className="text-lg mb-6">
        Your email has been successfully verified. You can now log in and start using your account.
      </p>
      <a
        href="/login"
        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Go to Login
      </a>
    </div>
  );
}