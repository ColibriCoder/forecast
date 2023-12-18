import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Feedback(props) {
	const { feedbacks } = props;
	const feedbacksState = useState([]);
	const [ feedbacksData, setFeedbacksData ] = feedbacksState;
	const  { delete: destroy, errors } = useForm();

	useEffect(() => {
		if (!feedbacksData.length) {
			setFeedbacksData(feedbacks)
		}
	}, [feedbacks]);

	useEffect(() => {
		Object.entries(errors).map(item => toast.error(item[1]))
	}, [errors]);

	const onRemoveRow = (index) => {
		const removeItem = feedbacksData.find((item, itemIndex) => itemIndex === index);

		destroy("/feedback/" + removeItem.id, {
			onSuccess: () => {
				toast.success("Ištrinta");
				setFeedbacksData(data => data.filter((item, itemIndex) => itemIndex !== index));
			}
		});
	}

	const feedbacksTableHead = [
		{
			name: "date",
			title: "Data",
			sort: "date",
			date: true
		},
		{	
			name: "rating",
			title: "Įvertinimas",
			sort: true
		},
		{
			name: "feedback",
			title: "Atsiliepimas"
		},
	];

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
			<Head title="Atsiliepimai" />
			<div className="py-10px">
				<Table
					head={feedbacksTableHead} 
					dataState={feedbacksState}
					onItemRemove={onRemoveRow}
				/>
			</div>
        </AuthenticatedLayout>
    );
}
