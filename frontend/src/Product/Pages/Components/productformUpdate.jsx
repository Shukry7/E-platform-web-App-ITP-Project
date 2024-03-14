/* eslint-disable react-hooks/rules-of-hooks */
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
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "../../../Shared/hooks/form-hook";

const ProductformUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const Category = [
    { value: "Aluminium Bars" },
    { value: "Aluminium Accessories" },
    { value: "Boards" },
    { value: "House Accessories" },
    { value: "Pentry Accessories" },
    { value: "Locks" },
    { value: "Other" },
  ];
  const [loading, setLoading] = useState(false);
  const [formState, inputHandler, setFormData] = useForm(
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
        isValid: true,
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

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/product/update/${id}`)
      .then((res) => {
        setFormData(
          {
            name: {
              value: res.data.name,
              isValid: true,
            },
            description: {
              value: res.data.description,
              isValid: true,
            },
            category: {
              value: res.data.category,
              isValid: true,
            },
            price: {
              value: res.data.price,
              isValid: true,
            },
            weight: {
              value: res.data.weight,
              isValid: true,
            },
            quantity: {
              value: res.data.quantity,
              isValid: true,
            },
            image: {
              value: null,
              isValid: true,
            },
          },
          true
        );
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id, setFormData]);

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .put(`http://localhost:5000/product/update/${id}`, {
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
        <h1> LOADING...</h1>
      ) : (
        <>
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
            initialValue={formState.inputs.name.value}
          />
          <Dropdown
            id="category"
            options={Category}
            onInput={inputHandler}
            Display=""
            label="Category:"
            initialValue={formState.inputs.category.value}
          />
          <Input
            id="description"
            type="text"
            placeholder="Enter Description"
            label="Description :"
            validators={[VALIDATOR_MINLENGTH(5), VALIDATOR_MAXLENGTH(250)]}
            errorText="Please Enter a Description (5 - 250 words)"
            onInput={inputHandler}
            initialValue={formState.inputs.description.value}
          />
          <Input
            element="Input"
            id="price"
            type="number"
            placeholder="Enter Price"
            label="Price :"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
            errorText="Please Enter a price."
            onInput={inputHandler}
            initialValue={formState.inputs.price.value}
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
            initialValue={formState.inputs.weight.value}
          />
          <Input
            element="Input"
            id="quantity"
            type="number"
            placeholder="Enter Quantity"
            label="Quantity :"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
            errorText="Please Enter a Quantity."
            onInput={inputHandler}
            initialValue={formState.inputs.quantity.value}
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

export default ProductformUpdate;
