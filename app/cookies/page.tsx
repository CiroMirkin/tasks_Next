import { cookies } from 'next/headers'
import TabBar from "./TabBar"

export default async function Cookies() {
    const cookieStore = await cookies()
    const cookieTab = cookieStore.get('selectedTab')?.value ?? '1'

    return (
        <TabBar tabOptions={[1,2,3,4,5,6]} currentTab={Number(cookieTab)} />
    )
}