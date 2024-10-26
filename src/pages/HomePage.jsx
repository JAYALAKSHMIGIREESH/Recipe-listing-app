import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from '../features/recipeSlice';
import RecipeCard from '../components/RecipeCard';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
  const dispatch = useDispatch();
  const { items, currentPage, loading, error } = useSelector((state) => state.recipes);

  // Local state for search input
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await dispatch(fetchRecipes({ page: currentPage }));
      setIsLoading(false);
    };
    
    fetchData();
  }, [dispatch, currentPage]);

  // Handle loading and error states
  if (isLoading) return <div style={{color:'red',fontWeight:'600'}}>Loading recipes...</div>;
  if (error) return <div>Error fetching recipes: {error}</div>;

  // Filter items based on search term when the search button is clicked
  const filteredItems = searchTerm
    ? items.filter((recipe) =>
        recipe.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : items;

  return (
    <div className="home-page">
      <SearchBar setSearchTerm={setSearchTerm} /> {/* Pass setter function */}
      <div className="recipe-list">
        {filteredItems.length === 0 ? (
          <div>No recipes found for "{searchTerm}"</div>
        ) : (
          filteredItems.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        )}
      </div>
      <Pagination />
    </div>
  );
};

export default HomePage;
