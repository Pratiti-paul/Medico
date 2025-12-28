const Medicine = require("../models/Medicine");

// GET all medicines with filtering, sorting, and pagination
exports.getAllMedicines = async (req, res) => {
  try {
    const { page = 1, limit = 8, search = "", sort = "", category = "All" } = req.query;

    const query = {
      name: { $regex: search, $options: "i" }, // Case-insensitive search
    };

    if (category !== "All") {
      query.category = category;
    }

    let sortOptions = {};
    if (sort === "price_low") sortOptions = { price: 1 };
    else if (sort === "price_high") sortOptions = { price: -1 };
    else if (sort === "name_asc") sortOptions = { name: 1 };
    else if (sort === "name_desc") sortOptions = { name: -1 };

    const medicines = await Medicine.find(query)
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Medicine.countDocuments(query);

    res.json({
      medicines,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      totalMedicines: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
