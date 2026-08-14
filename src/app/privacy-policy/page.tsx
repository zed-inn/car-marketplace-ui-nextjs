export default function PrivacyPolicyPage() {
  return (
    <main className="flex flex-col items-center min-h-screen py-16 px-4 md:px-8">
      <div className="w-full max-w-3xl space-y-10">
        <header className="space-y-3 pb-8 border-b">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </header>
        
        <div className="bg-white border rounded-xl p-6 md:p-8 space-y-8 text-[15px] leading-relaxed text-muted-foreground">
          <p className="text-base text-foreground font-medium">
            This privacy notice for Find Ride (&ldquo;<strong>Company</strong>,&rdquo; &ldquo;<strong>we</strong>,&rdquo; &ldquo;<strong>us</strong>,&rdquo; or &ldquo;<strong>our</strong>&rdquo;), describes how and why we might collect, store, use, and/or share (&ldquo;<strong>process</strong>&rdquo;) your information when you use our services.
          </p>
          
          <ul className="list-disc pl-6 space-y-2">
            <li>Visit our website, or any website of ours that links to this privacy notice</li>
            <li>Engage with us in other related ways, including any sales, marketing, or events</li>
          </ul>

          <div className="space-y-3 pt-4">
            <h2 className="text-lg font-bold text-foreground">1. What Information Do We Collect?</h2>
            <p><strong className="text-foreground">Personal information you disclose to us:</strong> We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services.</p>
            <p><strong className="text-foreground">Information automatically collected:</strong> We automatically collect certain information when you visit, use, or navigate the Services. This may include device and usage information such as your IP address, browser characteristics, operating system, and referring URLs.</p>
          </div>

          <div className="space-y-3 pt-4">
            <h2 className="text-lg font-bold text-foreground">2. Cookies and Tracking</h2>
            <p>We use local cookies and basic analytics to improve route suggestions. We <strong className="text-foreground">do not</strong> use third-party advertising trackers or sell your personal data.</p>
          </div>

          <div className="space-y-3 pt-4">
            <h2 className="text-lg font-bold text-foreground">3. Data Retention</h2>
            <p>We keep your personal information only as long as necessary for the purposes set out in this notice, unless a longer retention period is required by law.</p>
          </div>

          <div className="space-y-3 pt-4">
            <h2 className="text-lg font-bold text-foreground">4. Contact Us</h2>
            <p>If you have questions about this notice, email us at contact@findride.in or write to:</p>
            <div className="bg-muted/50 p-4 rounded-lg text-sm font-mono mt-2 inline-block">
              Find Ride<br/>
              Privacy Officer<br/>
              123 Startup Blvd<br/>
              Tech City, TC 10001
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
