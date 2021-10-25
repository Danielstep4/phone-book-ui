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
    <main className="flex flex-col justify-flex-start items-center h-screen w-screen">
      <h1 className="font-bold text-3xl my-10">Phone Book Manager</h1>
      <ContactsList data={contacts} />
    </main>
  );
};

export default App;
