import Contact from "../Contact";

const ContactsList: React.FC<ContactsListProps> = ({ data }) => {
  return (
    <>
      {data.length
        ? data.map((contact) => <Contact contact={contact} key={contact._id} />)
        : "No Contacts, please add one"}
    </>
  );
};

export default ContactsList;

interface ContactsListProps {
  data: Contact[];
}
