export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-red-100 border-t-red-600 rounded-full animate-spin"></div>
        <div className="mt-4 text-center text-neutral-300 main-font">Cargando...</div>
      </div>
    </div>
  );
}
