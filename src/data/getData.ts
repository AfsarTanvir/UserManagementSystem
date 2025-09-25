import data from "./users.json";
import type { UserData } from "../models/interfaces";

export async function getData(): Promise<UserData> {
  return await data;
}
