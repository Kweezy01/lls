import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

const Team = () => {
   const router = useRouter();

   const teamName = router.query.team
   if (typeof teamName != "string") return (<h1>Team not found</h1>)
   const { data } = api.select.selectTeam.useQuery({ teamName: teamName });


   return (
      <>
         <Head>
            <title>Basstrack</title>
            <meta name="description" content="Official website of bass fishing" />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <main className="flex bg-black h-screen justify-center">
            <div className="text-black bg-center bg-contain bg-[url('https://scontent-jnb1-1.xx.fbcdn.net/v/t39.30808-6/260277972_10227320945231659_2177364538079183029_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=1ac024&_nc_ohc=yIw9U_aQiRQAX9F87JG&_nc_ht=scontent-jnb1-1.xx&oh=00_AfA5E4ToeI_-ZbRjm_pwMNphjmAUTS1CEZuoPwXzPMP8WA&oe=650B7305')] w-full     border-x border-slate-400 md:max-w-2xl">
               <div className="flex pl-1 pt-1 pb-1 border-b border-slate-400">
                  <nav>
                     <button>
                        <Link href={"/"}>Home</Link>
                     </button>
                  </nav>
               </div>
               <table className="mt-1 w-full">
                  <tr>
                     <td className="font-bold text-center border-b border-x bg-blue-500">Team</td>
                     <td className="font-bold text-center border-b border-x bg-blue-500">Angler 1</td>
                     <td className="font-bold text-center border-b border-x bg-blue-500">Angler 2</td>
                     <td className="font-bold text-center border-b border-x bg-blue-500">Total Fish</td>
                     <td className="font-bold text-center border-b border-x bg-blue-500">Total Weight</td>
                     <td className="font-bold text-center border-b border-x bg-blue-500">Recorded Games</td>
                  </tr>
                  <tr className="bg-black bg-opacity-70 text-slate-300 font-bold ml-6 border-b">
                     {[data?.teamName, data?.angler1, data?.angler2, data?.totalFish, data?.totalWeight, data?.recordedGames].map((e) => {
                        return (
                           <td key={e} className="text-center border-x">{e}</td>
                        )
                     })}
                  </tr>
               </table>

               <br />

               <button className="ml-1 bg-green-700 hover:bg-green-800  py-2 px-4 border border-lime-900 rounded">
                  <Link href={`${teamName}/add-catch`}>Add catch</Link>
               </button>
               <button className="ml-1 bg-green-700 hover:bg-green-800  py-2 px-4 border border-lime-900 rounded">
                  <Link href={`${teamName}/add-batch`}>Add batch</Link>
               </button>
               <button className="ml-1 bg-green-700 hover:bg-green-800  py-2 px-4 border border-lime-900 rounded">
                  <Link href={`${teamName}/edit`}>Edit</Link>
               </button>
               <button className="ml-1 bg-red-700 hover:bg-red-800  py-2 px-4 border border-lime-900 rounded">
                  <Link href={`${teamName}/delete`}>Delete</Link>
               </button>
            </div>
         </main>
      </>
   )
}

export default Team;
