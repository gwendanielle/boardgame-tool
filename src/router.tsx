import { createBrowserRouter } from 'react-router-dom';
import App from "@/App.tsx";
import Home from "@/feature/Home";
import AnswerSheet from "@/feature/AnswerSheet";
import RolePlaying from "@/feature/RolePlaying";
import Scoreboard from "@/feature/Scoreboard";

export const router = createBrowserRouter(
    [{
        path: '/',
        element: <App />,
        // An error element catches broken links or component crashes
        errorElement: <div>404 Not Found</div>,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'answer-sheet',
                Component: AnswerSheet
            },
            {
                path: 'score-board',
                Component: Scoreboard
            },
            {
                path: 'role-play',
                Component: RolePlaying
            }
        ],
    }],
    {
        // keeps routes working when the app is served from a sub-path (GitHub Pages)
        basename: import.meta.env.BASE_URL,
    }
)