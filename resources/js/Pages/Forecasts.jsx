import Plus from '@/Components/Icons/Plus';
import PrimaryButton from '@/Components/PrimaryButton';
import { PrecentageOptions } from '@/Components/Select';
import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

let newItemIndex = 0;

export default function Forecasts(props) {
	const { forecasts, forecast_icons } = props;
	const forecastState = useState([]);
	const [ forecastsData, setForecastsData ] = forecastState;
	const [ temperatureOptions, setTemperatureOptions ] = useState();
	const [ iconOptions, setIconOptions ] = useState();
	const { setData, post, processing, errors } = useForm({
		update: [],
		delete: [],
		add: []
    });
	
	useEffect(() => {
		Object.entries(errors).map(item => toast.error(item[1]))
	}, [errors])

	useEffect(() => {
		setTemperatureOptions(() => {
			const options = [{
				value: null,
				text: "-"
			}];

			for (let i = -50; i <= 50; i++) {
				options.push({
					value: i,
					text: i
				})
			}

			return options;
		});
		setIconOptions(() => {
			const options = forecast_icons.map(item => {
				return {
					value: item.id,
					text: item.title
				}
			})

			
			return [{
				value: null,
				text: "-"
			}, ...options]
		});
	}, [])

	useEffect(() => {
		if (!forecastsData.length) {
			setForecastsData(forecasts);
		}
	}, [forecasts, forecast_icons]);

	const onAddRow = () => setForecastsData(prev => {
		const newItem = {
			newItemIndex,
			date: null,
			icon_media_id: null,
			rainfall_percentage: null,
			snowfall_percentage: null,
			sunshine_percentage: null,
			temperature: null,
			thunderstorms_percentage: null
		};

		setData(prev => {
			prev.add.push(newItem);
			
			return {...prev};
		});

		newItemIndex++;

		return [newItem, ...prev];
	});

	const onRemoveRow = (index) => {
		setData(prev => {
			if (forecastsData[index].id) {
				prev.update = prev.update.filter(item => item.id !== forecastsData[index].id);
				prev.delete.push(forecastsData[index].id);
			} else if (forecastsData[index].newItemIndex !== undefined) {
				prev.add = prev.add.filter(item => item.newItemIndex !== forecastsData[index].newItemIndex);
			} 

			return {...prev};
		});
		
		setForecastsData(data => data.filter((item, itemIndex) => itemIndex !== index));
	}

	const onEditRow = (rowIndex, fieldName, newValue) => {
		setData(prev => {
			if (forecastsData[rowIndex].id) {
				prev.update = prev.update.filter(item => item.id !== forecastsData[rowIndex].id);
				prev.update = [...prev.update, forecastsData[rowIndex]];
				
			} else if (forecastsData[rowIndex].newItemIndex !== undefined) {
				prev.add = prev.add.filter(item => item.newItemIndex !== forecastsData[rowIndex].newItemIndex);
				prev.add = [...prev.add, forecastsData[rowIndex]];
			}
			
			return {...prev};
		});

		setForecastsData(prev => {
			prev[rowIndex][fieldName] = newValue;

			return [...prev];
		})
	}
	
	const forecastTableHead = [
		{
			name: "date",
			title: "Data",
			sort: "date",
			date: {
				onChange: onEditRow
			}
		},
		{
			name: "temperature",
			title: "Temperatūra, °C",
			textAlignRight: true,
			sort: true,
			select: {
				options: temperatureOptions,
				onChange: onEditRow
			}
		},
		{
			name: "sunshine_percentage",
			title: "Saulėtumas",
			textAlignRight: true,
			sort: true,
			select: {
				options: PrecentageOptions,
				onChange: onEditRow
			}
		},
		{
			name: "cloudiness_percentage",
			title: "Debesuotumas",
			textAlignRight: true,
			sort: true,
			select: {
				options: PrecentageOptions,
				onChange: onEditRow
			}
		},
		{
			name: "rainfall_percentage",
			title: "Lietus",
			textAlignRight: true,
			sort: true,
			select: {
				options: PrecentageOptions,
				onChange: onEditRow
			}
		},
		{
			name: "snowfall_percentage",
			title: "Sniegas",
			textAlignRight: true,
			sort: true,
			select: {
				options: PrecentageOptions,
				onChange: onEditRow
			}
		},
		{
			name: "thunderstorms_percentage",
			title: "Perkūnija",
			textAlignRight: true,
			sort: true,
			select: {
				options: PrecentageOptions,
				onChange: onEditRow
			}
		},
		{
			name: "feedbacks_avg_rating",
			title: 'Vid. dienos įvertinimas'
		},
		{
			name: "icon_media_id",
			title: "Piktograma",
			select: {
				options: iconOptions,
				onChange: onEditRow
			}
		}
	];

	const handleSubmit = () => post(route("forecasts"), {
		onSuccess: () => toast.success("Išsaugota"),
	});

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
			<Head title="Prognozės" />
			<div className="flex">
				<div className="flex cursor-pointer float-left h-5 self-end" onClick={onAddRow}>
					<Plus className="w-5 h5 inline mr-2.5" />
					<span className="font-roboto font-light leading-5 align-middle">
						Pridėti naują tuščią eilutę lentelės viršuje
					</span>
				</div>
				<PrimaryButton className="float-right h-8 ml-auto" onClick={handleSubmit} disabled={processing}>Išsaugoti</PrimaryButton>
			</div>
			{!!forecastsData.length && 
				<div className="py-37px">
					<Table 
						head={forecastTableHead} 
						dataState={forecastState}
						onItemRemove={onRemoveRow}
					/>
				</div>
			}
        </AuthenticatedLayout>
    );
}
