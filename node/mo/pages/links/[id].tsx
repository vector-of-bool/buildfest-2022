import { MoLink } from "../../utils/types"
import { useRouter } from "next/router"
import { useState } from "react"

// Define Prop Interface
interface ShowProps {
    MoLink: MoLink
    url: string
}

// Define Component
function Show(props: ShowProps) {
    // get the next router, so we can use router.push later
    const router = useRouter()

    // set the MoLink as state for modification
    const [MoLink, setMoLink] = useState<MoLink>(props.MoLink)

    // function for handling clicking the delete button
    const handleDelete = async () => {
        await fetch(props.url + "/" + MoLink._id, {
            method: "delete",
        })
        //push user back to main page after deleting
        router.push("/")
    }

    //return JSX
    return (
        <div>
            <h1>{MoLink.alias}</h1>
            <h2>{MoLink.link}</h2>
            <button onClick={handleDelete}>Delete</button>
            <button
                onClick={() => {
                    router.push("/")
                }}
            >
                Go Back
            </button>
        </div>
    )
}

// Define Server Side Props
export async function getServerSideProps(context: any) {
    // fetch the MoLink, the param was received via context.query.id
    const res = await fetch(process.env.API_URL + "/" + context.query.id)
    const MoLink = await res.json()

    //return the serverSideProps the MoLink and the url from out env variables for frontend api calls
    return { props: { MoLink, url: process.env.API_URL } }
}

// export component
export default Show
