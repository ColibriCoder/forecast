import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import { Link } from '@inertiajs/react';

export default function Authenticated({ auth, children }) {
    return (
        <div className="min-h-screen bg-white">
			<div className="bg-dark-purple">
				<div className="mx-auto">
					<div className="flex justify-between h-70px">
						<div className="shrink-0 flex items-center">
							<Link href="/">
								<ApplicationLogo className="block pl-50px h-30px w-auto fill-current text-white" />
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className="absolute bottom-0 left-0 right-0 top-70px flex">
				<div className="min-w-336px w-336px h-full p-5">
					<nav className="h-full bg-gray rounded-10px p-30px">
						<span className="block text-3xl text-dark-purple font-poppins font-bold">Sveiki</span>
						<span className="block text-base font-roboto font-light pt-5">Jūs esate prisijungęs kaip:</span>
						<span className="block text-base font-roboto">{auth?.user?.is_admin ? 'Administratorius' : 'Paprastas vartotojas'}</span>
						<Link
							className="uppercase rounded-2xl bg-red px-34px py-1.5 font-bold text-white my-25px" 
							method="post" 
							href={route('logout')} 
							as="button"
						>
							Atsijungti
						</Link>
						{ !!auth?.user?.is_admin && 
							<>
								<hr className="mb-5px mt-15px border-light-purple"/>
								<NavLink className="py-5px" href={route("forecasts")} active={route().current("forecasts")}>
									Prognozės
								</NavLink>
					
								<NavLink className="py-5px" href={route("feedback")} active={route().current("feedback")}>
									Atsiliepimai
								</NavLink>
							</>
						}
					</nav>
				</div>
				<div className="px-31px pt-10 h-full flex-1  overflow-x-scroll max-w-1100px">
					{children}
				</div>
			</div>
        </div>
    );
}
