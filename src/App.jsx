import{ HashRouter as Router, Routes , Route} from 'react-router-dom'
import{AppHeader} from './cmps/AppHeader'

import { Home } from "./pages/Home.jsx"
import { About } from "./pages/About.jsx"
import { EmailIndex } from "./pages/EmailIndex.jsx";
import { EmaileDetailes } from './pages/EmaileDetailes.jsx';



export function App() {

    return (
      <Router>
        <section className='main-app'>
          <AppHeader />
            <main className='container'>
              <Routes>
                <Route path= "/" element={<Home />}/>
                <Route path= "/about" element={<About />}/>
                <Route path= "/emailes" element={<EmailIndex />}/>
                <Route path ="/emailes/:emaileId" element ={<EmaileDetailes />}/>
              </Routes>
            </main>

            <footer>
                <section className="container">
                    robotRights 2023 &copy;
                </section>
            </footer>
        </section>
      </Router>
)}


