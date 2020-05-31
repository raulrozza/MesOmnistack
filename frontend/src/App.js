import React from 'react';

// Font Awesome icons import
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faShareAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons'

// Recoil
import { RecoilRoot } from 'recoil';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Routes from './Routes';

// Font Awesome Initialization
library.add(faEdit, faPlus, faShareAlt, faTimes, faTrashAlt);

function App() {
  return (
    <RecoilRoot>
      <Routes />
    </RecoilRoot>
  );
}

export default App;
