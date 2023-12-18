import { useCallback, useEffect, useState } from "react";
import Arrow from "./Icons/Arrow";
import Minus from "./Icons/Minus";
import Select from "./Select";


export default function Table({ className = "", head, dataState, onItemRemove, ...props }) {
	const [ data, setData ] = dataState;
	const [ sortBy, setSortBy ] = useState();
	const [ sortOrder, setSortOrder ] = useState("desc");
	
	const sort = (itemName, type) => {
		if (sortBy === itemName) {
			setSortOrder((oldVal) => oldVal === "asc" ? "desc" : "asc");
		} else {
			setSortOrder("asc")
			setSortBy(itemName);
		}
	};

	useEffect(() => {
		setData((prev) => {
			prev.sort((a, b) => {
				a = a[sortBy];
				b = b[sortBy];

				if (head.find(item => item.name === sortBy)?.sort === "date") {
					a = new Date(a).getTime();
					b = new Date(b).getTime();
				}

				if (sortOrder === "asc") {
					if (a === null) {
						return -1;
					}
	
					if (b === null) {
						return 1;
					}

					return a - b;
				} else {
					if (a === null) {
						return 1;
					}
	
					if (b === null) {
						return -1;
					}

					
					return b - a;
				}
			});

			return [...prev];
		});
	}, [sortBy, sortOrder])

	const getEditTool = useCallback((headItem, dataItem, itemIndex) => {
		if (headItem?.date) {
			if (headItem?.date?.onChange) {
				return <input 
					type="date" 
					value={dataItem[headItem.name] || ""} 
					onChange={(event) => headItem.date.onChange(itemIndex, headItem.name, event.target.value)} 
				/>
			} else {
				return dataItem[headItem.name] !== null ? <>{new Date(dataItem[headItem.name]).toLocaleDateString("lt-LT")}</>: '-';
			}
		} else if (headItem?.select) {
			return <>
				{headItem?.select?.options.find(option => option.value === dataItem[headItem.name])?.text}
				<Select 
					options={headItem.select.options}
					name={headItem.name}
					onClick={(val) => headItem.select.onChange(itemIndex, headItem.name, val)}
				/>
			</>
		} else {
			return dataItem[headItem.name] !== null ? <>{dataItem[headItem.name]}{headItem.symbol}</>: '-';
		}
	}, [dataState])

    return <table {...props} className={`w-full ${className}`}>
			<thead>
				<tr className="py-5px">
					{onItemRemove && <th></th>}
					{head.map((item, index) => <th className={`cursor-pointer ${(index !== 0) ? "px-3" : ""}`} key={index}>
						<div 
							className={`flex ${item.textAlignRight ? "justify-end" : "justify-start"}`} 
							onClick={item.sort && (() => sort(item.name, item?.sort))}
						>
							<span className="whitespace-nowrap text-dark-purple font-roboto font-bold">{item.title}</span>
							{item.sort &&
								<Arrow className={`w-2.5 ml-5px ${item.name === sortBy ? "fill-red" : "fill-light-gray"} ${((item.name === sortBy) && (sortOrder === "asc")) ? "-rotate-90" : "rotate-90"}`} />
							}
						</div>
					</th>)}
				</tr>
			</thead>
			<tbody>
				{data.map((item, index) => 
					<tr key={index}>
						{onItemRemove && 
							<td className="w-20px">
								<Minus onClick={() => onItemRemove(index)} className="h-5 w-5 mr-5 w-20px cursor-pointer" />
							</td>
						}
						{head.map((headItem, headItemIndex) => 
							<td key={headItemIndex} className={`font-roboto font-light pt-2.5 pb-3 border-t border-light-purple whitespace-nowrap ${headItemIndex !== 0 ? "px-2.5" : ""} ${headItem.textAlignRight ? "text-right" : ""}`}>
								{getEditTool(headItem, item, index)}
							</td>
						)}
					</tr>
				)}
			</tbody>
		</table>;
}
