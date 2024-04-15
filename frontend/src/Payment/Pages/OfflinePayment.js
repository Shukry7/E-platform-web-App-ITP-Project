import React, { useState } from "react";
import axios from "axios";

import ImageUpload from "../../Shared/Components/FormElements/ImageUpload";
import Button from "../../Shared/Components/FormElements/Button";
import { useForm } from "../../Shared/hooks/form-hook";
import { useNavigate } from "react-router-dom";
import Loader from "../../Shared/Components/UiElements/Loader";


const ProductForm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formState, inputHandler] = useForm(
    {
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
    console.log(formState.inputs)
    const formData = new FormData();
    formData.append('image',formState.inputs.image.value);

    axios
      .post("http://localhost:5000/offpay/new", formData)
      .then((res) => {
        setLoading(false);
        navigate("/offpay/");
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
        <Loader />
      ) : (
        <>
          <div class="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
            <div class="container mx-auto">
              <div>
                <h2 class="font-semibold text-xl text-gray-600 text-center">Add Product</h2>
                <p class="text-gray-500 mb-6 text-center">Enter Product details below !!</p>
                <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                  <div class="grid gap-1 gap-y-2text-sm grid-cols-1 lg:grid-cols-3">
                  <div class="text-gray-600 flex justify-center items-center">
                    
                      <ImageUpload center id="image" onInput={inputHandler} />
                      </div>
                    <div class="md:col-span-5 text-right">
                          <div class="inline-flex items-end">
                            <Button
                              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              type="submit"
                              disabled={!formState.isValid}
                            >
                              Submit
                            </Button>
                            </div>
                        </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
        </>
      )}
    </form>
  );
};

export default ProductForm;


