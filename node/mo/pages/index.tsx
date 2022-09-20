import 'bulma/css/bulma.min.css';
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
      <div className="section">
        <div className="container">
          <h1 className="title">
            Mo Links
          </h1>
          <p className="subtitle">
            Click On Link to see it individually
          </p>
        </div>
        <div className="container"></div>
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
