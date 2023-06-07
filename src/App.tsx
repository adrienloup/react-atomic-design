import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useFirstPrismicDocument} from '@prismicio/react';
import Loader from './components/atoms/Loader/Loader';
import Home from './pages/Home/Home';
import Collection from './pages/Collection/Collection';
import NotFound from './pages/NotFound/NotFound';
import Product from './pages/Product/Product';
import Sitemap from './pages/Sitemap/Sitemap';
import Contact from './pages/Contact/Contact';
import Error from './pages/Error/Error';
import Shop from './pages/Shop/Shop';
import './style/index.scss';

function App() {
  const prismic = useFirstPrismicDocument() || [];
    
  return (
    <BrowserRouter>
      <Loader data={prismic[0]?.data} />
      {prismic[1]?.state === 'loaded' &&
        (<Routes>
          <Route
            path='/react-atomic-design/'
            element={<Home data={prismic[0]?.data} />}
          />
          <Route
            path='/react-atomic-design/collection/:id'
            element={<Collection data={prismic[0]?.data} />}
          />
          <Route
            path='/react-atomic-design/product/:id'
            element={<Product data={prismic[0]?.data} />}
          />
          <Route
            path='/react-atomic-design/shop'
            element={<Shop data={prismic[0]?.data} />}
          />
          <Route
            path='/react-atomic-design/sitemap'
            element={<Sitemap data={prismic[0]?.data} />}
          />
          <Route
            path='/react-atomic-design/contact'
            element={<Contact data={prismic[0]?.data} />}
          />
          <Route
            path='*'
            element={<NotFound data={prismic[0]?.data} />}
          />
        </Routes>)}
      {prismic[1]?.state === 'failed' &&
        (<Routes>
          <Route
            path='*'
            element={<Error data={prismic[1]?.error} />}
          />
        </Routes>)}
    </BrowserRouter>
  );
}

export default App;
