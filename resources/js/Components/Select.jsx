import { useEffect, useRef, useState } from "react";
import Arrow2 from "./Icons/Arrow2";

export const PrecentageOptions = [
	{
		value: null,
		text: '-'
	},
	{
		value: 0,
		text: '0%'
	},
	{
		value: 50,
		text: '50%'
	},
	{
		value: 100,
		text: '100%'
	}
];

export default function Select({options, onClick}) {
	const [ showSelect, setShowSelect ] = useState(false);
	const inputRef = useRef(); 

	useEffect(() => {
        const handler = (e) => {
            if (inputRef.current && !inputRef.current.contains(e.target)) {
                setShowSelect(false);
            }
        };

        window.addEventListener("click", handler);

        return () => {
            window.removeEventListener("click", handler);
        };
    }, []);

	const select = (val) => {
		setShowSelect(false);
		onClick(val);
	}

    return <div ref={inputRef} className="relative inline-block px-2 py-2 cursor-pointer align-middle" onClick={() => setShowSelect(!showSelect)}>
			<Arrow2 className="w-5px rotate-90" />
			<div className={`min-w-[120px] right-0 bg-white rounded absolute shadow-select z-10 py-2.5 text-left max-h-52 overflow-y-scroll ${!showSelect ? 'hidden' : ''}`}>
				{options.map((option, index) => 
					<span key={index} className="block cursor-pointer font-roboto py-5px font-light px-5 hover:bg-slate-100" onClick={() => select(option.value)}>
						{option.text}
					</span>
				)}
			</div>
		</div>;
}
