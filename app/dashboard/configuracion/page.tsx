import { Settings } from "lucide-react";

export default function ConfiguracionPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="rounded-md bg-white border border-gray-200 p-12 text-center">
        <Settings className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-[#1A4A3A] mb-2">Configuración</h1>
        <p className="text-gray-400 mb-2">Próximamente</p>
        <p className="text-sm text-gray-400 max-w-md">
          Aquí podrás ajustar las preferencias de tu cuenta, notificaciones, integraciones y parámetros generales del sistema.
        </p>
      </div>
    </div>
  );
}
