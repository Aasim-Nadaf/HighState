import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";

export const config = {
  platform: "com.highstate",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
};

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setPlatform(config.platform!)
  .setProject(config.projectId!);

export const avatar = new Avatars(client);
export const account = new Account(client);

export async function login() {
  try {
    const redirectUrl = Linking.createURL("/");
    const response = account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUrl
    );

    if (!response) throw new Error("Failed to login");

    const browserResult = await WebBrowser.openAuthSessionAsync(
      response.toString(),
      redirectUrl
    );

    if (browserResult.type !== "success") throw new Error("Failed to login");

    const url = new URL(browserResult.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();

    if (!secret || !userId) throw new Error("Failed to get Secret and UserId");

    const session = await account.createSession(userId, secret);

    if (!session) throw new Error("Failed to create session");

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function Logout() {
  try {
    await account.deleteSession("current");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getUser() {
  try {
    const response = await account.get();
    if (response.$id) {
      const userAvatar = avatar.getInitialsURL(response.name);

      return {
        ...response,
        avatar: userAvatar.toString(),
      };
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
