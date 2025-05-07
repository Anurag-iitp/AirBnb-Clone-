const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        filename: {
            type: String,
            default:"Listing image"
        },
        url: {
            type: String,
            set: (v) => v === "" ? "https://www.bing.com/ck/a?!&&p=f3d27891454b4902d477c93da50e361be8474693908acbbc574dbf73c8cc58cfJmltdHM9MTc0NTUzOTIwMA&ptn=3&ver=2&hsh=4&fclid=08532dcb-1052-65a7-2683-3946115464cf&u=a1L2ltYWdlcy9zZWFyY2g_cT1jb3B5cmlnaHQlMjBmcmVlJTIwaW1hZ2UlMjBvZiUyMGhvdGVsJkZPUk09SVFGUkJBJmlkPTc5NDZENEUzNzRFNEYxRDA3NkNBNzdFOEJCOUUzM0FFMTNEMjUyRDI&ntb=1"
                : v,//it sets defualt value of the link when the image link is not entered 
            default: "https://www.bing.com/ck/a?!&&p=f3d27891454b4902d477c93da50e361be8474693908acbbc574dbf73c8cc58cfJmltdHM9MTc0NTUzOTIwMA&ptn=3&ver=2&hsh=4&fclid=08532dcb-1052-65a7-2683-3946115464cf&u=a1L2ltYWdlcy9zZWFyY2g_cT1jb3B5cmlnaHQlMjBmcmVlJTIwaW1hZ2UlMjBvZiUyMGhvdGVsJkZPUk09SVFGUkJBJmlkPTc5NDZENEUzNzRFNEYxRDA3NkNBNzdFOEJCOUUzM0FFMTNEMjUyRDI&ntb=1"
        }
    },
    price: Number,
    location: String,
    country: String,
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
