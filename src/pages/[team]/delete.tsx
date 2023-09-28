import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "~/utils/api";


const Delete = () => {

   const [deleteChecker, setdeleteChecker] = useState(false);
   const [deleteFlag, setDeleteFlag] = useState(false);

   const deleteTeam = api.delete.deleteTeam.useMutation();

   const router = useRouter()

   const teamName = router.query.team
   if (typeof teamName != "string") return (<h1>Team not found</h1>)
   const { data } = api.select.selectTeam.useQuery({ teamName: teamName });

   if (deleteChecker) return (
      <main className="flex bg-black h-screen justify-center">
         <div className="text-slate-500 bg-white bg-center bg-contain bg-[url('https://scontent-jnb1-1.xx.fbcdn.net/v/t39.30808-6/260277972_10227320945231659_2177364538079183029_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=1ac024&_nc_ohc=BNUj0U7h4X0AX9ag8BH&_nc_ht=scontent-jnb1-1.xx&oh=00_AfDC04u-kGWkfzpbF3M2J_AV6brZETHXZaWgnR4ow5Zj7A&oe=65175085')] w-full border-x border-slate-400 md:max-w-2xl">
            <table className="ml-3">
               <br />
               <br />
               <br />
               <tr><h1 className="text-white p-2 bg-black">Are you sure you want to delete team: {teamName}?</h1></tr>
               <tr className="flex justify-center bg-black pb-3">
                  <button className="ml-1 text-black bg-red-700 hover:bg-red-800  py-2 px-4 border border-lime-900 rounded"
                     onClick={() => {
                        deleteTeam.mutate({ teamName: teamName })
                        setDeleteFlag(true)
                     }}>
                     <Link href={"/"}>DELETE</Link>
                  </button>
               </tr>
            </table>

         </div>
      </main>
   )
   if (deleteFlag) return (
      <div className="flex justify-center pt-10">
         <h1>Deletion Succesfull! Return home <Link className="text-red-400" href={"/"}>HERE</Link></h1>
      </div>
   )

   return (
      <>
         <Head>
            <title>Basstrack</title>
            <meta name="description" content="Official website of bass fishing" />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <main className="flex bg-black h-screen justify-center">
            <div className="text-black bg-center bg-contain bg-[url('https://scontent-jnb1-1.xx.fbcdn.net/v/t39.30808-6/260277972_10227320945231659_2177364538079183029_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=1ac024&_nc_ohc=BNUj0U7h4X0AX9ag8BH&_nc_ht=scontent-jnb1-1.xx&oh=00_AfDC04u-kGWkfzpbF3M2J_AV6brZETHXZaWgnR4ow5Zj7A&oe=65175085')] w-full     border-x border-slate-400 md:max-w-2xl">
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
               <br />
               <button className="ml-1 bg-red-700 hover:bg-red-800  py-2 px-4 border border-lime-900 rounded"
                  onClick={() => {
                     setdeleteChecker(true)
                  }}>
                  DELETE TEAM
               </button>
            </div>
         </main>
      </>


   )
}

export default Delete;