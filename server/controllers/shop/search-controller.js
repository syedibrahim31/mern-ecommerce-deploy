const Product = require('../../models/Product')


const searchProducts = async (req, res) => {

    try {
        const { keyword } = req.params;
        if (!keyword || typeof keyword !== 'string') {
            return res.status(400).json({
                success: false,
                message: "keyword is required and must be in string format"
            })
        }

        const regEx = RegExp(keyword, 'i')

        const createSearchQuery = {
            $or : [
                {title:regEx},
                {description:regEx},
                {category:regEx},
                {brand:regEx}
            ]
        }

        const searchResults = await Product.find(createSearchQuery);

        res.status(200).json({
            success:true,
            data: searchResults
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: 'Error'
        })
    }
}

module.exports = { searchProducts }