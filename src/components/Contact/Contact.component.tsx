const Contact: React.FC<ContactProps> = ({ contact }) => {
  return (
    <div className="flex flex-col border p-2">
      <div className="flex mb-1">
        <span className="font-bold mr-2">{contact.fullname}</span>
        <span>{contact.phone}</span>
      </div>
      <p className="text-gray-500 text-sm">
        {contact.description || "No description"}
      </p>
    </div>
  );
};

export default Contact;

interface ContactProps {
  contact: Contact;
}
