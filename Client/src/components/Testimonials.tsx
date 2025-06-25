import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTestimonials } from "@/redux/slices/testimonialsSlice";
import { RootState, AppDispatch } from "@/redux/store";
import { Star } from "lucide-react";

export const Testimonials = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { testimonials, isLoading } = useSelector((state: RootState) => state.testimonials);

  useEffect(() => {
    dispatch(fetchTestimonials());
  }, [dispatch]);

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
          {isLoading ? (
            <p>Loading testimonials...</p>
          ) : (
            testimonials.map((testimonial: any, index: number) => (
              <div key={index} className="bg-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
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
                    src={testimonial.image ? `http://localhost:3001${testimonial.image}` : "/placeholder.svg?height=60&width=60"}
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
