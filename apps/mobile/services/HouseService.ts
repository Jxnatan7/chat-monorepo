import axiosClient from '../lib/axiosClient';

export default class HouseService {
  api = axiosClient;

  static async findByProviderId(providerId: string) {
    const response = await axiosClient.get(`/houses/provider/${providerId}`);
    return response.data;
  }
}
