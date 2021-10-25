import { useEffect, useState } from "react";
import axios from "axios";
import ContactsList from "./components/ContactsList";

const App: React.FC = () => {
  //State
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  // On load get data from api
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
    <main className="flex flex-col justify-flex-start items-center h-screen w-screen relative">
      <ContactsList data={contacts} />
    </main>
  );
};

export default App;
