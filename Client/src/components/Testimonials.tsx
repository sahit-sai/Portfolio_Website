import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTestimonials } from "@/redux/slices/testimonialsSlice";
import { RootState, AppDispatch } from "@/redux/store";
import { Star } from "lucide-react";

// Static fallback data
const staticTestimonials = [
	{
		_id: "1",
		name: "Sarah Johnson",
		company: "Innovatech Solutions",
		quote: "Krishna is a brilliant developer who brought our vision to life with precision and creativity. The final product exceeded our expectations, and the entire process was seamless. A true professional!",
		rating: 5,
		image: "https://i.pravatar.cc/150?u=sarahjohnson"
	},
	{
		_id: "2",
		name: "Michael Chen",
		company: "QuantumLeap AI",
		quote: "The level of technical expertise and dedication to our project was outstanding. Krishna tackled complex challenges with ease and delivered a robust, scalable solution. I would hire him again in a heartbeat.",
		rating: 5,
		image: "https://i.pravatar.cc/150?u=michaelchen"
	},
	{
		_id: "3",
		name: "Emily Rodriguez",
		company: "Creative Minds Agency",
		quote: "Working with Krishna was an absolute pleasure. He is not only a talented developer but also a great communicator. He kept us updated throughout the project and was always open to feedback.",
		rating: 5,
		image: "https://i.pravatar.cc/150?u=emilyrodriguez"
	},
	{
		_id: "4",
		name: "David Lee",
		company: "NextGen Gaming",
		quote: "The quality of the work delivered was exceptional. Krishna has a keen eye for detail and a deep understanding of modern web technologies. Our new platform is fast, responsive, and user-friendly.",
		rating: 5,
		image: "https://i.pravatar.cc/150?u=davidlee"
	}
];

export const Testimonials = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { testimonials, status } = useSelector((state: RootState) => state.testimonials);

	useEffect(() => {
		dispatch(fetchTestimonials());
	}, [dispatch]);

	const testimonialsToDisplay = status === 'failed' || testimonials.length === 0 ? staticTestimonials : testimonials;

	const getImageUrl = (imagePath: string) => {
		if (!imagePath) return "/placeholder.svg?height=60&width=60";
		if (imagePath.startsWith('http')) return imagePath;
		return `http://localhost:3001${imagePath}`;
	};

	return (
		<section id="testimonials" className="py-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold mb-4">Client Testimonials</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
						Don't just take my word for it - here's what my clients have to say about working with me.
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
					{status === 'loading' ? (
						<p className="text-center col-span-2">Loading testimonials...</p>
					) : (
						testimonialsToDisplay.map((testimonial: any) => (
							<div key={testimonial._id} className="bg-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
								<div className="flex items-center mb-4">
									{[...Array(testimonial.rating || 5)].map((_, starIndex) => (
										<Star key={starIndex} className="h-5 w-5 text-yellow-400 fill-current" />
									))}
								</div>
								<p className="text-muted-foreground mb-6 leading-relaxed italic">
									"{testimonial.quote}"
								</p>
								<div className="flex items-center">
									<img
										src={getImageUrl(testimonial.image)}
										alt={testimonial.name}
										className="w-12 h-12 rounded-full mr-4 object-cover"
									/>
									<div>
										<h4 className="font-semibold">{testimonial.name}</h4>
										<p className="text-sm text-muted-foreground">{testimonial.company}</p>
									</div>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</section>
	);
};
