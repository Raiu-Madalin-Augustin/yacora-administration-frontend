import { Button } from "semantic-ui-react";
import { ClientDto } from "../../models/clientDto";
import apiConnector from "../../api/apiConnector";

interface Props {
  client: ClientDto;
}

export default function ClientTableItem({ client }: Props) {
  return (
    <>
      <tr className="center aligned">
        <td data-label="Id">{client.id}</td>
        <td data-label="Name">{client.name}</td>
        <td data-label="Email">{client.email}</td>
        <td data-label="Mobile">{client.mobile}</td>
        <td data-label="CreateDate">{client.createDate}</td>
        <td data-label="Action">
          <Button color="yellow" type="submit">
            Edit
          </Button>
          <Button
            type="button"
            negative
            onClick={async () => {
              await apiConnector.deleteClient(client.id!);
              window.location.reload();
            }}
          >
            Delete
          </Button>
        </td>
      </tr>
    </>
  );
}
