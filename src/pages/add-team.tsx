import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import Link from "next/link";
import { useState } from "react";

const AddTeam: NextPage = () => {

   const [teamName, setTeamName] = useState("");
   const [angler1, setAngler1] = useState("");
   const [angler2, setAngler2] = useState("");

   const [insertFlag, setInsertFlag] = useState(false);

   const { mutate } = api.insert.createTeam.useMutation();

   if (insertFlag) return (
      <div>
         <h1 className="pt-10">Submission Succesfull!</h1>
         <br />
         <h1>Return home <Link className="text-red-400" href={"/"}>HERE</Link></h1>
      </div>
   )

   return (
      <>
         <Head>
            <title>Basstrack</title>
            <meta name="description" content="Official website of bass fishing" />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <main className="flex h-screen justify-center">
            <div className="text-black bg-contain bg-center bg-[url('https://scontent-jnb1-1.xx.fbcdn.net/v/t39.30808-6/260277972_10227320945231659_2177364538079183029_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=1ac024&_nc_ohc=BNUj0U7h4X0AX9ag8BH&_nc_ht=scontent-jnb1-1.xx&oh=00_AfDC04u-kGWkfzpbF3M2J_AV6brZETHXZaWgnR4ow5Zj7A&oe=65175085')] w-full border-x border-slate-400 md:max-w-2xl">
               <div className="flex pl-1 pt-1 pb-1 border-b border-slate-400">
                  <nav>
                     <Link href="/" className="" >Home</Link>
                  </nav>
               </div>
               <h1 className="ml-1 pt-4">Add a new team below:</h1>

               <br />

               <div className="ml-1">Team name:
                  <input className="bg-black shadow appearance-none border rounded ml-7 py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                     id="TeamName" type="text" placeholder="TeamName"
                     value={teamName}
                     onChange={(e) => setTeamName(e.target.value)}
                  />
               </div>

               <br />

               <div className="ml-1">Skipper:
                  <input className="bg-black shadow appearance-none border rounded ml-4 py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                     id="playerNames" type="text" placeholder="Player 1"
                     value={angler1}
                     onChange={(e) => setAngler1(e.target.value)}
                  />
               </div>

               <div className="ml-1">CO-Angler:
                  <input className="bg-black shadow appearance-none border rounded ml-4 py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                     id="playerNames" type="text" placeholder="Player 2"
                     value={angler2}
                     onChange={(e) => setAngler2(e.target.value)}
                  />
               </div>

               <br />

               <button
                  onClick={() => {
                     mutate({ teamName: teamName, angler1: angler1, angler2: angler2 })
                     setInsertFlag(true)
                  }}

                  className="ml-1 bg-green-700 hover:bg-green-800 py-2 px-4 border border-lime-900 rounded">
                  Insert new team
               </button>
            </div>
         </main>
      </>
   )
}

export default AddTeam