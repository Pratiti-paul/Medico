import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import API from "../services/api";
import MedicineHero from "../components/MedicineHero";
import { useCart } from "../context/CartContext";
import Loader from "../components/Loader/Loader";
import "./Medicines.css";

export default function Medicines() {
  const { addToCart, cartItems, updateQuantity } = useCart();
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Filter States
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name_asc");
  const [category, setCategory] = useState("ALL");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalMedicines, setTotalMedicines] = useState(0);

  const PER_PAGE = 8;
  
   const categories = [
    { label: "ALL", value: "ALL" },
    { label: "FEVER & COLD", value: "FEVER & COLD" },
    { label: "SUPPLEMENTS", value: "SUPPLEMENTS" },
    { label: "ANTIBIOTICS", value: "ANTIBIOTICS" },
    { label: "OTHERS", value: "OTHERS" }
  ];

  useEffect(() => {
    const fetchMedicines = async () => {
      setLoading(true);
      try {
        // Construct query params
         const queryParams = new URLSearchParams({
           page,
           limit: PER_PAGE,
           search,
           sort,
           category
        }).toString();

        const res = await API.get(`${import.meta.env.VITE_API_URL}/api/medicines?${queryParams}`);
        
        // Handle new response structure { medicines, totalPages, currentPage, totalMedicines }
        const data = res.data;
        if (data.medicines) {
           setMedicines(data.medicines);
           setTotalPages(data.totalPages);
           setTotalMedicines(data.totalMedicines);
        } else if (Array.isArray(data)) {
           // Fallback if backend didn't update yet (rare, but safe)
           setMedicines(data);
           setTotalMedicines(data.length);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching medicines:", err);
        setError("Failed to load medicines");
        setLoading(false);
      }
    };

    // Debounce search
    const timeoutId = setTimeout(() => {
      fetchMedicines();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [page, sort, search, category]);

  const handleSearch = (query) => {
    setSearch(query);
    setPage(1); // Reset to page 1 on search
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPage(1);
  };
  
  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  // Calculate range for display
  const startItem = (page - 1) * PER_PAGE + 1;
  const endItem = Math.min(page * PER_PAGE, totalMedicines);

  if (loading && page === 1 && !medicines.length) return <Loader fullPage />;
  if (error) return <p style={{textAlign:'center', color:'red', marginTop: '2rem'}}>{error}</p>;

  return (
    <div>
      <MedicineHero onSearch={handleSearch} />
      
      <div className="medicines-container">
        
        {/* Category Header Section */}
        <div className="page-header">
           <div className="breadcrumb">Medicine &gt; <span>Popular Medicines</span></div>
           <div className="filter-buttons">
              {categories.map((cat) => (
                <button 
                  key={cat.value} 
                  className={`filter-btn ${category === cat.value ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(cat.value)}
                >
                  {cat.label}
                </button>
              ))}
           </div>
        </div>

        {/* Controls: Count & Sort */}
        <div className="medicines-controls">
          <span className="medicines-count">
             {totalMedicines > 0 ? `Showing ${startItem}-${endItem} of ${totalMedicines} medicines` : "No medicines found"}
          </span>
          <select className="sort-select" value={sort} onChange={handleSortChange}>
            <option value="name_asc">Name (A-Z)</option>
            <option value="name_desc">Name (Z-A)</option>
            <option value="price_low">Price (Low to High)</option>
            <option value="price_high">Price (High to Low)</option>
          </select>
        </div>

        <div className="medicine-grid">
          {medicines.map((med) => (
            <div className="medicine-card" key={med._id}>
              <div className="medicine-image-wrapper">
                <img
                  className="medicine-image"
                  src={med.image || "https://placehold.co/350x250?text=Medicine"}
                  alt={med.name}
                  onError={(e) => { e.currentTarget.src = "https://placehold.co/350x250?text=Medicine"; }}
                />
              </div>
              <div className="medicine-info">
                 <span className="medicine-category">{med.category}</span>
                 <h4 className="medicine-name">{med.name}</h4>
                 <div className="medicine-footer">
                    <span className="medicine-price">₹{med.price}</span>
                    {(() => {
                      const cartItem = cartItems.find(item => item._id === med._id);
                      const qty = cartItem ? cartItem.quantity : 0;
                      
                      if (qty > 0) {
                        return (
                          <div className="qty-controls-mini">
                            <button 
                              className="qty-btn-mini" 
                              onClick={() => updateQuantity(med._id, -1)}
                            >
                              −
                            </button>
                            <span className="qty-val-mini">{qty}</span>
                            <button 
                              className="qty-btn-mini" 
                              onClick={() => updateQuantity(med._id, 1)}
                            >
                              +
                            </button>
                          </div>
                        );
                      }

                      return (
                         <button 
                           className="add-btn" 
                           onClick={() => {
                             addToCart(med);
                             toast.success(`${med.name} added to cart!`);
                           }}
                         >
                           Add to Cart
                         </button>
                      );
                    })()}
                 </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination-controls">
            <button 
              className="pagination-btn" 
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
            >
              Previous
            </button>
            <span className="page-info">Page {page} of {totalPages}</span>
            <button 
              className="pagination-btn" 
              disabled={page === totalPages}
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
