interface ICar {
  id: number;
  name: string;
  brand: string;
  car_year: number;
  price: number;
  image: string;
  fuel_type: "gas" | "electric" | "hybrid" | "diesel";
  hp: number;
  acceleration: number;
  description: string;
  featured: boolean;
}

interface Filters {
  search: string;
  brand: string;
  yearMin: string;
  yearMax: string;
  priceMin: string;
  priceMax: string;
  fuelType: string;
}

interface FilterBarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  brands: string[];
  fuelTypes: string[];
}