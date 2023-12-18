import PrimaryButton from '@/Components/PrimaryButton';
import Rating from '@/Components/Rating';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

export default function Dashboard(props) {
	const { forecastData } = props;
	const [ forecast, setForecast ] = useState(forecastData);
	const [ date, setDate ] = useState(new Date().toLocaleDateString("lt-LT"));
	const defaultValues = {
		rating: null,
		feedback: "",
		date
	}
	const { data, setData, post, processing, errors, reset } = useForm(defaultValues);
	const ratingRef = useRef();

	useEffect(() => {
		Object.entries(errors).map(item => toast.error(item[1]))
	}, [errors]);

	const changeDate = (e) => {
		const newDate = e.target.value;
		setDate(newDate);

		fetch("/" + newDate)
			.then(data => data.json())
			.then(data => {
				setForecast(data);
				setData("date", newDate);
			})
			.catch(e => toast.error(String(e)));
	}

	const getNumberWithSymbol = (number, symbol) => {
		if (!!number || (number === 0)) {
			return number + symbol;
		}

		return "-";
	}

	const handleSubmit = () => post(route("feedback"), {
		onSuccess: () => {
			toast.success("Įvertinta");
			reset();
			ratingRef.current.handleReset();
		}
	});

	const canSendFeedback = processing || (!data.feedback || data.feedback === "") && !data.rating;

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
			<Head title="Prognozė" />
			<div className="pl-50px py-20 max-w-750px">
				<div className="flex">
					<div className="w-496px float-left">
						{forecast?.media 
							?
								<img 
									className="max-w-xs" 
									src={forecast.media.path + "/" + forecast.media.name + "." + forecast.media.extention} 
								/>
							:
								"-"
						}
					</div>
					<div className="float-right min-w-300px">
						<input type="date" value={date} onChange={changeDate}/>
						<span className="block text-100px text-right text-dark-purple font-bold font-poppins py-20px">
							{getNumberWithSymbol(forecast?.temperature, "°C")}
						</span>
						<div className="pt-10px">
							<div>
								<span className="font-roboto font-light">Saulėtumas</span>
								<span className="float-right font-roboto font-medium">
									{getNumberWithSymbol(forecast?.sunshine_percentage, "%")}
								</span>
							</div>
							<hr className="my-2.5 border-light-purple" />
							<div>
								<span className="font-roboto font-light">Debesuotumas</span>
								<span className="float-right font-roboto font-medium">
									{getNumberWithSymbol(forecast?.cloudiness_percentage, "%")}
								</span>
							</div>
							<hr className="my-2.5 border-light-purple" />
							<div>
								<span className="font-roboto font-light">Lietus</span>
								<span className="float-right font-roboto font-medium">
									{getNumberWithSymbol(forecast?.rainfall_percentage, "%")}
								</span>
							</div>
							<hr className="my-2.5 border-light-purple" />
							<div>
								<span className="font-roboto font-light">Sniegas</span>
								<span className="float-right font-roboto font-medium">
									{getNumberWithSymbol(forecast?.snowfall_percentage, "%")}
								</span>
							</div>
							<hr className="my-2.5 border-light-purple" />
							<div>
								<span className="font-roboto font-light">Perkūnija</span>
								<span className="float-right font-roboto font-medium">
									{getNumberWithSymbol(forecast?.thunderstorms_percentage, "%")}
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className="pt-65px">
					<span className="block py-5px text-[25px] text-dark-purple font-bold font-poppins">
						Įvertinkite šios dienos orus!
					</span>
					<p className="py-5px font-roboto font-light">
						Kūrybinė Specto hidrometeorologijos tarnyba daug ir sunkiai dirbo, 
						kol sugalvojo šį testą programuotojams nuo sinoptikų atskirti ir 
						kompetencijoms patikrinti, todėl prašome įvertinti šios dienos orų 
						prognozę ir palikti atsiliepimą, kuris bus matomas tik administratoriui.
					</p>
				</div>
				<div className="py-10px pt-20px">
					<Rating className="py-10px" onEvaluation={(rating) => setData("rating", rating)} ref={ratingRef} />
					<textarea 
						value={data.feedback} 
						onChange={(e) => setData("feedback", e.target.value)} 
						className="w-full my-10px rounded-10px resize-none font-roboto p-10px h-100px" 
						placeholder="Man patiko orai, bet užduotis galėtų būti lengvesnė." 
					/>
					<PrimaryButton className="mt-5px uppercase" onClick={handleSubmit} disabled={canSendFeedback}>
						Siųsti
					</PrimaryButton>
				</div>
			</div>
        </AuthenticatedLayout>
    );
}
