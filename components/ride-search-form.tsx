import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Calendar, Users, Car, Train, Bus, Search } from 'lucide-react';

interface RideSearchFormProps {
  initialValues?: {
    from?: string;
    to?: string;
    date?: string;
    passengers?: string;
    transport?: string;
  };
  onSearch?: (values: {
    from: string;
    to: string;
    date: string;
    passengers: string;
    transport: string;
  }) => void;
  loading?: boolean;
}

export const RideSearchForm: React.FC<RideSearchFormProps> = ({ initialValues, onSearch, loading }) => {
  const router = useRouter();
  const [form, setForm] = useState({
    from: initialValues?.from || '',
    to: initialValues?.to || '',
    date: initialValues?.date || '',
    passengers: initialValues?.passengers || '1',
    transport: initialValues?.transport || 'any',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(form);
    } else {
      // Redirect mit Query-Parametern
      const params = new URLSearchParams({
        from: form.from,
        to: form.to,
        date: form.date,
        passengers: form.passengers,
        transport: form.transport,
      });
      router.push(`/search?${params.toString()}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-5 gap-6 bg-white dark:bg-black rounded-2xl shadow-xl p-8 mb-8"
      aria-label="Fahrtsuche"
    >
      <div className="space-y-2">
        <label htmlFor="from" className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Von
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
          <input
            id="from"
            name="from"
            type="text"
            autoComplete="off"
            placeholder="Abfahrtsort"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-black text-black dark:text-white"
            value={form.from}
            onChange={handleChange}
            aria-label="Abfahrtsort"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="to" className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Nach
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
          <input
            id="to"
            name="to"
            type="text"
            autoComplete="off"
            placeholder="Zielort"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-black text-black dark:text-white"
            value={form.to}
            onChange={handleChange}
            aria-label="Zielort"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="date" className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Datum
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
          <input
            id="date"
            name="date"
            type="date"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-black text-black dark:text-white"
            value={form.date}
            onChange={handleChange}
            aria-label="Datum"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="passengers" className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Passagiere
        </label>
        <div className="relative">
          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
          <select
            id="passengers"
            name="passengers"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-black text-black dark:text-white appearance-none"
            value={form.passengers}
            onChange={handleChange}
            aria-label="Passagiere"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4+</option>
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="transport" className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Transport
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true">
            {form.transport === 'car' ? <Car className="w-5 h-5" /> : form.transport === 'train' ? <Train className="w-5 h-5" /> : form.transport === 'bus' ? <Bus className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </span>
          <select
            id="transport"
            name="transport"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-black text-black dark:text-white appearance-none"
            value={form.transport}
            onChange={handleChange}
            aria-label="Transportmittel"
          >
            <option value="any">Beliebig</option>
            <option value="car">Auto</option>
            <option value="train">Zug</option>
            <option value="bus">Bus</option>
            <option value="other">Anderes</option>
          </select>
        </div>
      </div>
      <div className="md:col-span-5 flex justify-center items-end mt-4 md:mt-0">
        <button
          type="submit"
          className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white"
          aria-label="Suche starten"
          disabled={loading}
        >
          <Search className="w-5 h-5" aria-hidden="true" />
          {loading ? 'Suche...' : 'Fahrt finden'}
        </button>
      </div>
    </form>
  );
}; 