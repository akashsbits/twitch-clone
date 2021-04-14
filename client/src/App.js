import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { StreamChat } from "stream-chat";
import { Chat, Channel } from "stream-chat-react";
import Auth from "./components/Auth";
import MessagingContainer from "./components/MessagingContainer";
import Video from "./components/Video";
import "stream-chat-react/dist/css/index.css";

const client = StreamChat.getInstance("fgdbgjzw6abd");

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [channel, setChannel] = useState(null);

  const authToken = cookies.Token;

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
          <MessagingContainer />
        </Channel>
      </Chat>}
    </>
  );
};

export default App;
