import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { StreamChat } from "stream-chat";
import { Chat, Channel } from "stream-chat-react";
import Auth from "./components/Auth";
import MessagingContainer from "./components/MessagingContainer";
import Video from "./components/Video";
import "stream-chat-react/dist/css/index.css";

const client = StreamChat.getInstance(process.env.REACT_APP_API_KEY);

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [channel, setChannel] = useState(null);
  const [users, setUsers] = useState(null);

  const authToken = cookies.Token;

  useEffect(async () => {
    if (authToken) {
      const { users } = await client.queryUsers({ role: "user" });
      setUsers(users);
    }
  }, []);

  const setupClient = async () => {
    try {
      await client.connectUser(
        {
          id: cookies.UserId,
          name: cookies.Name,
          hashedPassword: cookies.HashedPassword,
        },
        authToken
      );

      const channel = await client.channel("livestream", "twitch-gaming", {
        name: "Twitch Gaming",
      });
      setChannel(channel);
    } catch (err) {
      console.log(err);
    }
  };

  if (authToken) setupClient();

  return (
    // prettier-ignore
    <>
      {!authToken && <Auth />}
      {authToken && <Chat client={client} theme="livestream dark">
        <Channel channel={channel}>
          <Video />
          <MessagingContainer users={users} />
        </Channel>
      </Chat>}
    </>
  );
};

export default App;
