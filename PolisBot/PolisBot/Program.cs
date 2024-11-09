using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.DevTools.V128.Profiler;
using System;
using OpenQA.Selenium.Support.UI;

namespace SeleniumTest
{
    class Program
    {
        static void Main(string[] args)
        {
            
            
            string[] urls = {
                "https://polis.local/8kmmwtitki",
                "https://polis.local/3vjedh4nha",
                "https://polis.local/25ekjajfib"
            };

            Dictionary<string,bool> commentFound = new Dictionary<string, bool>{
                {"Vote for cookie monster",false},
                {"Yellow elephant is a loser", false}
                };

            for(int j = 0; j < 11; j++)
            {
                var options = new ChromeOptions();
                options.AddArgument("--ignore-certificate-errors");
                options.AddArgument("--ignore-ssl-errors=yes");
                IWebDriver driver = new ChromeDriver(options);

                foreach (var url in urls)
                {
                    driver.Navigate().GoToUrl(url);
                    Thread.Sleep(2000);

                    //foreach(string comment in commentFound.Keys)
                    //{
                    //    commentFound[comment]=false;
                    //}

                    // driver.FindElement(By.CssSelector("[data-view-name='vote-view']"))
                    int votes = int.Parse(FindElement(driver,By.Id("comment_shower")).FindElement(By.CssSelector("span:last-of-type")).Text.Trim().Split()[0]);
                    for(int i = 0; i < votes; i++){
                        string text = "";
                        TryCatchSeleniumStaleReference(()=>{

                                text = FindElement(driver,By.Id("comment_shower")).FindElement(By.CssSelector("p:last-of-type")).Text;
                        });  
                        
                        if(commentFound.ContainsKey(text))
                        {
                            TryCatchSeleniumStaleReference(()=>{
                                FindElement(driver,By.Id("agreeButton")).Click();
                                });  

                            commentFound[text] = true;
                        }
                        else{
                            TryCatchSeleniumStaleReference(()=>{
                                FindElement(driver,By.Id("disagreeButton")).Click();
                                });                  
                        }
                    }

                    foreach(var (comment,found) in commentFound)
                    {
                        if(!found)
                        {
                            driver.FindElement(By.Id("comment_form_textarea")).SendKeys(comment);
                            driver.FindElement(By.Id("comment_button")).Click();
                        }
                        else
                        {
                            commentFound[comment]=false;
                        }
                    }
                    
                }
                driver.Quit();
            }
            
        }

        static void TryCatchSeleniumStaleReference(Action action)
        {
            try { 
                action();
                Thread.Sleep(1000);
            } 
            catch (StaleElementReferenceException) 
            { 
                action();
                Thread.Sleep(1000);
            }
        }

        public static IWebElement FindElement(IWebDriver driver, By by, int timeoutInSeconds = 10)
        {
            if (timeoutInSeconds > 0)
            {
                var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(timeoutInSeconds));
                return wait.Until(drv => drv.FindElement(by));
            }
            return driver.FindElement(by);
        }
    }
}

