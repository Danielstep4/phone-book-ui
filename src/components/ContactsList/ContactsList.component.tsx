import { ChangeEvent, FormEvent, useState } from "react";
import AddContact from "../AddContact";
import Contact from "../Contact";

const ContactsList: React.FC<ContactsListProps> = ({ data }) => {
  const [displayData, setDisplayData] = useState<Contact[]>(data);
  const [fullname, setFullname] = useState("");
  const [addContact, setAddContact] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (fullname) {
      setDisplayData(
        data.filter((contact) =>
          contact.fullname.toLowerCase().includes(fullname.trim().toLowerCase())
        )
      );
    }
  };
  const handleChangeFullname = (e: ChangeEvent<HTMLInputElement>) => {
    const newFullname = e.target.value;
    if (!newFullname) setDisplayData(data);
    setFullname(newFullname);
  };
  const toggleAddContactModal = () => setAddContact(!addContact);
  return (
    <>
      <section className="box-shadow-2xl sm:w-1/2 w-screen sm:p-0 px-2">
        <form className="flex border" onSubmit={handleSubmit}>
          <input
            name="fullname"
            placeholder="Search by full name"
            value={fullname}
            className="p-2 w-full"
            onChange={handleChangeFullname}
            maxLength={32}
          />
          <button type="submit" className="bg-black p-2 rounded">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              enableBackground="new 0 0 512 512"
              className="w-5 stroke-current stroke-2 fill-current text-white"
            >
              <g>
                <path d="m495,466.1l-119.2-119.2c29.1-35.5 46.5-80.8 46.5-130.3 0-113.5-92.1-205.6-205.6-205.6-113.6,0-205.7,92.1-205.7,205.7s92.1,205.7 205.7,205.7c49.4,0 94.8-17.4 130.3-46.5l119.1,119.1c8,8 20.9,8 28.9,0 8-8 8-20.9 0-28.9zm-443.2-249.4c-1.42109e-14-91 73.8-164.8 164.8-164.8 91,0 164.8,73.8 164.8,164.8s-73.8,164.8-164.8,164.8c-91,0-164.8-73.8-164.8-164.8z" />
              </g>
            </svg>
          </button>
        </form>
        {displayData.length
          ? displayData.map((contact) => (
              <Contact contact={contact} key={contact._id} />
            ))
          : "Not Found"}
        <button
          className="bg-black text-white text-lg rounded p-2 text-center w-full"
          onClick={toggleAddContactModal}
        >
          Add Contact
        </button>
      </section>
      {addContact && <AddContact toggler={toggleAddContactModal} />}
    </>
  );
};

export default ContactsList;

interface ContactsListProps {
  data: Contact[];
}
