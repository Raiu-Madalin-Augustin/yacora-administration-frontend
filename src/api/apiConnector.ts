import axios, { AxiosResponse } from "axios";
import { ClientDto } from "../models/clientDto";
import { GetClientsResponse } from "../models/getClientsResponse.ts";
import { API_BASE_URL } from "../../config.ts";
import { GetClientByIdResponse } from "../models/getClientByIdResponse.ts";

const apiConnector = {
  getClients: async (): Promise<ClientDto[]> => {
    try {
      const response: AxiosResponse<GetClientsResponse> = await axios.get(
        `${API_BASE_URL}/clients`
      );

      const clients = response.data.clientDtos.map((client) => ({
        ...client,
        createDate: client.createDate?.slice(0, 10) ?? "",
      }));
      return clients;
    } catch (error) {
      console.log("Error fetching clients", error);
      throw error;
    }
  },

  createClient: async (client: ClientDto): Promise<void> => {
    try {
      await axios.post<number>(`${API_BASE_URL}/clients`, client);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  editClient: async (client: ClientDto): Promise<void> => {
    try {
      await axios.put<number>(`${API_BASE_URL}/clients`, client);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  deleteClient: async (clientId: number): Promise<void> => {
    try {
      await axios.delete<number>(`${API_BASE_URL}/clients/${clientId}`);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getClientById: async (clientId: number): Promise<ClientDto | undefined> => {
    try {
      const response = axios.get<GetClientByIdResponse>(
        `${API_BASE_URL}/clients/${clientId}`
      );

      return (await response).data.clientDto;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default apiConnector;
