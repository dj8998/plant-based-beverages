import { SupabaseClient } from '@supabase/supabase-js';

export const createSupabaseLogger = (supabase: SupabaseClient) => {
  const originalFrom = supabase.from;
  
  // Override the from method to add logging
  supabase.from = function(table: string) {
    const query = originalFrom.call(this, table);
    
    // Log the query when it's executed
    const originalSelect = query.select;
    query.select = function(...args: any[]) {
      console.log(`[Supabase Query] SELECT from ${table}:`, args);
      return originalSelect.apply(this, args);
    };

    const originalInsert = query.insert;
    query.insert = function(...args: any[]) {
      console.log(`[Supabase Query] INSERT into ${table}:`, args);
      return originalInsert.apply(this, args);
    };

    const originalUpdate = query.update;
    query.update = function(...args: any[]) {
      console.log(`[Supabase Query] UPDATE ${table}:`, args);
      return originalUpdate.apply(this, args);
    };

    const originalDelete = query.delete;
    query.delete = function(...args: any[]) {
      console.log(`[Supabase Query] DELETE from ${table}:`, args);
      return originalDelete.apply(this, args);
    };

    return query;
  };

  return supabase;
}; 