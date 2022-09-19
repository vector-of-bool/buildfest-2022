import { MoLink } from "../utils/types"
import Link from "next/link"

// Define the components props
interface IndexProps {
  links: Array<MoLink>
}

// define the page component
function Index(props: IndexProps) {
  const { links } = props

  return (
      <div>
        <h1>Mo Links</h1>
        <h2>Click On Link to see it individually</h2>
        {/* MAPPING OVER THE MOLINKS */}
        {links.map(t => (
            <div key={t._id}>
              <Link href={`/links/${t._id}`}>
                <h3 style={{ cursor: "pointer" }}>
                  {t.alias} - {t.link}
                </h3>
              </Link>
            </div>
        ))}
      </div>
  )
}

// GET PROPS FOR SERVER SIDE RENDERING
export async function getServerSideProps() {
  // get molink data from API
  const res = await fetch(process.env.API_URL as string)
  const links = await res.json()

  // return props
  return {
    props: { links },
  }
}

export default Index
