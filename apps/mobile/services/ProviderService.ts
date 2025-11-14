import axiosClient from '../lib/axiosClient';

export default class ProviderService {
  api = axiosClient;

  static async findByCode(code: string) {
    const response = await axiosClient.get(`/providers/code/${code}`);
    return response.data;
  }
}
