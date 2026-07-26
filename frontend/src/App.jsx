import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"
import { AuthProvider } from "./features/authentication/auth.context.jsx"

function App() {

  return (
    /**
      * creating router api to call different api (pages)
      */

    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
