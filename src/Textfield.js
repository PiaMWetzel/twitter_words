import React, {useState} from 'react';

function Textfield()
{
    const [twitterhandle, setTwitterhandle] = useState('None');

    return(
        <input type="text" placeholder="Enter Twitter username" onInput={() => setTwitterhandle(this.input)}/>
    );
}

