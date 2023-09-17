import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "~/utils/api";

const AddCatch = () => {

   const router = useRouter()
   const teamName = router.query.team

   const [totalFish, setTotalFish] = useState(0.0)
   const [totalWeight, setTotalWeight] = useState(0.0)


   const insertBatch = api.insert.insertBatch.useMutation();
   const updateScore = api.update.updateScore.useMutation();

   if (typeof teamName != "string") return (<></>);

   const { data } = api.select.selectTeam.useQuery({ teamName: teamName });

   if (!data) return (<>No team data found</>)

   return (
      <>
         <Head>
            <title>Basstrack</title>
            <meta name="description" content="Official website of bass fishing" />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <main className="flex bg-black h-screen justify-center">
            <div className="text-slate-500 bg-white bg-center bg-contain bg-[url('https://scontent-jnb1-1.xx.fbcdn.net/v/t39.30808-6/260277972_10227320945231659_2177364538079183029_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=1ac024&_nc_ohc=yIw9U_aQiRQAX9F87JG&_nc_ht=scontent-jnb1-1.xx&oh=00_AfA5E4ToeI_-ZbRjm_pwMNphjmAUTS1CEZuoPwXzPMP8WA&oe=650B7305')] w-full border-x border-slate-400 md:max-w-2xl">
               <div className="flex pl-1 pt-1 pb-1 border-b border-slate-400">
                  <nav>
                     <Link href={`/${teamName}`}>Back</Link>
                  </nav>
               </div>
               <table className="mt-1 w-full text-black">
                  <tr>
                     <td className="font-bold text-center border-b border-x bg-blue-500">Team</td>
                     <td className="font-bold text-center border-b border-x bg-blue-500">Angler 1</td>
                     <td className="font-bold text-center border-b border-x bg-blue-500">Angler 2</td>
                     <td className="font-bold text-center border-b border-x bg-blue-500">Total Fish</td>
                     <td className="font-bold text-center border-b border-x bg-blue-500">Total Weight</td>
                  </tr>
                  <tr className="bg-black bg-opacity-70 text-slate-300 font-bold ml-6 border-b">
                     {[data?.teamName, data?.angler1, data?.angler2, data?.totalFish, data?.totalWeight].map((e) => {
                        return (
                           <td key={e} className="text-center border-x">{e}</td>
                        )
                     })}
                  </tr>
               </table>
               <br />
               <table>
                  <tr>
                     Total Fish:
                     <input className="bg-black shadow appearance-none border rounded ml-4 py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        id="TotalWeight" type="number"
                        name="totalFish"
                        value={totalFish}
                        onChange={(e) => setTotalFish(Number(e.target.value))}
                     />
                  </tr>
                  <tr>
                     Weight:
                     <input className="bg-black shadow appearance-none border rounded ml-5 py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        id="TotalWeight" type="number"
                        name="weight"
                        value={totalWeight}
                        onChange={(e) => setTotalWeight(Number(e.target.value))}
                     />
                  </tr>
               </table>
               <br />
               <button className="text-black ml-1 bg-green-700 hover:bg-green-800  py-2 px-4 border border-lime-900 rounded"
                  onClick={() => {
                     insertBatch.mutate({
                        teamName: teamName,
                        totalFish: totalFish,
                        weight: totalWeight,
                     });
                     updateScore.mutate({
                        teamName: teamName,
                        totalFish: data.totalFish + totalFish,
                        totalWeight: data.totalWeight + totalWeight,
                     });
                  }}
               >
                  <Link href={`/${teamName}`}>Add Catch</Link>
               </button>
               <br />
               <br />
            </div>
         </main>
      </>
   )
}

export default AddCatch;