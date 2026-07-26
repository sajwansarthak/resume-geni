import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"

function App() {

  return (
    /**
     * creating router api to call different api (pages)
     */
    <RouterProvider router={router} />
  )
}

export default App
