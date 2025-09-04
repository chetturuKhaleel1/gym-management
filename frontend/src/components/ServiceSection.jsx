import React from 'react';
import { Dumbbell, HeartPulse, Flame, Armchair, Mountain } from 'lucide-react';

const services = [
  {
    icon: <Dumbbell size={28} />,
    title: 'Strength Training',
    desc: 'Build power and muscle mass with our expert-led strength programs.',
  },
  {
    icon: <HeartPulse size={28} />,
    title: 'Cardio Sessions',
    desc: 'Boost endurance and heart health with HIIT, cycling, and treadmills.',
  },
  {
    icon: <Flame size={28} />,
    title: 'Weight Loss',
    desc: 'Burn fat fast with guided training plans and nutrition advice.',
  },
  {
    icon: <Mountain size={28} />,
    title: 'CrossFit',
    desc: 'High-intensity functional workouts to build raw strength & agility.',
  },
  {
    icon: <Armchair size={28} />,
    title: 'Yoga & Flexibility',
    desc: 'Stretch, recover and improve mobility with daily yoga sessions.',
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 px-6 md:px-20 bg-[#0c0c0c] text-white">
      <h2 className="text-4xl font-bold text-center mb-16 tracking-tight">💼 Our Services</h2>
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-transparent hover:border-green-500 hover:shadow-green-500/20 shadow-md transition-all hover:scale-105 hover:-rotate-1 duration-300"
          >
            <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-green-500/10 border border-green-400 text-green-400 shadow-sm">
              {service.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-400 text-sm">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
