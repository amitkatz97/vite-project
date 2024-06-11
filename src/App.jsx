import{ HashRouter as Router, Routes , Route} from 'react-router-dom'
import{AppHeader} from './cmps/AppHeader'

import { Home } from "./pages/Home.jsx"
import { About } from "./pages/About.jsx"
import { EmailIndex } from "./pages/EmailIndex.jsx";
import { EmaileDetailes } from './pages/EmaileDetailes.jsx';
import { AsideMenu } from './pages/AsideMenu.jsx';
import {EmailCompose} from "./cmps/EmailCompose.jsx"



export function App() {

    return (
      <Router>
        <section className='main-app'>
          <AppHeader />
            <main className='container'>
              <Routes>
                <Route path= "/" element={<Home />}/>
                <Route path= "/about" element={<About />}/>
                <Route path= "/emailes/:folder" element={<EmailIndex />} >
                  <Route path ="/emailes/:folder/:emaileId" element ={<EmaileDetailes />}/>
                  <Route path = "/emailes/:folder/edit/:emaileId?"element={<EmailCompose />} />
                </Route>
              </Routes>
            </main>
            <footer>
                <section className="container">
                    Email 2024, all rights reserved &copy;
                </section>
            </footer>
        </section>
      </Router>
)}


