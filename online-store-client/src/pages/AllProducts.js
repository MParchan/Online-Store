import { useState, useEffect } from "react";
import { APIEndpoint, ENDPOINTS } from "../api";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ProductList from "../components/products/ProductList";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Pagination from "../components/ui/Pagination";

function AllProductsPage() {
  const [isLoadnig, setIsLoadin] = useState(true);
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [loadedCategories, setLoadedCategories] = useState([]);
  const [listOfProducts, setListOfProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(3);
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setIsLoadin(true);
    APIEndpoint(ENDPOINTS.products)
      .getAll("")
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        const products = [];
        for (const key in data) {
          const product = {
            id: key,
            ...data[key],
          };
          products.push(product);
        }
        setIsLoadin(false);
        setLoadedProducts(products);
        setListOfProducts(products);
      });
    setIsLoadin(true);
    APIEndpoint(ENDPOINTS.categories)
      .getAll("")
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        const categories = [];
        for (const key in data) {
          const category = {
            id: key,
            ...data[key],
          };
          categories.push(category);
        }
        setIsLoadin(false);
        setLoadedCategories(categories);
      });
  }, []);

  let searchHandler = (e) => {
    var input = e.target.value.toLowerCase();
    setSearch(input);
    searching(input);
  };

  function searching(val) {
    const products = [];
    for (var i in loadedProducts) {
      if (
        loadedProducts[i].name.toLowerCase().includes(val) ||
        loadedProducts[i].description.toLowerCase().includes(val)
      ) {
        products.push(loadedProducts[i]);
      }
    }
    setListOfProducts(products);
  }

  function handleSortChange(e) {
    var input = e.target.value;
    setSort(input);
    sorting(input);
  }

  function sorting(val) {
    if (val === 1) {
      listOfProducts.sort((a, b) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
      );
    }
    if (val === 2) {
      listOfProducts.sort((a, b) =>
        a.name < b.name ? 1 : b.name < a.name ? -1 : 0
      );
    }
    if (val === 3) {
      listOfProducts.sort((a, b) => a.cost - b.cost);
    }
    if (val === 4) {
      listOfProducts.sort((a, b) => b.cost - a.cost);
    }
    paginate(1);
  }

  function handleCategoryChange(e) {
    var input = e.target.value;
    setCategory(input);
    sortByCategory(input);
    setSort("");
    setSearch("");
  }

  function sortByCategory(val) {
    if (val === "") {
      setListOfProducts(loadedProducts);
    } else {
      var products = [];
      products = loadedProducts.filter(
        (product) => product.category.categoryId === val
      );
      setListOfProducts(products);
    }
    console.log(listOfProducts);
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = listOfProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoadnig) {
    return (
      <section className="text-center">
        <LoadingSpinner />
      </section>
    );
  }

  return (
    <section className="text-center">
      <TextField
        onChange={searchHandler}
        value={search}
        variant="outlined"
        fullWidth
        label="Search"
        className="mt-3 mb-5"
      />
      <div className="row">
        <div className="col-3">
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={handleCategoryChange}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {loadedCategories.map((category) => (
                <MenuItem key={category.id} value={category.categoryId}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="col-9">
          <FormControl className="w-50 mb-3">
            <InputLabel>Sort</InputLabel>
            <Select value={sort} label="Sort" onChange={handleSortChange}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>Name: A to Z</MenuItem>
              <MenuItem value={2}>Name: Z to A</MenuItem>
              <MenuItem value={3}>Price: low to high</MenuItem>
              <MenuItem value={4}>Price: high to low</MenuItem>
            </Select>
          </FormControl>

          {listOfProducts.length > 0 ? (
            <div>
              <p className="display-6">Products:</p>
              <ProductList products={currentProducts} />
            </div>
          ) : (
            <p className="display-6 m-4">No products</p>
          )}
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={listOfProducts.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </section>
  );
}

export default AllProductsPage;
