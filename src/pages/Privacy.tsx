export function Privacy() {
  return (
    <div className="section-sm py-16 lg:py-20">
      <h1 className="heading-2">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted">Last updated: September 2026</p>

      <div className="mt-8 space-y-8 text-navy-700">
        <section>
          <h2 className="text-lg font-bold text-navy-900">1. Who we are</h2>
          <p className="mt-2 text-sm leading-relaxed">
            DevProject Hub is operated by Brian Simiyu ("we", "us", "our"). For the purposes of
            Kenya's Data Protection Act, 2019, Brian Simiyu is the data controller for personal
            data collected through this website. You can reach us at{' '}
            <a href="mailto:bsimiyu698@gmail.com" className="link">bsimiyu698@gmail.com</a>{' '}
            for any question about your data.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-navy-900">2. What we collect</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
            <li>Information you submit through the "Request Your Project" form: full name, email, phone number, institution, project details, budget, deadline and expected duration.</li>
            <li>Account information if you sign up: email, full name, and (if you use Google or GitHub sign-in) the basic profile information those providers share with us.</li>
            <li>Messages you send through your project dashboard.</li>
            <li>Basic technical data your browser sends automatically (such as pages visited), to the extent our hosting provider logs it.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-navy-900">3. Why we collect it</h2>
          <p className="mt-2 text-sm leading-relaxed">
            We use your information to: respond to project requests and prepare quotations,
            deliver and support the software projects you commission, communicate with you about
            your project, and maintain your account. We process this data on the basis of your
            consent (submitting the form or creating an account) and, once you engage us, to
            perform our contract with you.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-navy-900">4. Who else sees it</h2>
          <p className="mt-2 text-sm leading-relaxed">
            We use Supabase (a hosted Postgres and authentication provider) to store and secure
            this data, and Google/GitHub solely to let you sign in with those accounts if you
            choose to. Data may be processed on servers outside Kenya as part of these providers'
            infrastructure. We don't sell your data or share it with advertisers. We don't share
            your information with any other third party except where required by law.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-navy-900">5. How long we keep it</h2>
          <p className="mt-2 text-sm leading-relaxed">
            We retain project and account data for as long as your account is active or as needed
            to provide our services, and afterward only as long as necessary to meet legal,
            accounting, or dispute-resolution obligations.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-navy-900">6. Your rights</h2>
          <p className="mt-2 text-sm leading-relaxed">
            Under the Data Protection Act, 2019, you have the right to access the personal data we
            hold about you, request correction of inaccurate data, request deletion of your data,
            object to certain processing, and lodge a complaint with the{' '}
            <a
              href="https://www.odpc.go.ke"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              Office of the Data Protection Commissioner (ODPC)
            </a>{' '}
            if you believe your rights have been violated. To exercise any of these rights, email
            us at <a href="mailto:bsimiyu698@gmail.com" className="link">bsimiyu698@gmail.com</a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-navy-900">7. Security</h2>
          <p className="mt-2 text-sm leading-relaxed">
            Your data is protected by database-level access rules (Row Level Security) so that
            only you and authorized administrators can view your project information, and
            connections to our services are encrypted in transit. No system is perfectly secure,
            but we take reasonable steps to protect your information.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-navy-900">8. Children's privacy</h2>
          <p className="mt-2 text-sm leading-relaxed">
            This service is intended for university and college students and is not directed at
            children under 18. We don't knowingly collect personal data from children.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-navy-900">9. Changes to this policy</h2>
          <p className="mt-2 text-sm leading-relaxed">
            We may update this policy from time to time. Material changes will be reflected by
            updating the "Last updated" date at the top of this page.
          </p>
        </section>
      </div>
    </div>
  );
}
