const getAllProducts = (req, res) => {
    res.send("Fetching all products");
  };
  
  const getProductById = (req, res) => {
    const id = req.params.id;
    res.send(`Fetching product with ID: ${id}`);
  };
  
  const addProduct = (req, res) => {
    res.send("Adding a new product");
  };
  
  module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
  };
  