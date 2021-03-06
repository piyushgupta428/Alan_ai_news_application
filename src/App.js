import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

import wordsToNumbers from 'words-to-numbers';

import NewsCards from './components/NewsCards/NewsCards';
// import classes from '*.module.css';
import useStyles from './styles.js';

const alanKey ='f078ea187f3eae60d6a6da3e5285e1252e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
    const[newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);
    const classes = useStyles();

    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles, number }) => {
                if(command === 'newHeadlines'){
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                }else if(command === 'highlight'){
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                } else if(command ==='open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers (number, { fuzzy: true }) : number;
                    const article = articles[parsedNumber -1];

                    if(parsedNumber > 20){
                        alanBtn().playText('Please try that again.')
                    } else if(article){
                        window.open(article.url, '_blank');
                        alanBtn().playText('Opening...');
                    }
                }
            }
        })
    }, [])

    return (
        <div>
          <h4 style={{display: 'flex',  justifyContent:'center' , bottom:0,alignItems: "center", position:"fixed", color:"rgb(69,39,160)"}}> An AI enabled app &copy; Piyush Gupta</h4>
            <div className={classes.logoContainer}>
                <img src="https://s3-us-west-1.amazonaws.com/welcome.ai/attachments/attachments/000/017/901/thumb/alan-logo-vertical-color.png?1571682334" className={classes.alanLogo} alt="alan logo"/>
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
        </div>
    );
}

export default App;
