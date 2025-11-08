import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

export function FilterBar({
  filters,
  onChange,
  brands,
  fuelTypes,
}: FilterBarProps) {
  const [showFilters, setShowFilters] = useState(false);

  // Cada vez que cambian los filtros, disparamos la funcion applyFilters del onChange
  // y le decimos que filtro va a ser y el valor
  const handleChange = (key: keyof Filters, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onChange({
      search: "",
      brand: "",
      yearMin: "",
      yearMax: "",
      priceMin: "",
      priceMax: "",
      fuelType: "",
    });
  };

  const hasActiveFilters = Object.values(filters).some((value) => value !== "");

  // Constantes para mapear los filtros
  const selectFilters = ["brand", "fuelType"] as const;
  const inputFilters = [
    ["yearMin", "yearMax"],
    ["priceMin", "priceMax"],
  ] as const;

  return (
    <div className="w-full self-start h-fit rounded-xl px-6 py-3">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2  w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por marca o nombre..."
            value={filters.search}
            onChange={(e) => handleChange("search", e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-b border-red-800 outline-none transition-all"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-red-800 hover:bg-red-900 cursor-pointer rounded-lg transition-colors font-medium"
        >
          <SlidersHorizontal className="w-5 h-5" />
          Filtros
        </button>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer rounded-lg transition-colors font-medium"
          >
            <X className="w-5 h-5" />
            Limpiar
          </button>
        )}
      </div>

      <div
        className={`overflow-hidden transition-all duration-700 ${
          showFilters ? "max-h-96 pt-3 ps-3" : "max-h-0"
        } flex border-l mb-10 sm:mb-0 border-red-800 flex-wrap w-full items-start justify-start gap-4`}
      >
        {selectFilters.map((filter, index) => {
          return (
            <div key={index} className="flex ps-2 flex-col gap-1">
              <label className="block text-sm font-medium text-gray-200 mb-2">
                {filter === "brand" ? `Marca` : `Combustible`}
              </label>
              <select
                value={filters[filter]}
                onChange={(e) => handleChange(filter, e.target.value)}
                className="w-full px-4 py-[6.5px] border-b border-gray-300 outline-none"
              >
                <option className="bg-neutral-800" value="">
                  Todos
                </option>
                {filter === "brand"
                  ? brands.map((brand) => (
                      <option
                        className="bg-neutral-800"
                        key={brand}
                        value={brand}
                      >
                        {brand}
                      </option>
                    ))
                  : fuelTypes.map((type) => (
                      <option
                        className="bg-neutral-800"
                        key={type}
                        value={type}
                      >
                        {type}
                      </option>
                    ))}
              </select>
            </div>
          );
        })}

        {inputFilters.map((filter, index) => {
          return (
            <div key={index} className="flex w-fit flex-col gap-1">
              <label className="block text-sm font-medium text-gray-200 mb-2">
                {filter[0] === "yearMin" ? `Año minimo` : `Precio minimo`}
              </label>
              <div className="flex gap-3">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters[filter[0]]}
                  onChange={(e) => handleChange(filter[0], e.target.value)}
                  className="w-[70px] px-3 border-b py-1 border-gray-300 outline-none"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters[filter[1]]}
                  onChange={(e) => handleChange(filter[1], e.target.value)}
                  className="w-[70px] px-3 border-b py-1 border-gray-300 outline-none"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
