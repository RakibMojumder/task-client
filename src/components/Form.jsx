import { Checkbox, Input, Option, Select } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const Form = ({ refetch }) => {
  const [sector, setSector] = useState("");
  const [sectorError, setSectorError] = useState("");
  const [isAgree, setIsAgree] = useState(false);

  const { data: sectors, isLoading } = useQuery(["sectors"], async () => {
    const res = await axios.get("https://task-server-chi.vercel.app/sectors");
    return res.data.data;
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (sector === "") {
      return setSectorError("Sector is required");
    }

    axios
      .post("https://task-server-chi.vercel.app/users", {
        name: data.name,
        sector,
        isAgree: data.isAgree,
      })
      .then((res) => {
        refetch();
        reset();
        toast.success("Successfully become a user");
        console.log(res);
      });
  };

  if (isLoading) {
    return;
  }

  return (
    <div className="md:p-10 lg:p-20">
      <div className="p-5 lg:p-10 border rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold uppercase text-gray-800 text-center mb-4">
          Become a user
        </h1>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="input-field">
              <Input
                label="Your Name"
                name="name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div className="input-field">
              <Select label="Select Sector">
                {sectors?.map((sector) => (
                  <Option
                    key={sector._id}
                    value={sector.sector}
                    onClick={(e) => {
                      setSector(e.target.innerText);
                      setSectorError("");
                    }}
                  >
                    {sector.sector}
                  </Option>
                ))}
              </Select>
              <p className="text-red-500 text-sm">{sectorError}</p>
            </div>

            <div className="input-field">
              <Checkbox
                id="ripple-on"
                className="text-gray-900 font-bold"
                label="Agree to the terms and conditions"
                ripple={true}
                onClick={(e) => setIsAgree(e.target.checked)}
              />
            </div>
            <button
              type="submit"
              disabled={isAgree ? false : true}
              className={` px-10 py-1 text-white rounded-full ${
                isAgree ? "bg-blue-500" : "bg-blue-200"
              }`}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
