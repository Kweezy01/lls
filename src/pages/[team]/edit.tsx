import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "~/utils/api";

const Edit = () => {

   const [totalFish, setTotalFish] = useState(0.1)
   const [totalWeight, setTotalWeight] = useState(0.1)

   const router = useRouter()

   const { mutate } = api.update.updateScore.useMutation();
   
   if (typeof router.query.team != "string") return (<h1>Team not found</h1>)
   const teamName = `${router.query.team}`
   const { data } = api.select.selectTeam.useQuery({ teamName: teamName });

   return (
      <>
         <Head>
            <title>Basstrack</title>
            <meta name="description" content="Official website of bass fishing" />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <main className="flex bg-black h-screen justify-center">
            <div className="text-black bg-center bg-contain bg-[url('https://scontent-jnb1-1.xx.fbcdn.net/v/t39.30808-6/260277972_10227320945231659_2177364538079183029_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=1ac024&_nc_ohc=BNUj0U7h4X0AX9ag8BH&_nc_ht=scontent-jnb1-1.xx&oh=00_AfDC04u-kGWkfzpbF3M2J_AV6brZETHXZaWgnR4ow5Zj7A&oe=65175085')] w-full     border-x border-slate-400 md:max-w-2xl">
               <div className="mt-2">
                  <div className="flex pl-1 pt-1 pb-1 border-b border-slate-400">
                     <nav>
                        <Link href={`/${teamName}`}>Back</Link>
                     </nav>
                  </div>
                  <table className="mt-1 w-full">
                     <tr>
                        <td className="font-bold text-center border-b border-x bg-blue-500">Team</td><td className="font-bold text-center border-b border-x bg-blue-500">Skipper</td><td className="font-bold text-center border-b border-x bg-blue-500">CO-Angler</td><td className="font-bold text-center border-b border-x bg-blue-500">Total Fish</td><td className="font-bold text-center border-b border-x bg-blue-500">Total Weight</td>
                     </tr>
                     <tr className="bg-black bg-opacity-70 text-slate-300 font-bold ml-6 border-b">
                        {[data?.teamName, data?.angler1, data?.angler2, data?.totalFish, data?.totalWeight].map((e) => {
                           return (
                              <td key={e} className="text-center border-x">{e}</td>
                           )
                        })}
                     </tr>
                  </table>
                  <div className="ml-10">
                     <h1 className="ml-1 pt-4">Update the score below:</h1>

                     <br />

                     <div className="ml-1">Total Fish:
                        <input className="bg-black shadow appearance-none border rounded ml-10 py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                           id="TotalFish" type="number"
                           name="amount" min="0"
                           step="1"

                           onChange={(e) => setTotalFish(Number(e.target.value))}
                        />
                     </div>

                     <br />

                     <div className="ml-1">Total Weight:
                        <input className="bg-black shadow appearance-none border rounded ml-4 py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                           id="TotalWeight" type="number"
                           name="weight" min="0"
                           // value={totalWeight}
                           onChange={(e) => setTotalWeight(Number(e.target.value))}
                        />
                     </div>

                     <br />
                     <button className="ml-1 bg-green-700 hover:bg-green-800  py-2 px-4 border border-lime-900 rounded"
                        onClick={() => {
                           if (!data) console.log("No data")
                           mutate({ teamName: teamName, totalFish: totalFish, totalWeight: totalWeight })
                        }}>
                        <Link href={`/${teamName}`}>Update team</Link>
                     </button>
                  </div>
               </div>
            </div>
         </main>
      </>
   )
}

export default Edit;