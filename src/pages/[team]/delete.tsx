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
   const { data } = api.scoreQuery.find.useQuery({ teamName: teamName });

   if (deleteChecker) return (
      <div className="flex justify-center pt-10">
         <table>
            <tr><h1>Are you sure you want to delete team: {teamName}?</h1></tr>
            <tr className="flex justify-center">
               <button className="ml-1 bg-red-700 hover:bg-red-800  py-2 px-4 border border-lime-900 rounded"
                  onClick={() => {
                     deleteTeam.mutate({ teamName: teamName })
                     setDeleteFlag(true)
                  }}>
                  <Link href={"/"}>DELETE</Link>
               </button>
            </tr>
         </table>

      </div>
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
            <div className="text-black bg-center bg-contain bg-[url('https://scontent-jnb1-1.xx.fbcdn.net/v/t39.30808-6/358048788_10231187416211017_4552627758839448556_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=B7spF6MXrU0AX9Augs5&_nc_ht=scontent-jnb1-1.xx&oh=00_AfBfp2PaCSBBX1VQ1KLL8krsMzEmjS2GmFQikofFvT1y7A&oe=64C11983')] w-full     border-x border-slate-400 md:max-w-2xl">
               <div className="flex pl-1 pt-1 pb-1 border-b border-slate-400">
                  <nav>
                     <Link href={`/${teamName}`}>Back</Link>
                  </nav>
               </div>
               <table className="mt-1 w-full">
                  <tr>
                     <td className="font-bold text-center border-b border-x bg-blue-500">Team</td><td className="font-bold text-center border-b border-x bg-blue-500">Anglers</td><td className="font-bold text-center border-b border-x bg-blue-500">Total Fish</td><td className="font-bold text-center border-b border-x bg-blue-500">Total Weight</td>
                  </tr>
                  <tr className="bg-black bg-opacity-70 text-slate-300 font-bold ml-6 border-b">
                     {[data?.teamName, data?.teammates, data?.totalFish, data?.totalWeight].map((e) => {
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