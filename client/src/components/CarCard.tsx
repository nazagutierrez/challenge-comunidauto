import { Gauge, Fuel, Calendar, DollarSign, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CarCard({ car }: {car: ICar}) {
  // Datos de las cards
  const carItems = [
    { icon: Fuel, text: car?.fuel_type },
    { icon: Zap, text: `${car?.hp} HP` },
    { icon: Calendar, text: `${car?.car_year}` },
    { icon: Gauge, text: `0 - 100 in ${car?.acceleration} sec.` },
  ]

  return (
    <div
      className="group noise-red w-[400px] rounded shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={"/cars" + car?.image}
          alt={`${car?.name} ${car?.brand}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className={`${car.featured ? "" : "hidden"} absolute top-4 right-4 bg-red-800 px-3 py-1 rounded-full shadow-lg`}>
          <span className="text-sm font-bold text-white main-font">{car.featured ? 'Nuevo' : ''}</span>
        </div>
      </div>

      <div className="p-3 sm:p-6">
        <div className="mb-3">
          <h3 className="text-2xl font-bold text-white transition-colors">
            {car?.name}
          </h3>
          <p className="text-lg text-neutral-300">{car?.brand}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {
            carItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <item.icon className="w-4 h-4 text-red-600" />
                <span className='capitalize'>{item.text}</span>
              </div>
            ))
          }
        </div>

        <div className="pt-4 flex items-center justify-between">
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span className="text-lg sm:text-2xl text-white">
              {car?.price?.toLocaleString()}
            </span>
          </div>
          <Link
            to={`/car/${car.id}`} 
            className="px-3 sm:px-8 py-2 bg-red-800 text-lg main-font text-white rounded-lg hover:bg-red-900 transition-colors cursor-pointer"
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
}
