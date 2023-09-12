import { IGetEquipmentRequest } from "../interfaces/equipment-interface";
import { ApiClient } from "./api-clients";

export const createEquipment = async (payload: any) => {
  const response = await ApiClient.post(`/equipment/create`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const updateEquipment = async (payload: any) => {
  const response = await ApiClient.post(
    `/equipment/update/${payload.id}`,
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const getEquipment = async (payload?: IGetEquipmentRequest) => {
  if (payload) {
    const response = await ApiClient.get(
      `/equipment/equipments-by-page?pageNo=${payload.pageNo}&pageSize=${
        payload.pageSize
      }&name=${payload.name || ""}`
    );
    return response.data;
  } else {
    const response = await ApiClient.get(`/equipment/equipments`);
    return response.data;
  }
};

export const deleteEquipment = async (payload: number) => {
  const response = await ApiClient.delete(`/equipment/delete`, {
    data: { ids: [payload] },
  });

  return response.data;
};
