// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL

import type { NextPage } from "next"
import { Button } from "antd";


const Home: NextPage = () => {
    return <div>
        <Button type="primary">
            Primary
        </Button>
    </div>
}

export default Home;