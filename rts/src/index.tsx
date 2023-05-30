import React from 'react';
import { createRoot } from 'react-dom/client';

import UserSearch from './refs/UserSearch'
// import EventComponent from './events/EventComponent';
// import UserSearch from './state/UserSearch';
// import GuestList from './state/GuesList';
// import Parent from './props/Parent';

const root  = createRoot(document.getElementById('root')!);

root.render( 
<div>
    <UserSearch />
</div>
)
