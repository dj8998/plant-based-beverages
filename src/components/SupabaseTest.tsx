import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Manufacturer {
  company_name: string | null;
  product: string | null;
  "Top Category": string | null;
  Subcategories: string | null;
}

const SupabaseTest = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [manufacturerCount, setManufacturerCount] = useState<number | null>(null);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log('Testing Supabase connection...');
        setError(null);
        
        // First, get the count
        const { count, error: countError } = await supabase
          .from('manufacturer_list')
          .select('*', { count: 'exact', head: true });

        if (countError) {
          console.error('Error getting count:', countError);
          setError(`Count Error: ${countError.message}`);
          throw countError;
        }

        console.log('Count query successful:', count);
        setManufacturerCount(count);

        // Then, fetch all manufacturers
        const { data, error: fetchError } = await supabase
          .from('manufacturer_list')
          .select('*')
          .limit(10);

        if (fetchError) {
          console.error('Error fetching manufacturers:', fetchError);
          setError(`Fetch Error: ${fetchError.message}`);
          throw fetchError;
        }

        console.log('Raw data from Supabase:', data);
        setManufacturers(data || []);
        setIsConnected(true);
      } catch (error: any) {
        console.error('Error in Supabase connection test:', error);
        setIsConnected(false);
        setError(error.message || 'Unknown error occurred');
        toast.error(`Error connecting to Supabase: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-4 bg-gray-50">
      <h2 className="text-xl font-bold mb-4">Supabase Connection Test</h2>
      <div className="space-y-4">
        <div>
          <p>Connection Status: 
            <span className={`ml-2 ${isConnected === null ? 'text-gray-500' : isConnected ? 'text-green-500' : 'text-red-500'}`}>
              {isConnected === null ? 'Testing...' : isConnected ? 'Connected' : 'Failed'}
            </span>
          </p>
          {manufacturerCount !== null && (
            <p>Total Manufacturers: {manufacturerCount}</p>
          )}
          {error && (
            <p className="text-red-500 mt-2">Error: {error}</p>
          )}
        </div>

        {loading ? (
          <p>Loading manufacturers...</p>
        ) : manufacturers.length > 0 ? (
          <div>
            <h3 className="font-semibold mb-2">Sample Manufacturers (First 10):</h3>
            <div className="grid gap-4">
              {manufacturers.map((mfr, index) => (
                <div key={index} className="bg-white p-4 rounded shadow">
                  <p className="font-medium">{mfr.company_name || 'Unnamed Company'}</p>
                  <p className="text-sm text-gray-600">Product: {mfr.product || 'N/A'}</p>
                  <p className="text-sm text-gray-600">Category: {mfr["Top Category"] || 'N/A'}</p>
                  <p className="text-sm text-gray-600">Subcategory: {mfr.Subcategories || 'N/A'}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-red-500">No manufacturers found in the database</p>
        )}
      </div>
    </div>
  );
};

export default SupabaseTest; 