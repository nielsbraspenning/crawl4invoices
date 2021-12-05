const puppeteer = require('puppeteer');
const path = require('path');
const downloadPath = path.resolve('./download');


const browserOptions = {
    headless : false,
    defaultViewport : false
}



async function scrape_script(options){
    //TODO headless, make a debug/setup option for it

    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.goto('https://www.vodafone.nl/account/inloggen?login=ziggo-selfcare');
  
    //TODO replace wait, with check if selector is availble
    await page.waitFor(5000);
    await page.type('#j_username', 'nielsbraspenning');
    await page.type('#j_password', 'Ks4z857dep&3');a
    await page.click('#loginFormSubmitButton');

    //TODO replace wait, with check if selector is availble
    await page.waitFor(20000);
    //does not work, or this click does not throw the error
    try {
        let result = await page.click('button.btn.btn-primary.clearboth.cookiewall__accept');
        console.log(result);
    } catch (error) {
        console.error(error);
    }

    //TODO replace wait, with check if selector is availble
    await page.waitFor(20000); 
    await page.click('a.overviewLinks.privacyFont.billsLinkClass.col-md-12.col-sm-12.col-xs-12.commonPaddingClass');

    //TODO replace wait, with check if selector is availble
    await page.waitFor(20000); 

    await page._client.send('Page.setDownloadBehavior', {
        behavior: 'allow',
        downloadPath: downloadPath 
    });

    //Check which files are availble for download and make a selection, which to download
    await page.click('#pdfretrieve_545556511');

    //TODO replace wait, with check if selector is availble
    await page.waitFor(20000); 
    await page.screenshot({ path: 'example.png'});

   

   await browser.close();
}  




scrape_script(browserOptions);