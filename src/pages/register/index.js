import { getSession, signIn } from 'next-auth/react'
export default function auth() {

    return (
        <div className="flex items-center justify-center w-9/12 mx-auto pt-28">
            <div className="flex flex-col items-center w-1/3">
                <h1 className="text-4xl font-bold text-primary">Sign in with Github</h1>
                <img className="mt-12 w-36" src="/github-mark.png" alt="github" />
                <div className="flex flex-col items-center justify-center w-1/2 mt-12">
                    <button
                        onClick={() => signIn('github')}
                        className="flex items-center justify-center w-3/4 h-12 px-4 mb-6 text-xl text-white rounded-md bg-[#24292F]" type="button">
                        Sign in
                    </button>
                </div>

            </div>
            <div className="flex flex-col items-center w-1/3">
                <h1 className="text-4xl font-bold text-primary">Sign in with Google</h1>
                <img className="mt-12 w-36" src="/google-mark.png" alt="google" />
                <div className="flex flex-col items-center justify-center w-1/2 mt-12">
                    <button
                        onClick={() => signIn('google')}
                        className="flex items-center justify-center w-3/4 h-12 px-4 mb-6 text-xl text-white rounded-md bg-[#EA4335]" type="button">
                        Sign in
                    </button>
                </div>

            </div>
        </div >
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    return {
        props: {
            notSignedIn: true,
        },
    };
}
