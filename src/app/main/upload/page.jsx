"use client";
import { useState } from "react";
import { Poppins, Inter } from "next/font/google";
import axios from "axios"


const allAgent = [
  { name: "astra", uuid: "41fb69c1-4189-7b37-f117-bcaf1e96f1bf" },
  { name: "breach", uuid: "5f8d3a7f-467b-97f3-062c-13acf203c006" },
  { name: "brimstone", uuid: "9f0d8ba9-4140-b941-57d3-a7ad57c6b417" },
  { name: "chamber", uuid: "22697a3d-45bf-8dd7-4fec-84a9e28c69d7" },
  { name: "cypher", uuid: "117ed9e3-49f3-6512-3ccf-0cada7e3823b" },
  { name: "deadlock", uuid: "cc8b64c8-4b25-4ff9-6e7f-37b4da43d235" },
  { name: "fade", uuid: "dade69b4-4f5a-8528-247b-219e5a1facd6" },
  { name: "gekko", uuid: "e370fa57-4757-3604-3648-499e1f642d3f" },
  { name: "harbor", uuid: "95b78ed7-4637-86d9-7e41-71ba8c293152" },
  { name: "jett", uuid: "add6443a-41bd-e414-f6ad-e58d267f4e95" },
  { name: "kayo", uuid: "601dbbe7-43ce-be57-2a40-4abd24953621" },
  { name: "killjoy", uuid: "1e58de9c-4950-5125-93e9-a0aee9f98746" },
  { name: "neon", uuid: "bb2a4828-46eb-8cd1-e765-15848195d751" },
  { name: "omen", uuid: "8e253930-4c05-31dd-1b6c-968525494517" },
  { name: "phonix", uuid: "eb93336a-449b-9c1b-0a54-a891f7921d69" },
  { name: "raze", uuid: "f94c3b30-42be-e959-889c-5aa313dba261" },
  { name: "reyna", uuid: "a3bfb853-43b2-7238-a4f1-ad90e9e46bcc" },
  { name: "sage", uuid: "569fdd95-4d10-43ab-ca70-79becc718b46" },
  { name: "sky", uuid: "6f2a04ca-43e0-be17-7f36-b3908627744d" },
  { name: "sova", uuid: "320b2a48-4d9b-a075-30f1-1f93a9b638fa" },
  { name: "viper", uuid: "707eab51-4836-f488-046a-cda6bf494859" },
  { name: "yoru", uuid: "7f94d92c-4234-0a36-9646-3a87eb8b5c89" },
];

const poppins = Poppins({
  subsets: ["latin"],
  weight: "800",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  weight: "500",
});

export default function Page() {
  const [page, setPage] = useState(1);
  const [agent, setAgent] = useState("");
  const [dataAgent, setDataAgent] = useState(null);
  const [ability, setAbility] = useState("");
  const [map, setMap] = useState("");

  const selectAgentHandle = async (e) => {
    axios.get(`https://valorant-api.com/v1/agents/${e.target.id}`).then((response) => {
      setDataAgent(response.data)
    })
    console.log(e.target.id)
    setAgent(e.target.alt)
  };

  const handleClick1 = () => {
    if(!agent && !ability){
      return alert("pilih agent dan ability")
    }
  }

  return (
    <div className="py-[100px]">
      {page === 1 && (
        <div className="w-full relative py-[100px]">

          <h1
            className={`${poppins.className} text-[2rem] uppercase text-white text-center`}
          >
            select agent & ability
          </h1>

          <div className="flex flex-wrap gap-[5px] pt-[90px] w-[70%] mx-auto justify-center">
            {allAgent.map((e, index) => {
              return (
                <div
                  className={`w-[60px] relative z-[10] ${
                    agent === e.name ? "agent-active" : ""
                  }`}
                  onClick={(evn) => selectAgentHandle(evn)}
                  id={e.name}
                  key={index}
                >
                  <div
                    className={`w-[60px] h-[60px] bg-white opacity-20 z-[1] absolute ${
                      agent === e.name ? "" : "hidden"
                    }`}
                  ></div>
                  <img
                    src={`/agent/${e.name}/${e.name}.svg`}
                    className="w-full"
                    alt={e.name}
                    id={e.uuid}
                  />
                </div>
              );
            })}
          </div>

          {

          dataAgent &&
            <div className="flex gap-[10px] pt-[20px] justify-center">
              <button>
                <img
                  src={dataAgent.data.abilities[0].displayIcon}
                  className="w-[2.5rem] border-solid border-white border-[1px] py-[5px] px-[5px]"
                  alt=""
                />
              </button>
              <button>
                <img
                  src={dataAgent.data.abilities[1].displayIcon}
                  className="w-[2.5rem] border-solid border-white border-[1px] py-[5px] px-[5px]"
                  alt=""
                />
              </button>
              <button>
                <img
                  src={dataAgent.data.abilities[2].displayIcon}
                  className="w-[2.5rem] border-solid border-white border-[1px] py-[5px] px-[5px]"
                  alt=""
                />
              </button>
              <button>
                <img
                  src={dataAgent.data.abilities[3].displayIcon}
                  className="w-[2.5rem] border-solid border-white border-[1px] py-[5px] px-[5px]"
                  alt=""
                />
              </button>
            </div>

            }
          // <button className={`bg-white py-[10px] px-[25px] absolute bottom-0 right-[5%]`} onClick={handleClick1} >next</button>
        </div>
      )}

      {
        page === 2 &&
        <div>
          <h1
            className={`${poppins.className} text-[2rem] uppercase text-white text-center`}
          >
            select map & location
          </h1>
        </div>
      }
    </div>
  );
}