import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import Link from "next/link";

const Home: NextPage = () => {

   const { data, isLoading } = api.select.getCatches.useQuery();

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
            <div className="bg-contain bg-center w-full md:max-w-2xl bg-[url('https://scontent-jnb1-1.xx.fbcdn.net/v/t39.30808-6/260277972_10227320945231659_2177364538079183029_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=1ac024&_nc_ohc=yIw9U_aQiRQAX9F87JG&_nc_ht=scontent-jnb1-1.xx&oh=00_AfA5E4ToeI_-ZbRjm_pwMNphjmAUTS1CEZuoPwXzPMP8WA&oe=650B7305')]">
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
                     <td className="font-bold text-center border-b border-x bg-blue-500">Team</td>
                     <td className="font-bold text-center border-b border-x bg-blue-500">Angler</td>
                     <td className="font-bold text-center border-b border-x bg-blue-500">Weight</td>
                  </tr>
                  {data.map((team) => (
                     <tr key={team.teamName} className="bg-black bg-opacity-70 text-slate-300 font-bold ml-6 border-b">
                        <td className="text-center border-x"><Link href={team.teamName}>{team.teamName}</Link></td>
                        <td className="text-center border-x">{team.catcher}</td>
                        <td className="text-center border-x">{team.weight}</td>
                     </tr>
                  ))}
               </table>
            </div>
         </main>
      </>
   );
};
export default Home;