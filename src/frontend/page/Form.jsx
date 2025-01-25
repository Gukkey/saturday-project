import React, { useState } from "react";
import Input from "../components/Input";
import axios from "axios";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
  });

  async function postForm() {
    try {
      await axios.post("http://localhost:8080/api/post/form", formData, {
        headers: {
          "Content-Type": "application/json", // Ensure the content type is set to JSON
        },
      });
    } catch (err) {
      console.log("err", err);
    }
  }

  return (
    <div className="h-screen w-screen">
      <form
        className="flex items-center justify-center w-full h-full rounded"
        onSubmit={() => postForm()}
      >
        <div className="flex flex-col gap-2 p-4 bg-slate-200">
          <Input
            name="name"
            label="Name *"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            name="address"
            label="Address *"
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
          <button className="bg-slate-600 text-white p-1 rounded">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
