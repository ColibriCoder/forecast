import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
		// <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-dark-purple"></div>
        <div className="min-h-screen bg-dark-purple">
			<div className="absolute left-5 right-5 top-5 bottom-5 bg-light-gray rounded-10px flex flex-col items-center">
		
			
				<div>
					<Link href="/">

					{/* <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" /> */}
						<ApplicationLogo className="h-70px fill-current text-dark-purple mt-150px" />
					</Link>
				</div>

				{/* <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg"> */}
				<div className="mt-100px w-426px">

					{/* <p class="underline hover:underline-offset-4 text-dark-purple">aaa</p> */}
					{children}
				</div>
			</div>
        </div>
    );
}
