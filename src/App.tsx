import { useEffect, useState } from "react";
import axios from "axios";
import ContactsList from "./components/ContactsList";
import AddContact from "./components/AddContact";

const App: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/contacts`)
      .then((response) => {
        if (response.status === 200 && response.data) {
          const data = response.data as Contact[];
          setContacts(data);
        }
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <>Loading...</>;
  if (isError) return <>Error...</>;
  return (
    <>
      <AddContact />
      <ContactsList data={contacts} />
    </>
  );
};

export default App;
