import CategoryItem from "./CategoryItem"
import { useEffect, useState } from "react";
import { message } from "antd";
import "./Categories.css"



const Categories = () => {

    const [categories, setCategories] = useState([]);

    const apiUrl = "/api/v1";
    
  useEffect(() => {
    const fetchCategories = async () => {
        try {
          const response = await fetch(`${apiUrl}/categories`);
    
          if (response.ok) {
            const data = await response.json();
            setCategories(data);
          } else {
            message.error("Data Fetch Failed");
          }
        } catch (error) {
          console.log("Data Error", error);
        }
      };
      fetchCategories()
  }, [apiUrl]);
  

    return (
        <section className="categories">
            <div className="container">
                <div className="section-title">
                    <h2>All Categories</h2>
                    <p>Summer Collection New Morden Design</p>
                </div>
                <ul className="category-list">
                    {categories.map((category) => (
                        <CategoryItem key={category._id} category={category} />
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default Categories