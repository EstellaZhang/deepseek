// export default async function Page({
//   params,
// }: {
//   params: Promise<{ chat_id: string }>
// }) {
//   const { chat_id } = await params
//   return (<div>My Post: {chat_id}</div>)
// }
"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import EastIcon from "@mui/icons-material/East";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({});

  const [model,setModel] = useState("deepseek-v3")
  const handleChangeModel = ()=>{
    setModel(model === 'deepseek-v3'?'deepseek-r1':'deepseek-v3')
  }

  const endRef = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    if(endRef.current){
      endRef?.current?.scrollIntoView({behavior:'smooth'})
    }
  },[messages])

  return (
    <div className="flex flex-col h-screen justify-between items-center">
      <div className="flex flex-col w-2/3 gap-8 overflow-y-auto justify-between flex-1">
          <div className="h-4"></div>
          <div className="flex flex-col gap-8 flex-1">
            {messages?.map((message) => (
              <div
                key={message.id}
                className={`rounded-lg flex flex-row 
                  ${
                    message?.role === "assistant"
                      ? "justify-start mr-18"
                      : "justify-end ml-10"
                  }`}
              >
                {/* {message.role === "user" ? "User: " : "AI: "} */}
                {message.role === "user" ? " " : " "}
                <p
                  className={`inline-block p-2 rounded-lg ${
                    message?.role === "assistant" ? "bg-blue-300" : "bg-slate-100"
                  }`}
                >
                  {message?.content}
                </p>
              </div>
            ))}
          </div>
      </div>

      <div className="h-4" ref={endRef}></div>

      {/* 输入框 */}
      <div className="flex flex-col items-center justify-center mt-4 shadow-lg border-[1px] border-gray-300 h-32 rounded-lg w-2/3">
        <textarea className="w-full rounded-lg p-3 h-30 focus:outline-none"
          value={input}
          onChange={handleInputChange}
        >
        </textarea>
        <div className="flex flex-row items-center justify-between w-full h-12 mb-2">
          <div>
            <div className={`flex flex-row items-center justify-center rounded-lg border-[1px] px-2 py-1 ml-2 cursor-pointer ${model} === 'deepseek-r1'?'border-blue-300 bg-blue-200':'border-gray-300'`}
              onClick={handleChangeModel}
            >
              <p className="text-sm" >
                深度思考(R1)
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center border-2 mr-4 border-black p-1 rounded-full" onClick={handleSubmit}>
            <EastIcon />
          </div>
          {/* <div>
            <ArrowCircleRightIcon />
          </div> */}
        </div>
      </div>

      {/* <form onSubmit={handleSubmit}>
        <input name="prompt" value={input} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form> */}
    </div>
  );
}
