import axios from "axios";
import { FormEvent, useEffect, useState } from "react";

const AddContact: React.FC = () => {
  // States
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isError, setIsError] = useState<AddingError>({
    error: false,
    message: "",
  });
  // Effect on save
  useEffect(() => {
    let timeoutID: NodeJS.Timeout;
    if (isSaved) {
      timeoutID = setTimeout(() => {
        setIsSaved(false);
      }, 1500);
    }
    return () => {
      if (timeoutID) {
        clearTimeout(timeoutID);
      }
    };
  }, [isSaved]);
  // Effect on error
  useEffect(() => {
    let timeoutID: NodeJS.Timeout;
    if (isError.error) {
      timeoutID = setTimeout(() => {
        setIsError({ error: false, message: "" });
      }, 1500);
    }
    return () => {
      if (timeoutID) {
        clearTimeout(timeoutID);
      }
    };
  }, [isError]);
  /** Handles submit and the responses from api. */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/contact`,
        {
          fullname,
          phone,
          description,
        }
      );
      if (response.status === 201) setIsSaved(true);
      clearInputs();
    } catch (error) {
      setIsError({
        error: true,
        message: "Server error! Please try again later",
      });
    }
  };
  /** Handles input changes and removing error message */
  const handleChange = (
    val: string,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setIsError({ error: false, message: "" });
    setter(val.trim());
  };
  /** Clears all inputs */
  const clearInputs = () => {
    setFullname("");
    setPhone("");
    setDescription("");
  };
  // JSX
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fullname">Full Name *</label>
        <input
          type="text"
          name="fullname"
          id="fullname"
          required
          value={fullname}
          onChange={(e) => handleChange(e.target.value, setFullname)}
        />
      </div>
      <div>
        <label htmlFor="phone">Phone *</label>
        <input
          type="text"
          name="phone"
          id="phone"
          required
          value={phone}
          onChange={(e) => handleChange(e.target.value, setPhone)}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={(e) => handleChange(e.target.value, setDescription)}
        />
      </div>
      <button type="submit">Save</button>
      {isSaved && <span className="text-green-700">Saved!</span>}
    </form>
  );
};

export default AddContact;
