import { axiosClient } from "./axiosClient";

export interface ProfileResponse {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role?: string;
}

/**
 * Fetch logged-in user profile
 */
export const getProfile = async (): Promise<ProfileResponse> => {
  try {
    const res = await axiosClient.get("/auth/me");
    return res.data.data;
  } catch (err: any) {
    console.error("❌ Error fetching profile:", err?.response?.data || err);
    throw err;
  }
};

