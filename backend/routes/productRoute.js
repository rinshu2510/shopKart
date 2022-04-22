const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview, getAdminProducts } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');


// router.get('/products', getAllProducts)
router.route('/products').get(getAllProducts);


router
    .route("/admin/products")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

// router.post('/product/new', createProduct)
router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);


// router.put('/product/:id',updateProduct)
// router.delete('/product/:id',deleteProduct)
// router.get('/product/:id',getProductDetails)
router.route('/admin/product/:id')
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)


router.route('/product/:id').get(getProductDetails)

router.route('/review').put(isAuthenticatedUser, createProductReview)

router.route('/reviews').get(getProductReviews);

router.route('/reviews').delete(isAuthenticatedUser, deleteReview);


module.exports = router 