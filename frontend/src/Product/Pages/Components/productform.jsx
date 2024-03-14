import React, { useState } from "react";
import axios from "axios";
import Input from "../../../Shared/Components/FormElements/input";
import Dropdown from "../../../Shared/Components/FormElements/Dropdown";
import ImageUpload from "../../../Shared/Components/FormElements/ImageUpload";
import Button from "../../../Shared/Components/FormElements/Button";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MIN,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../Shared/Components/util/validate";
import { useForm } from "../../../Shared/hooks/form-hook";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Shared/Components/UiElements/Loader";

const Category = [
  { value: "...." },
  { value: "Aluminium Bars" },
  { value: "Aluminium Accessories" },
  { value: "Boards" },
  { value: "House Accessories" },
  { value: "Pentry Accessories" },
  { value: "Locks" },
  { value: "Other" },
];

const ProductForm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      category: {
        value: "",
        isValid: false,
      },
      price: {
        value: "",
        isValid: false,
      },
      weight: {
        value: "",
        isValid: false,
      },
      quantity: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: true,
      },
    },
    false
  );

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:5000/product/new", {
        id: 1,
        name: formState.inputs.name.value,
        description: formState.inputs.description.value,
        category: formState.inputs.category.value,
        price: formState.inputs.price.value,
        weight: formState.inputs.weight.value,
        quantity: formState.inputs.quantity.value,
      })
      .then((res) => {
        setLoading(false);
        navigate("/Product/");
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
    console.log(formState);
  };

  return (
    <form onSubmit={submitHandler}>
      {loading ? (
        <Loader/>
      ) : (
        <>
          <h2 style={{ textAlign: "center" }}>Add Product</h2>
          <ImageUpload center id="image" onInput={inputHandler} />
          <Input
            element="Input"
            id="name"
            type="text"
            placeholder="Enter Product Name"
            label="Name :"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter a Name."
            onInput={inputHandler}
          />
          <Dropdown
            id="category"
            options={Category}
            onInput={inputHandler}
            Display=""
            label="Category:"
          />
          <Input
            id="description"
            type="text"
            placeholder="Enter Description"
            label="Description :"
            validators={[VALIDATOR_MINLENGTH(5), VALIDATOR_MAXLENGTH(250)]}
            errorText="Please Enter a Description (5 - 250 words)"
            onInput={inputHandler}
          />
          <Input
            element="Input"
            id="price"
            type="number"
            placeholder="Enter Price"
            label="Selling Price :"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
            errorText="Please Enter a price."
            onInput={inputHandler}
          />
          <Input
            element="Input"
            id="weight"
            type="number"
            placeholder="Enter Weight of product"
            label="Weight :"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
            errorText="Please Enter a Weight."
            onInput={inputHandler}
          />
          <Input
            element="Input"
            id="quantity"
            type="number"
            placeholder="Enter Quantity"
            label="Alert Quantity :"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
            errorText="Please Enter a Quantity."
            onInput={inputHandler}
          />
          <Button
            type="submit"
            style={{ left: "76%", position: "relative" }}
            disabled={!formState.isValid}
          >
            Add
          </Button>
        </>
      )}
    </form>
  );
};

export default ProductForm;
export { Category };
