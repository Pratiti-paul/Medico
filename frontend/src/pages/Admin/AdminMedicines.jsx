import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import './AdminDoctors.css'; // Reusing base layout styles
import './AdminMedicines.css';

const AdminMedicines = () => {
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [editingMed, setEditingMed] = useState(null);
    const [editFormData, setEditFormData] = useState({ price: "", stock: "" });

    const fetchMedicines = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/medicines?limit=100`);
            setMedicines(res.data.medicines);
        } catch (error) {
            console.error("Error fetching medicines:", error);
            toast.error("Failed to load medicines");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMedicines();
    }, []);

    const handleEditClick = (med) => {
        setEditingMed(med);
        setEditFormData({ price: med.price, stock: med.stock });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/medicines/${editingMed._id}`, 
                editFormData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Medicine updated successfully");
            setMedicines(medicines.map(m => m._id === editingMed._id ? { ...m, ...editFormData } : m));
            setEditingMed(null);
        } catch (error) {
            toast.error("Failed to update medicine");
        }
    };

    const filteredMedicines = medicines.filter(med => 
        med.name.toLowerCase().includes(search.toLowerCase()) ||
        med.category.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <Loader fullPage />;

    return (
        <div className="admin-page-container">
            <div className="page-header">
                <h3>Manage Medicines</h3>
                <div className="header-actions">
                    <input 
                        type="text" 
                        placeholder="Search medicines..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="admin-search-input"
                    />
                </div>
            </div>

            <div className="admin-card">
                <div className="table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Medicine</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMedicines.length > 0 ? (
                                filteredMedicines.map(med => (
                                    <tr key={med._id} data-testid="admin-med-row">
                                        <td className="doc-info-cell">
                                            <div className="doc-avatar">💊</div>
                                            <div className="doc-meta">
                                                <span className="doc-name" data-testid="med-name">{med.name}</span>
                                                <span className="doc-id">#{med._id.slice(-6).toUpperCase()}</span>
                                            </div>
                                        </td>
                                        <td>{med.category}</td>
                                        <td style={{ fontWeight: '700', color: '#1a202c' }}>₹{med.price}</td>
                                        <td style={{ color: med.stock < 10 ? '#e53e3e' : '#2d3748', fontWeight: '600' }}>
                                            {med.stock} pcs
                                        </td>
                                        <td>
                                            <button 
                                                className="action-btn approve"
                                                onClick={() => handleEditClick(med)}
                                                data-testid="edit-med-btn"
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="5" className="empty-row">No medicines found</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Modal */}
            {editingMed && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal">
                        <div className="modal-header">
                            <h3>Edit {editingMed.name}</h3>
                            <button className="close-btn" onClick={() => setEditingMed(null)}>×</button>
                        </div>
                        <form onSubmit={handleUpdate} className="admin-form">
                            <div className="form-group">
                                <label>Price (₹)</label>
                                <input 
                                    type="number" 
                                    value={editFormData.price}
                                    onChange={(e) => setEditFormData({...editFormData, price: e.target.value})}
                                    data-testid="med-form-price"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Stock Quantity</label>
                                <input 
                                    type="number" 
                                    value={editFormData.stock}
                                    onChange={(e) => setEditFormData({...editFormData, stock: e.target.value})}
                                    data-testid="med-form-stock"
                                    required
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="cancel-btn" onClick={() => setEditingMed(null)}>Cancel</button>
                                <button type="submit" className="save-btn" data-testid="med-form-submit">Update Inventory</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminMedicines;
