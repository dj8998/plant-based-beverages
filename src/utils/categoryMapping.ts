
import categoriesData from '../data/categories.json';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Function to find the category and subcategory for a product
export const findCategoryForProduct = (productName: string): {
  categoryId: string;
  categoryName: string;
  subcategoryId: string;
  subcategoryName: string;
} | null => {
  if (!productName) return null;
  
  const productNameUpper = productName.toUpperCase();
  
  // Try exact match first
  for (const category of categoriesData.categories) {
    for (const subcategory of category.subcategories) {
      if (subcategory.products) {
        for (const product of subcategory.products) {
          if (product.toUpperCase() === productNameUpper) {
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
  
  // Try partial match
  for (const category of categoriesData.categories) {
    for (const subcategory of category.subcategories) {
      if (subcategory.products) {
        for (const product of subcategory.products) {
          if (product.toUpperCase().includes(productNameUpper) || 
              productNameUpper.includes(product.toUpperCase())) {
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
  
  // Try keyword matching as a fallback
  const keywords = productNameUpper.split(/\s+/);
  for (const category of categoriesData.categories) {
    for (const subcategory of category.subcategories) {
      if (subcategory.products) {
        for (const product of subcategory.products) {
          const productWords = product.toUpperCase().split(/\s+/);
          // Check if any keywords match
          for (const keyword of keywords) {
            if (keyword.length > 3) { // Only check meaningful keywords
              for (const productWord of productWords) {
                if (productWord.includes(keyword) || keyword.includes(productWord)) {
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
      toast.error('Failed to fetch manufacturers');
      return;
    }
    
    if (!manufacturers || manufacturers.length === 0) {
      console.log('No manufacturers found');
      toast.info('No manufacturers found in database');
      return;
    }
    
    console.log(`Found ${manufacturers.length} manufacturers to update`);
    
    // Update each manufacturer
    let updatedCount = 0;
    let noMatchCount = 0;
    let categoryCounts: Record<string, number> = {};
    
    for (const manufacturer of manufacturers) {
      if (!manufacturer.product) {
        console.log(`Manufacturer ${manufacturer.company_name} has no product, skipping`);
        continue;
      }
      
      const categoryInfo = findCategoryForProduct(manufacturer.product);
      
      if (categoryInfo) {
        const { categoryName, subcategoryName } = categoryInfo;
        
        // Track category distribution
        categoryCounts[subcategoryName] = (categoryCounts[subcategoryName] || 0) + 1;
        
        // Only update if fields are empty or different
        if (!manufacturer["Top Category"] || !manufacturer.Subcategories ||
            manufacturer["Top Category"] !== categoryName || 
            manufacturer.Subcategories !== subcategoryName) {
          
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
        noMatchCount++;
        console.log(`No category found for product: ${manufacturer.product}`);
      }
    }
    
    console.log(`Updated ${updatedCount} manufacturers with category information`);
    console.log(`Could not find categories for ${noMatchCount} manufacturers`);
    console.log('Category distribution:', categoryCounts);
    
    // Show success toast with details
    toast.success(`Updated ${updatedCount} manufacturers with categories`, {
      description: `${noMatchCount} products couldn't be categorized`
    });
    
    return {
      updatedCount,
      noMatchCount,
      categoryCounts
    };
  } catch (error) {
    console.error('Error updating manufacturer categories:', error);
    toast.error('Failed to update manufacturer categories');
    return null;
  }
};

// Function to get stats about category mapping
export const getCategoryMappingStats = async () => {
  try {
    // Get counts by subcategory
    const { data: subcategoryCounts, error: countError } = await supabase
      .from('manufacturer_list')
      .select('Subcategories, count')
      .not('Subcategories', 'is', null)
      .group('Subcategories');
    
    if (countError) {
      console.error('Error getting subcategory counts:', countError);
      return null;
    }
    
    // Get total count of manufacturers
    const { count: totalCount, error: totalError } = await supabase
      .from('manufacturer_list')
      .select('*', { count: 'exact', head: true });
    
    if (totalError) {
      console.error('Error getting total count:', totalError);
      return null;
    }
    
    // Get count of manufacturers with no category
    const { count: uncategorizedCount, error: uncatError } = await supabase
      .from('manufacturer_list')
      .select('*', { count: 'exact', head: true })
      .is('Subcategories', null);
    
    if (uncatError) {
      console.error('Error getting uncategorized count:', uncatError);
      return null;
    }
    
    return {
      totalManufacturers: totalCount,
      uncategorizedCount,
      subcategoryCounts
    };
  } catch (error) {
    console.error('Error getting category mapping stats:', error);
    return null;
  }
};

// Utility function to force-assign manufacturers to the "Corporate Gifts" subcategory
export const assignManufacturersToGifting = async () => {
  try {
    // Get manufacturers with specific gift-related keywords in their product name
    const { data: manufacturers, error } = await supabase
      .from('manufacturer_list')
      .select('*')
      .or('product.ilike.%gift%,product.ilike.%award%,product.ilike.%trophy%,product.ilike.%corporate%,product.ilike.%promotional%');
      
    if (error) {
      console.error('Error fetching gift manufacturers:', error);
      toast.error('Failed to fetch manufacturers for gifting category');
      return;
    }
    
    if (!manufacturers || manufacturers.length === 0) {
      console.log('No gift manufacturers found');
      toast.info('No manufacturers match gifting keywords');
      return;
    }
    
    console.log(`Found ${manufacturers.length} potential gift manufacturers`);
    
    // Update each manufacturer with gifting category
    let updatedCount = 0;
    
    for (const manufacturer of manufacturers) {
      const { error: updateError } = await supabase
        .from('manufacturer_list')
        .update({ 
          "Top Category": "Festive & Gifting",
          "Subcategories": "Corporate Gifts"
        })
        .eq('company_name', manufacturer.company_name);
      
      if (updateError) {
        console.error(`Error updating manufacturer ${manufacturer.company_name}:`, updateError);
      } else {
        updatedCount++;
      }
    }
    
    console.log(`Assigned ${updatedCount} manufacturers to Corporate Gifts subcategory`);
    toast.success(`Assigned ${updatedCount} manufacturers to Corporate Gifts category`);
    
    return updatedCount;
  } catch (error) {
    console.error('Error assigning manufacturers to gifting category:', error);
    toast.error('Failed to update manufacturers');
    return null;
  }
};
