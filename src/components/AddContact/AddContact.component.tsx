import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { verifyPhone } from "../../utils/verifyPhone";

const AddContact: React.FC<AddContactProps> = ({ toggler }) => {
  // States
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState<AddingError>({
    isError: false,
    message: "",
  });
  // Effect on save
  useEffect(() => {
    let timeoutID: NodeJS.Timeout;
    if (isSaved) {
      timeoutID = setTimeout(() => {
        setIsSaved(false);
        toggler();
      }, 500);
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
    if (error.isError) {
      timeoutID = setTimeout(() => {
        setError({ isError: false, message: "" });
      }, 1500);
    }
    return () => {
      if (timeoutID) {
        clearTimeout(timeoutID);
      }
    };
  }, [error]);
  /** Handles submit and the responses from api. */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!verifyPhone(phone))
      setError({ isError: true, message: "Please provide a phone number." });
    else if (!fullname.trim())
      setError({ isError: true, message: "Please provide a full name" });
    else {
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
        setError({
          isError: true,
          message: "Server error! Please try again later",
        });
      }
    }
  };
  /** Handles input changes and removing error message */
  const handleChange = (
    val: string,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setError({ isError: false, message: "" });
    setter(val);
  };
  /** Clears all inputs */
  const clearInputs = () => {
    setFullname("");
    setPhone("");
    setDescription("");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        onReset={clearInputs}
        className="absolute flex flex-col z-20 border bg-white sm:p-10 p-2 sm:w-1/3 mt-24 w-screen shadow-2xl rounded"
      >
        <AddContactInput
          title="Full Name"
          required
          id="fullname"
          value={fullname}
          setter={setFullname}
          handleChange={handleChange}
        />
        <AddContactInput
          title="Phone"
          required
          id="phone"
          value={phone}
          setter={setPhone}
          handleChange={handleChange}
        />
        <AddContactInput
          title="Description"
          id="description"
          value={description}
          setter={setDescription}
          handleChange={handleChange}
        />
        {error.isError && (
          <span className="block bg-red-700 text-white px-3 py-1 rounded">
            {error.message}
          </span>
        )}
        {isSaved && (
          <span className="block bg-green-700 text-white px-3 py-1 rounded">
            Saved!
          </span>
        )}
        <div className="flex flex-col sm:flex-row">
          <button
            type="submit"
            className="bg-black text-white w-full rounded mt-4 p-1 sm:mr-2 hover:bg-gray-600"
          >
            Save
          </button>
          <button
            type="reset"
            onClick={toggler}
            className="bg-red-700 text-white w-full rounded sm:mt-4 mt-1 p-1 hover:bg-red-500"
          >
            Cancel
          </button>
        </div>
      </form>
      <div
        className="bg-black opacity-60 fixed top-0 left-0 z-10 w-screen h-screen cursor-pointer"
        onClick={toggler}
      ></div>
    </>
  );
};

const AddContactInput: React.FC<AddContactInputProps> = ({
  value,
  title,
  required,
  id,
  handleChange,
  setter,
}) => {
  return (
    <div className="mb-3 flex sm:flex-row flex-col sm:items-center items-flex-start justify-between">
      <label htmlFor={id}>
        {title}
        {required ? " *" : ""}
      </label>
      <input
        type="text"
        name={id}
        id={id}
        className="border-2 sm:ml-2 w-full sm:w-3/4 p-1"
        required={required}
        value={value}
        maxLength={32}
        onChange={(e) => handleChange(e.target.value, setter)}
      />
    </div>
  );
};

export default AddContact;

interface AddContactProps {
  toggler: () => void;
}

interface AddContactInputProps {
  value: string;
  title: string;
  required?: boolean;
  id: string;
  handleChange: (
    val: string,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => void;
  setter: React.Dispatch<React.SetStateAction<string>>;
}

interface AddingError {
  isError: boolean;
  message: string;
}
