import { IUser } from "../../../server/src/database/user.types";
import localforage from "localforage";

export const userStore = localforage.createInstance({
    name: "user store",
});

export async function setUserInLocalCache(
    user: IUser,
): Promise<IUser | undefined> {
    await userStore.setItem(user.user_id.toString(), user);
    return user;
}
