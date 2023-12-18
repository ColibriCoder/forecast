import { useImperativeHandle, useState, forwardRef } from "react";
import StarInactive from "./Icons/StarInactive";
import StarActive from "./Icons/StarActive";

const Rating = forwardRef(function Rating({ className = "", onEvaluation, resetFunction = null, ...props }, ref) {
	const [ stars, setStars ] = useState([]);
	const [ rating, setRating ] = useState(null);

	useImperativeHandle(ref, () => ({
		handleReset() {
			reset();
		}
	}));

	const reset = () => {
		setRating(null);
		setStars(prev => {
			for (let i = 0; i < 5; i++) {
				prev[i] = false;
			}

			return prev;
		});
	}

	useState(() => reset(), []);

	const handleStarHover = (index) => setStars(prev => {
			for (let i = 0; i < 5; i++) {
				if (index >= i) {
					prev[i] = true;
				} else {
					prev[i] = false;
				}
			}

			return [...prev];
		});

	const handleStarLeave = () => setStars(prev => {
			for (let i = 0; i < 5; i++) {
				if (rating >= i && rating !== null) {
					prev[i] = true;
				} else {
					prev[i] = false;
				}
			}

			return [...prev];
		});

	const handleEvaluation = (index) => {
		setRating(index);
		onEvaluation(index + 1);
	}

    return (
		<div {...props} className={`flex ${className}`}>
			{stars?.map((item, index) => item 
				? <StarActive key={index} className="w-12 cursor-pointer mr-15px" 
					onClick={() => handleEvaluation(index)} 
					onMouseEnter={() => handleStarHover(index)} 
					onMouseLeave={handleStarLeave} /> 
				: <StarInactive key={index} className="w-12 mr-15px" 
					onMouseEnter={() => handleStarHover(index)} />)}
		</div>
    );
}, []);

export default Rating;