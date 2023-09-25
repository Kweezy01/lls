import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import Link from "next/link";
import { useRouter } from "next/router";

const Home: NextPage = () => {

   const router = useRouter();

   const teamName = router.query.team
   if (typeof teamName != "string") return (<h1>Team not found</h1>)
   const { data, isLoading } = api.select.selectBatches.useQuery({ teamName: teamName });;

   if (isLoading) return <div>Loading...</div>

   if (!data) return (
      <h1>No team data found, add a new team <Link href="/add-team">HERE</Link></h1>
   )

   return (
      <>
         <Head>
            <title>Basstrack</title>
            <meta name="description" content="Official website of bass fishing" />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <main className="flex h-screen justify-center">
            <div className="bg-contain bg-center w-full md:max-w-2xl bg-[url('https://scontent-jnb1-1.xx.fbcdn.net/v/t39.30808-6/260277972_10227320945231659_2177364538079183029_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=1ac024&_nc_ohc=BNUj0U7h4X0AX9ag8BH&_nc_ht=scontent-jnb1-1.xx&oh=00_AfDC04u-kGWkfzpbF3M2J_AV6brZETHXZaWgnR4ow5Zj7A&oe=65175085')]">
               <div className="flex pl-1 pt-1 pb-1 border-b border-slate-400">
                  <nav>
                     <button>
                        <Link href={"/"} className="text-black">Home</Link>
                     </button>
                  </nav>
               </div>
               <div className="flex pl-1 pt-1 pb-1">
               </div>
               <table className="w-full mt-5">
                  <tr>
                     <td className="font-bold text-center border-b border-x bg-blue-500">Total Fish</td>
                     <td className="font-bold text-center border-b border-x bg-blue-500">Weight</td>
                  </tr>
                  {
                     data.map((batch) => {
                        return (
                           <tr key={batch.teamName} className="bg-black bg-opacity-70 text-slate-300 font-bold ml-6 border-b">
                              <td className="text-center border-x">{batch.totalFish}</td>
                              <td className="text-center border-x">{batch.weight}</td>
                           </tr>
                        )
                     })
                  }
               </table>
            </div>
         </main>
      </>
   );
};
export default Home;