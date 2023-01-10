import { useState, useEffect } from "react";
import { APIEndpoint, ENDPOINTS } from "../api";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ProductList from "../components/products/ProductList";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Pagination from "../components/ui/Pagination";

function AllProductsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [loadedCategories, setLoadedCategories] = useState([]);
  const [loadedBrands, setLoadedBrands] = useState([]);
  const [listOfProducts, setListOfProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    setIsLoading(true);
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
        setLoadedProducts(products);
        setListOfProducts(products);

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
            setLoadedCategories(categories);

            APIEndpoint(ENDPOINTS.brands)
              .getAll("")
              .then((response) => {
                return response.data;
              })
              .then((data) => {
                const brands = [];
                for (const key in data) {
                  const brand = {
                    id: key,
                    ...data[key],
                  };
                  brands.push(brand);
                }
                setLoadedBrands(brands);
                setIsLoading(false);
              });
          });
      });
  }, []);

  useEffect(() => {
    let products = loadedProducts;
    if (search !== "") {
      products = [];
      for (var i in loadedProducts) {
        if (
          loadedProducts[i].name.toLowerCase().includes(search) ||
          loadedProducts[i].description.toLowerCase().includes(search)
        ) {
          products.push(loadedProducts[i]);
        }
      }
    }
    if (category !== "") {
      products = products.filter(
        (product) => product.category.categoryId === category
      );
    }
    if (brands.length > 0) {
      const p = [];
      for (var j in products) {
        if (brands.includes(String(products[j].brandId))) {
          p.push(products[j]);
        }
      }
      products = p;
    }
    paginate(1);
    setListOfProducts(products);
  }, [search, category, brands, loadedProducts]);

  const searchHandler = (e) => {
    var input = e.target.value.toLowerCase();
    setSearch(input);
    setSort("");
  };

  const handleSortChange = (e) => {
    var input = e.target.value;
    setSort(input);
    sortList(input);
  };

  const handleCategoryChange = (e) => {
    var input = e.target.value;
    setCategory(input);
    setSort("");
  };

  const handleBrandsChange = (e) => {
    var input = e.target.value;
    if (!e.target.checked) {
      const b = [];
      for (var i in brands) {
        if (brands[i] !== input) {
          b.push(brands[i]);
        }
      }
      setBrands(b);
    } else {
      setBrands([...brands, input]);
    }
    setSort("");
  };

  const sortList = (e) => {
    if (e === 1) {
      listOfProducts.sort((a, b) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
      );
    }
    if (e === 2) {
      listOfProducts.sort((a, b) =>
        a.name < b.name ? 1 : b.name < a.name ? -1 : 0
      );
    }
    if (e === 3) {
      listOfProducts.sort((a, b) => a.cost - b.cost);
    }
    if (e === 4) {
      listOfProducts.sort((a, b) => b.cost - a.cost);
    }
  };
  const itemsPerPageHandler = (e) => {
    var input = e.target.value;
    setProductsPerPage(input);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = listOfProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) {
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

          <FormGroup className="mt-5">
            <FormLabel className="text-dark">Brands:</FormLabel>
            {loadedBrands.map((brand) => (
              <FormControlLabel
                control={<Checkbox />}
                label={brand.name}
                onChange={handleBrandsChange}
                key={brand.id}
                value={brand.brandId}
              />
            ))}
          </FormGroup>
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
          <div className="row">
            <div className="col-10">
              <Pagination
                itemsPerPage={productsPerPage}
                totalItems={listOfProducts.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>
            <div className="col-2  text-center">
              <FormControl fullWidth>
                <InputLabel>Items/page</InputLabel>
                <Select
                  style={{ height: "40px" }}
                  value={productsPerPage}
                  label="Items/page"
                  onChange={itemsPerPageHandler}
                >
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AllProductsPage;
