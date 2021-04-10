import React, { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat, Channel } from "stream-chat-react";
import Auth from "./components/Auth";
import MessagingContainer from "./components/MessagingContainer";
import Video from "./components/Video";
import "stream-chat-react/dist/css/index.css";

const client = StreamChat.getInstance("fgdbgjzw6abd");

const App = () => {
  const [clientReady, setClientReady] = useState(false);
  const [channel, setChannel] = useState(null);

  const authToken = false;

  useEffect(() => {
    const setupClient = async () => {
      try {
        await client.connectUser(
          {
            id: "akash-srivastava",
            name: "Akash Srivastava",
          },
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWthc2gtc3JpdmFzdGF2YSJ9.xV8nMDDDDCW2EnjdJmkAEDhxUMwXV4CO3_VF8ghODj4"
        );

        const channel = await client.channel("livestream", "twitch-gaming", {
          name: "Twitch Gaming",
        });
        setChannel(channel);

        setClientReady(true);
      } catch (err) {
        console.log(err);
      }
    };

    setupClient();
  }, []);

  if (!clientReady) return null;

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
