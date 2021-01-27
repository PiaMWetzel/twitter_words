import React, {useState} from 'react'
import { Link, animateScroll as scroll } from "react-scroll";
import  './App_mobile.css';
import  './App.css';

function App() {
  const [imgdata, setImgdata] = useState({img: 'default.png',class_: 'response_img img_default'});
  const [twitterhandle, setTwitterhandle] = useState('');
  const [error_class, setError_class] = useState('hide');
  const [hl_bird, setHl_bird] = useState('hide');

  function handleInput(event)
  {
    setTwitterhandle(event.target.value);
  }

  function handleImage(img, class_)
  {
    setImgdata({img:'data:image/png;base64,' + img, class_:class_});
  }

  function handleResponse(my_response)
  {
    console.log("responses");
    console.log(my_response['status']);
    if(my_response.status == 200)
    {
      handleImage(my_response['image'], 'response_img');
      setHl_bird('top_img')
      console.log("success");
    }
    else if(my_response.status == 404)
    {
      setError_class('error');
      setImgdata({img: 'default.png',class_: 'response_img img_default'});

    }
    setTwitterhandle('');
  }


 return (
    <div className="App">
      <div className="top">
      <img className = {hl_bird} src="default.png"/>
      <p className="title">[Words] with Twitter</p>
      </div>
      <Link to="footer" smooth={true}>
      <p className="faq_label">What's this?</p>
      </Link>
      <input type="text" placeholder="Enter Twitter handle" value={twitterhandle} onInput={handleInput} />
      <button onClick = {async () => {
        setImgdata({img:'./loading.gif', class_:'loading_gif'});
        setError_class('hide');
        const res = await fetch('/sub/'+twitterhandle,
      {
        method: 'POST',
        headers: {'content-type':'application/json'},
        body: JSON.stringify()
      })
      let my_response = await res.json();
      console.log(my_response);
      handleResponse(my_response);
    }}>Get words</button>
    <div className={error_class}>Error: Unable to find handle. Please check spelling and try again.</div>
      <div>
      <img className = {imgdata.class_} src={imgdata.img} alt="Word Frequencies" />
      </div>

      <div className="footer" id="footer">
        <p><b>[Words] with Twitter</b> displays a user's 10 most frequently used words or word stems.</p>
        <p>200 of the user's most recent tweets are retrieved. Retweets are subtracted and<br></br> stopwords like ['the', 'these', 'a', ...] are removed. Stemming method: <a href="https://www.geeksforgeeks.org/snowball-stemmer-nlp/" target="_blank">Snowball stemming.</a></p>

      </div>
    </div>
  );
}


export default App;
