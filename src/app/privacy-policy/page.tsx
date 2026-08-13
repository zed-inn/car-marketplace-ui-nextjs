export default function PrivacyPolicyPage() {
  return (
    <main className="flex flex-col items-center min-h-[70vh] px-4 py-16 md:p-24 bg-muted/10">
      <div className="w-full max-w-3xl space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-primary">Privacy Notice</h1>
          <p className="text-sm text-muted-foreground mt-2">Last updated {new Date().toLocaleDateString()}</p>
        </div>
        
        <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-muted-foreground space-y-6">
          <p>
            This privacy notice for MyRide ("<strong>Company</strong>," "<strong>we</strong>," "<strong>us</strong>," or "<strong>our</strong>"), describes how and why we might collect, store, use, and/or share ("<strong>process</strong>") your information when you use our services ("<strong>Services</strong>"), such as when you:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Visit our website at https://myride-dummy.com, or any website of ours that links to this privacy notice</li>
            <li>Engage with us in other related ways, including any sales, marketing, or events</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground mt-8">1. WHAT INFORMATION DO WE COLLECT?</h2>
          <p>
            <strong>Personal information you disclose to us:</strong> We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services.
          </p>
          <p>
            <strong>Information automatically collected:</strong> We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. 
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">2. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h2>
          <p>
            We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specifically, we use local cookies and basic analytics to improve route suggestions based on previous searches. We explicitly <strong>do not</strong> use third-party advertising trackers or sell your personal data.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">3. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
          <p>
            We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">4. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>
          <p>
            If you have questions or comments about this notice, you may email us at contact@myride-dummy.com or by post to:
          </p>
          <p>
            MyRide<br/>
            Privacy Officer<br/>
            123 Startup Blvd<br/>
            Tech City, TC 10001
          </p>
        </div>
      </div>
    </main>
  );
}
