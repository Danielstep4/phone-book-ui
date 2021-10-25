import axios from "axios";
import { FormEvent, useState } from "react";

const AddContact: React.FC = () => {
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");

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
      if (response.status === 201) console.log("saved");
      else console.log("fail");
    } catch (e) {
      console.error(e);
    }
  };
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
          onChange={(e) => setFullname(e.target.value)}
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
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default AddContact;
