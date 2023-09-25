import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import Link from "next/link";

const Home: NextPage = () => {

    const { data, isLoading } = api.select.getTeam.useQuery();

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
                    <div className="flex pl-1 pt-1 pb-1">
                    </div>
                    <table className="w-full mt-5">
                        <tr>
                            <td className="font-bold text-center border-b border-x bg-blue-500">Team</td>
                            <td className="font-bold text-center border-b border-x bg-blue-500">Anglers</td>
                            <td className="font-bold text-center border-b border-x bg-blue-500">Total Fish</td>
                            <td className="font-bold text-center border-b border-x bg-blue-500">Total Weight</td>
                        </tr>
                        {data.map((team) => (
                            <tr key={team.teamName} className="bg-black bg-opacity-70 text-slate-300 font-bold ml-6 border-b">
                                <td className="text-center border-x"><Link href={team.teamName}>{team.teamName}</Link></td>
                                <td className="text-center border-x">{`${team.angler1}, ${team.angler2}`}</td>
                                <td className="text-center border-x">{team.totalFish}</td>
                                <td className="text-center border-x">{team.totalWeight}</td>
                            </tr>
                        ))}
                    </table>
                    <br />
                    <button className="bg-green-700 hover:bg-green-800  py-2 px-4 border border-lime-900 rounded"><Link href="add-team">Add a team</Link></button>
                    <table>
                        <tr>
                            <br />
                            <button className="ml-1 bg-green-700 hover:bg-green-800  py-2 px-4 border border-lime-900 rounded">
                                <Link href={"/catches"}>Catches</Link>
                            </button>
                        </tr>
                    </table>
                </div>
            </main>
        </>
    );
};
export default Home;