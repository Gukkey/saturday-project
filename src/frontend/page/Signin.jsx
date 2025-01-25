import React, { useState } from "react";
import Input from "../components/Input";
import axios from "axios";

function Signin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  async function postData(e) {
    e.preventDefault();
    try {
      const request = await axios.post(
        `http://localhost:8080/api/auth`,
        formData,
        {
          headers: {
            "Content-Type": "application/json", // Ensure the content type is set to JSON
          },
        }
      );
    } catch (err) {
      console.log("err", err);
    }
  }

  return (
    <div className="h-screen w-screen">
      <form
        className="flex items-center justify-center w-full h-full rounded"
        onSubmit={postData}
      >
        <div className="flex flex-col gap-2 p-4 bg-slate-200">
          <Input
            name="username"
            label="Username*"
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className="flex-col"
          />
          <Input
            name="password"
            label="Password *"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="flex-col"
          />
          <button className="bg-slate-600 text-white p-1 rounded">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signin;
