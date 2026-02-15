export const metadata = {
  title: 'Security — 4Tek',
  description: 'Security features and best practices for 4Tek builds',
};

export default function SecurityPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#603813] to-[#b29f94] text-white p-8">
      <div className="max-w-3xl w-full card p-12 rounded-2xl text-center">
        <h1 className="text-3xl font-bold mb-4">Security</h1>
        <p className="text-stone-200 mb-6">This page will contain platform security information, payment and data protection details, and best practices. Content coming soon.</p>
        <ul className="text-left text-stone-200/80 space-y-2">
          <li>• Secure payment integrations (PCI compliance)</li>
          <li>• Encrypted data at rest and in transit</li>
          <li>• Role-based access and audit logging</li>
          <li>• Rate limiting and brute-force protection</li>
        </ul>
      </div>
    </main>
  );
}
