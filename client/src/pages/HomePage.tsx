import { useState, useEffect } from 'react';
import { CarCard } from '../components/CarCard.tsx';
import { FilterBar } from '../components/FilterBar.tsx';
import { LoadingSpinner } from '../components/LoadingSpinner.tsx';
import { Car, Flame } from 'lucide-react';
import axios from 'axios';

export function HomePage() {
  const [cars, setCars] = useState<ICar[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Obtenemos los datos de los autos
    setLoading(true);
    axios.get("http://localhost:3000/cars").then((res) => {
      setCars(res.data);
      setLoading(false);
    });
  }, []);

  const [filteredCars, setFilteredCars] = useState<ICar[]>([]);
  const [filters, setFilters] = useState<Filters>({
    search: '',
    brand: '',
    yearMin: '',
    yearMax: '',
    priceMin: '',
    priceMax: '',
    fuelType: '',
  });

  // Eliminamos los duplicados
  const brands = Array.from(new Set(cars.map((car) => car.brand))).sort();
  const fuelTypes = Array.from(new Set(cars.map((car) => car.fuel_type))).sort();

  useEffect(() => {
    applyFilters();
  }, [filters, cars]);

  const applyFilters = () => {
    let result = [...cars];

    if (filters.search) {
      // Filtro de busqueda (por nombre y marca)
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (car) =>
          car.brand.toLowerCase().includes(searchLower) ||
          car.name.toLowerCase().includes(searchLower)
      );
    }

    // Creamos todos los filtros
    if (filters.brand) {
      result = result.filter((car) => car.brand === filters.brand);
    }

    if (filters.fuelType) {
      result = result.filter((car) => car.fuel_type === filters.fuelType);
    }

    if (filters.yearMin) {
      result = result.filter((car) => car.car_year >= parseInt(filters.yearMin));
    }

    if (filters.yearMax) {
      result = result.filter((car) => car.car_year <= parseInt(filters.yearMax));
    }

    if (filters.priceMin) {
      result = result.filter((car) => car.price >= parseFloat(filters.priceMin));
    }

    if (filters.priceMax) {
      result = result.filter((car) => car.price <= parseFloat(filters.priceMax));
    }

    setFilteredCars(result);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner />
      </div>
    );
  }

return (
  <div>
    <div className="w-full relative sm:h-[70vh] flex flex-col xl:flex-row items-center justify-start overflow-hidden">
      <div className="w-full xl:min-w-[645px] xl:w-auto relative z-50 main-font flex flex-col justify-start gap-14 xl:gap-44 px-2 py-4 xl:px-8 xl:py-8  sm:h-full bg-red-800 backdrop-blur-sm">
        <header className="pt-4 flex flex-wrap justify-center gap-x-10 gap-y-4 sm:justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-[#500000] p-2 rounded-lg">
              <Flame className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl">Comunidauto</h1>
              <p className="text-sm text-neutral-400">Web de prueba</p>
            </div>
          </div>

          <nav className="flex gap-4">
            {["About", "Contact", "FAQ"].map((item) => (
              <h2
                key={item}
                className="text-xl underline underline-offset-4 decoration-1 decoration-neutral-900 hover:text-neutral-800 cursor-pointer transition-all"
              >
                {item}
              </h2>
            ))}
          </nav>
        </header>

        <p className="text-3xl md:text-5xl leading-snug">
          Encuentra el auto de tus sueños en{" "}
          <span className="italic text-5xl md:text-6xl underline decoration-1 underline-offset-4 decoration-neutral-900">
            Comunidauto
          </span>
        </p>

        <div className="hidden xl:block absolute -z-10 left-[550px] rotate-12 w-42 -top-11 bg-red-800 h-[105%]" />
      </div>

      {/* Imagen */}
      <img
        src="/images/heroImage.jpg"
        alt="hero auto"
        className="w-full h-[40vh] xl:h-full object-cover fadeIn"
      />
    </div>

    <div className='bg-neutral-800 noise-black min-h-60 flex justify-center items-center sm:p-10'>
      <FilterBar
        filters={filters}
        onChange={setFilters}
        brands={brands}
        fuelTypes={fuelTypes}
      />
    </div>

      {filteredCars.length === 0 ? (
        <div className="text-center flex flex-col items-center justify-start noise-black h-screen py-16 z-30">
          <h3 className="text-6xl mb-4"><Car className='w-14 h-14' /></h3>
          <h3 className="text-2xl font-bold mb-2">No se encontraron autos</h3>
          <p className="text-neutral-300">Intenta ajustar los filtros para ver más resultados</p>
        </div>
      ) : (
        <>
          <div className="py-6 text-lg bg-red-800 main-font px-10">
            Mostrando {filteredCars.length} de {cars.length} autos
          </div>
          <div className="flex justify-center  noise-black pb-20 pt-20 px-5 bg-neutral-800">
            <div className='flex justify-center w-full flex-wrap gap-x-6 gap-y-10'>
              {filteredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
