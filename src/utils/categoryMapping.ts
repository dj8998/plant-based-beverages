
import categoriesData from '../data/categories.json';
import { supabase } from '@/integrations/supabase/client';

// Function to find the category and subcategory for a product
export const findCategoryForProduct = (productName: string): {
  categoryId: string;
  categoryName: string;
  subcategoryId: string;
  subcategoryName: string;
} | null => {
  const productNameUpper = productName.toUpperCase();
  
  for (const category of categoriesData.categories) {
    for (const subcategory of category.subcategories) {
      if (subcategory.products) {
        for (const product of subcategory.products) {
          if (product.toUpperCase() === productNameUpper || 
              productNameUpper.includes(product.toUpperCase()) || 
              product.toUpperCase().includes(productNameUpper)) {
            return {
              categoryId: category.id,
              categoryName: category.name,
              subcategoryId: subcategory.id,
              subcategoryName: subcategory.name,
            };
          }
        }
      }
    }
  }
  
  return null;
};

// Function to update manufacturer records with category information
export const updateManufacturerCategories = async () => {
  try {
    // Fetch all manufacturers
    const { data: manufacturers, error } = await supabase
      .from('manufacturer_list')
      .select('*');
      
    if (error) {
      console.error('Error fetching manufacturers:', error);
      return;
    }
    
    if (!manufacturers || manufacturers.length === 0) {
      console.log('No manufacturers found');
      return;
    }
    
    console.log(`Found ${manufacturers.length} manufacturers to update`);
    
    // Update each manufacturer
    let updatedCount = 0;
    
    for (const manufacturer of manufacturers) {
      if (!manufacturer.product) {
        console.log(`Manufacturer ${manufacturer.company_name} has no product, skipping`);
        continue;
      }
      
      const categoryInfo = findCategoryForProduct(manufacturer.product);
      
      if (categoryInfo) {
        const { categoryName, subcategoryName } = categoryInfo;
        
        // Only update if fields are empty or different
        if (!manufacturer["Top Category"] || !manufacturer.Subcategories ||
            manufacturer["Top Category"] !== categoryName || 
            !manufacturer.Subcategories.includes(subcategoryName)) {
          
          const { error: updateError } = await supabase
            .from('manufacturer_list')
            .update({ 
              "Top Category": categoryName,
              "Subcategories": subcategoryName
            })
            .eq('company_name', manufacturer.company_name);
          
          if (updateError) {
            console.error(`Error updating manufacturer ${manufacturer.company_name}:`, updateError);
          } else {
            updatedCount++;
          }
        }
      } else {
        console.log(`No category found for product: ${manufacturer.product}`);
      }
    }
    
    console.log(`Updated ${updatedCount} manufacturers with category information`);
    return updatedCount;
  } catch (error) {
    console.error('Error updating manufacturer categories:', error);
    return null;
  }
};
