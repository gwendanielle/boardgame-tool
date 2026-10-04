import Header from "@/layouts/Header";
import { Outlet } from 'react-router-dom';

const Root = () => {
    return (
        <>
            <header>
                <Header />
            </header>
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default Root;