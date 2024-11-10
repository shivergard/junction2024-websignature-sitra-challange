using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.DevTools.V128.Profiler;
using System;
using OpenQA.Selenium.Support.UI;
using OpenQA.Selenium.Internal;
using System.Collections.Generic;

namespace SeleniumTest
{
    class Program
    {
        static void Main(string[] args)
        {
            
            string[] urls = File.ReadAllLines("PolisTopics.txt").Select(s=>$"https://polis.local/{s}").ToArray();

            Dictionary<string,bool> commentFound = File.ReadAllLines("SpamComments.txt").ToDictionary(s=>s,s=>false);

            int spamAttempts = 11;

            for(int j = 0; j < spamAttempts; j++)
            {
                var options = new ChromeOptions();
                options.AddArgument("--ignore-certificate-errors");
                options.AddArgument("--ignore-ssl-errors=yes");
                options.SetLoggingPreference(LogType.Browser,LogLevel.All);
                //options.SetLoggingPreference(LogType.Client,LogLevel.All);
                options.SetLoggingPreference(LogType.Driver,LogLevel.All);
                options.SetLoggingPreference(LogType.Performance,LogLevel.All);
                //options.SetLoggingPreference(LogType.Profiler,LogLevel.All);
                //options.SetLoggingPreference(LogType.Server,LogLevel.All);
                IWebDriver driver = new ChromeDriver(options);

                foreach (var url in urls)
                {
                    driver.Navigate().GoToUrl(url);
                    Thread.Sleep(2000);

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
                List<LogEntry> le = driver.Manage().Logs.GetLog(LogType.Browser).ToList();
                string eventClickString = "EVENT=Click ";
                int eventLength = eventClickString.Length;
                
                File.AppendAllLines($"C:\\PolisBotLog\\LogEventClick",
                le.Where(l=>l.Message.Split('\"')[1].StartsWith(eventClickString))
                .Select(l=>$"{l.Timestamp} {l.Message.Split('\"')[1].Split(' ',2)[1]}"));

                foreach(string lt in new string[]{LogType.Browser,/*LogType.Client,*/LogType.Driver,LogType.Performance,/*LogType.Profiler,LogType.Server*/}){
                    List<LogEntry> logEntries = driver.Manage().Logs.GetLog(lt).ToList();
                    //File.WriteAllLines($"C:\\PolisBotLog\\Log{lt}T{DateTime.Now.ToString("ddMMyyyy_HHmmss")}i{j}",logEntries.Select(l=>l.ToString()));
                    File.AppendAllLines($"C:\\PolisBotLog\\Log{lt}",logEntries.Select(l=>l.ToString()));
                    
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

/*
string[] urls = {
    "https://polis.local/2dpva56epm",
    "https://polis.local/8vyycema7m",
    "https://polis.local/9yjh8wmmvd"
};
*/
/*
Dictionary<string,bool> commentFound = new Dictionary<string, bool>{
    {"Vote for cookie monster",false},
    {"Yellow elephant is a loser", false}
    };
*/


































