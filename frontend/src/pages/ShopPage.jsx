import CampaignSingle from "../components/CampaignSingle/CampaignSingle"
import Products from "../components/Products/Products"
import Categories from "../components/categories/categories"

const ShopPage = () => {
    return (
        <>
            <Categories />
            <Products />
            <CampaignSingle />
            <Products />
        </>
    )
}

export default ShopPage