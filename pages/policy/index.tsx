const Policy = () => {
	return (
		<div className='p-4 bg-white rounded text-slate-900 ml-4 mr-4 pt-4 pb-4'>
			<h2 className='text-lg text-sky-600 font-bold'>
				Data Privacy Policy
			</h2>
			<p>
				This privacy policy describes how Eitri LLC collects, uses, and
				protects your personal data when using our website
				grepandit.com.
			</p>
			<h3 className='text-base text-sky-500 font-semibold mt-2'>
				Personal Data We Collect
			</h3>
			<p>
				We collect the following personal data when you use our website:
			</p>
			<ul className='list-disc list-inside'>
				<li>Email address</li>
				<li>User Performance Data</li>
				<li>Time taken to complete problems</li>
				<li>Statistics related to platform usage</li>
			</ul>

			<h3 className='text-base text-sky-500 font-semibold mt-2'>
				How We Use Your Personal Data
			</h3>
			<p>
				We use your personal data to improve your experience, provide
				personalized analytics, and recommend problems based on your
				weaknesses.
			</p>

			<h3 className='text-base text-sky-500 font-semibold mt-2'>
				How We Store Your Personal Data
			</h3>
			<p>
				We store your personal data on Amazon Web Services (AWS) Cognito
				using JWT (JSON Web Tokens) for authentication. After successful
				authentication your personalized statistics get stored on a RDS
				database on a VPC on AWS
			</p>

			<h3 className='text-base text-sky-500 font-semibold mt-2'>
				Data Sharing
			</h3>
			<p>
				We do not share your personal data with any commercial parties,
				except in cases where it may be shared with educational
				institutes for research purposes.
			</p>

			<h3 className='text-base text-sky-500 font-semibold mt-2'>
				Cookies
			</h3>
			<p>
				Our website uses cookies to maintain session state. The cookies
				are used to store JWT tokens for authentication purposes. They
				are set by Amazon Cognito when you sign in.
			</p>

			<h3 className='text-base text-sky-500 font-semibold mt-2'>
				Your Rights
			</h3>
			<p>
				All gathered data will be used to enrich your experience. If you
				have any questions or concerns about how we handle your personal
				data, please contact us at support@grepandit.com. Upon request,
				we will remove all personalized data from our service. You may
				also request your personal data at any tim at
				support@grepandit.com.
			</p>

			<h3 className='text-base text-sky-500 font-semibold mt-2'>
				Changes To This Policy
			</h3>
			<p>
				We may update our privacy policy from time to time. We will
				notify you of any changes by sending an email to the address you
				provided us.
			</p>
		</div>
	);
};

export default Policy;
