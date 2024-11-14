import { useEffect, useState } from "react";
import { ClientDto } from "../../models/clientDto";
import apiConnector from "../../api/apiConnector";
import { Button, Container } from "semantic-ui-react";
import ClientTableItem from "./ClientTableItem";

export default function ClientTable() {
  const [clients, setClients] = useState<ClientDto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchClients = await apiConnector.getClients();
      setClients(fetchClients);
    };

    fetchData();
  }, []);

  return (
    <>
      <Container className="container-style">
        <table className="ui inverted table">
          <thead style={{ textAlign: "center" }}>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>CreateDate</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {clients.length !== 0 &&
              clients.map((client, index) => (
                <ClientTableItem key={index} client={client} />
              ))}
          </tbody>
        </table>
        <Button
          floated="right"
          type="button"
          content="Create Client"
          positive
        />
      </Container>
    </>
  );
}
