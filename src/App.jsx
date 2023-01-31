import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import { emit, listen } from '@tauri-apps/api/event'
import "./App.css";
import {relayInit} from 'nostr-tools';

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  // const [relay, setRelay] = useState(null);
  // const [publicKey, setPublicKey] = useState(
  //   '66a2eec5ef4a0c232c3c7f8720838a446296194742fe001ccb8dbb926b72518b',
  // );
  // const [allEvents, setAllEvents] = useState([]);
  // const [metaData, setMetaData] = useState({
  //   name: '',
  //   display_name: 'Anon',
  //   picture: '',
  //   about: '',
  // });

  useEffect(() => {
    //listen to a event
    listen("event-name", (e) => {
      console.log(e.payload);
    });
  }, [greetMsg]);

  // useEffect(() => {
  //   const connectRelays = async () => {
  //     const relay = relayInit('wss://nostr.relayer.se');
  //     await relay.connect();
  //     relay.on('connect', () => {
  //       setRelay(relay);
  //       console.log(`connected to ${relay.url}`);
  //     });
  //     relay.on('error', () => {
  //       console.log(`failed to connect to ${relay.url}`);
  //     });
  //   };
  //   connectRelays();
  // }, []);

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  // useEffect(() => {
  //   if (relay !== null) {
  //     let sub = relay.sub([
  //       {
  //         authors: [
  //           publicKey,
  //         ],
  //         kinds: [0],
  //       },
  //     ]);
  //     sub.on('event', event => {
  //       if (allEvents.some(e => e.id === event.id)) {
  //         /* event already exists */
  //         console.log('event exist');
  //       } else {
  //         allEvents.push(event);
  //         console.log(event);
  //         const content = JSON.parse(event.content);
  //         setMetaData(content);
  //       }
  //     });
  //   } else {
  //     console.log('no relay');
  //   }
  // }, [relay]);

  return (
    <div className="container">
      <h1>Welcome to mnemonic!</h1>
      Input your public key below to generate your username
      <div className="row">
        <div>
          <input
            id="greet-input"
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Enter your pubkey..."
          />
          <button type="button" onClick={() => greet()}>
            Load name
          </button>
        </div>
      </div>

      <p>{greetMsg}</p>
      {/* <p>{metaData.display_name}</p> */}
    </div>
  );
}

export default App;
