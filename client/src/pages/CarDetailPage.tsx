import { useParams, useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '../components/LoadingSpinner';
import {
  ArrowLeft,
  Calendar,
  Fuel,
  Zap,
  DollarSign,
  Gauge,
} from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useEffect, useState } from 'react';

export function CarDetailPage() {
  // Obtenemos el id del auto por URL
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [car, setCar] = useState<ICar>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Obtenemos los datos del auto
    setLoading(true);
    axios.get("http://localhost:3000/cars/" + id).then((res) => {
      setCar(res.data);
      console.log(res.data)
      setLoading(false);
    });
  }, [id]);

  // Datos de las cards
  const carItems = [
    { icon: Fuel, text: car?.fuel_type, title: "Tipo de combustible" },
    { icon: Zap, text: `${car?.hp} HP`, title: "Caballos de fuerza" },
    { icon: Calendar, text: `${car?.car_year}`, title: "Año" },
    { icon: Gauge, text: `0 - 100 in ${car?.acceleration} sec.`, title: "Velocidad 0 a 100" },
  ]

  if (loading) {
    return (
      <div className="h-screen noise-black flex items-center justify-center mx-auto px-4 py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (!car) {
    return null;
  }

  return (
    <div className="min-h-screen noise-black">
      <div className="h-full">
        <button
          onClick={() => navigate('/')}
          className="flex cursor-pointer absolute items-center gap-2 z-20 px-3 py-2 rounded-lg top-4 left-4 noise-red text-white group transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:text-red-600 transition-all" />
          <span className="text-xl main-font">Volver al inicio</span>
        </button>

        <div className="shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="relative h-full flex w-full lg:w-1/2">
              <img
                src={"/cars" + car.image}
                alt={`${car.brand} ${car.name}`}
                className="w-full h-[35vh] lg:h-screen object-cover"
              />
            </div>

            <div className="p-8 flex flex-col justify-between  lg:w-1/2">
              <div>
                <div className="mb-6">
                  <h1 className="text-4xl main-font lg:text-5xl font-bold mb-2">
                    {car.name}
                  </h1>
                  <p className="text-2xl text-neutral-300">{car.brand}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {
                    carItems.map((item, index) => (
                      <div key={index} className="flex flex-wrap items-center gap-3 p-4 noise-red rounded-lg">
                        <item.icon className="w-6 h-6 text-red-700" />
                        <div>
                          <p className="text-sm">{item.title}</p>
                          <p className="font-semibold capitalize">{item.text}</p>
                        </div>
                      </div>
                    ))
                  }
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">Descripción</h3>
                  <p className=" leading-relaxed">{car.description}</p>
                </div>
              </div>

              <div className='flex items-center gap-5 justify-center'>
                <div className="flex items-center">
                  <DollarSign className="w-8 h-8 text-green-600" />
                  <span className="text-4xl">
                    {Number(car.price).toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => toast.success('Próximamente!', {
                    iconTheme: {
                      primary: '#0a0a0a',
                      secondary: '#ccc',
                    },
                    style: {
                      backgroundColor: '#520101f3',
                      color: '#fff',
                    },
                  })}
                  className="w-full cursor-pointer bg-red-800 hover:bg-red-900 main-font text-2xl py-4 rounded-xl transition-colors shadow-lg hover:shadow-xl"
                  >
                  Contactar vendedor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
