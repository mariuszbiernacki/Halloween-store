import React, { useContext } from "react";
import StoreContext from "../../contexts/StoreContext/StoreContext";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import styled from "styled-components";

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FilterBigDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const FilterDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

const FilterButton = styled.button`
  margin: 10px;
  padding: 12px 20px;
  background-color: blue;
  color: white;
  outline: none;
  border-radius: 20px;
  cursor: pointer;
`;

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
}));

const FilterMenu = () => {
  const classes = useStyles();
  const value = useContext(StoreContext);
  const {
    filterVisibility,
    seeFilters,
    categoryList,
    filterProductsByCategory,
    price,
    maxPrice,
    filterProductsByPrice,
    filterProductsByName,
    filterProductsByDelivery,
    freeDelivery,
  } = value;

  return (
    <>
      {filterVisibility === true ? (
        <FilterContainer>
          <FilterButton onClick={seeFilters}>hide filters</FilterButton>
          <FilterBigDiv>
            <FilterDiv>
              <label htmlFor="priceCategory">
                price: <span>{price} PLN</span>
              </label>
              <input
                onChange={filterProductsByPrice}
                type="range"
                name="priceCategory"
                id="priceCategory"
                min="0"
                max={maxPrice}
              />
            </FilterDiv>
            <FilterDiv>
              <label htmlFor="nameCategory">name</label>
              <input
                onChange={filterProductsByName}
                type="text"
                name="nameCategory"
                id="nameCategory"
                placeholder="name"
              />
            </FilterDiv>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">category</InputLabel>
              <Select
                name="category"
                id="category"
                onChange={filterProductsByCategory}
              >
                <MenuItem value={"all"}>all categories</MenuItem>
                {categoryList.map((category) => {
                  return <MenuItem value={category}>{category}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <FilterDiv>
              <input
                onChange={filterProductsByDelivery}
                type="checkbox"
                name="delivery-category"
                id="delivery-category"
                checked={freeDelivery ? true : false}
              />
              <label htmlFor="delivery-category">free delivery</label>
            </FilterDiv>
          </FilterBigDiv>
        </FilterContainer>
      ) : (
        <FilterContainer>
          <FilterButton onClick={seeFilters}>see filters</FilterButton>
        </FilterContainer>
      )}
    </>
  );
};

export default FilterMenu;
