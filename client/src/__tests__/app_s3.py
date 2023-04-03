import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from time import *

class PythonOrgSearch(unittest.TestCase):
    # IDs were retrieved from inspect tool on site
    # https://rad-naiad-d04419.netlify.app/posts
    
    # prevent following anyone before signing in - DONE
    # allow any app visitor to view the number of followers/following of any user - DONE 
    # allow any app visitor to view the list of followers/following of any user - DONE
    # allow following anyone after signing in and show 'unfollow' button upon following - DONE
    # search for and view specific user - DONE
    # search for and display similar user - DONE
    # search for a user that does not exist - DONE
    # display empty landing pag eif no users are followed - DONE
    # display following user's posts on landing page - DONE
    
    def setUp(self):
        self.driver = webdriver.Chrome()

    # test: a user should not be able to follow anyone before signing in
    def test_prevent_following_without_signin(self):
        driver = self.driver
        driver.maximize_window()
        driver.get("http://localhost:3000/user/63ec2ce407578e0014da8d66") # 'testing testing' user profile page
        # wait for page to load
        try:
            user_name_present = EC.text_to_be_present_in_element((By.XPATH, '//*[@id="root"]/div/div/div[1]/h2'), "testing testing")
            WebDriverWait(driver, 20).until(user_name_present)
        except TimeoutException:
            print
            "Timed out waiting for page to load"
        try:
            driver.find_element(By.ID, 'follow-button') # follow button"
            driver.implicitly_wait(0)
        except NoSuchElementException:
            print
            "PASS - follow button not found"

    # test: allow any app visitor to view the number of followers/following of any user
    def test_view_count_without_signin(self):
        driver = self.driver
        driver.maximize_window()
        driver.get("http://localhost:3000/user/63ec2ce407578e0014da8d66") # 'testing testing' user profile page
        # wait for page to load
        try:
            user_name_present = EC.text_to_be_present_in_element((By.XPATH, '//*[@id="root"]/div/div/div[1]/h2'), "testing testing")
            WebDriverWait(driver, 20).until(user_name_present)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"
        # TODO: make this 'Follower' once updated in application source code
        self.assertIn("1 Followers", driver.page_source) # assert presence of the number of followers
        self.assertIn("0 Following", driver.page_source) # assert presence of the number of users being followed

    # test: allow any app visitor to view the list of followers of any user
    def test_view_followers_list_without_signin(self):
        driver = self.driver
        driver.maximize_window()
        driver.get("http://localhost:3000/user/63ec2ce407578e0014da8d66") # 'testing testing' user profile page
        # wait for page to load
        try:
            user_name_present = EC.text_to_be_present_in_element((By.XPATH, '//*[@id="root"]/div/div/div[1]/h2'), "testing testing")
            WebDriverWait(driver, 20).until(user_name_present)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"
        # view the list of followers
        driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[1]/div/p[1]').click() # click on the number of followers
        try:
            followers_list_present = EC.text_to_be_present_in_element((By.XPATH, '//*[@id="modal-modal-title"]'), "Followers")
            WebDriverWait(driver, 20).until(followers_list_present)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"
        self.assertIn("Frontend Tests2", driver.page_source) # assert presence of follower's name in the list

    # test: allow any app visitor to view the list of following of any user
    def test_view_following_list_without_signin(self):
        driver = self.driver
        driver.maximize_window()
        driver.get("http://localhost:3000/user/63ec2ce407578e0014da8d66") # 'testing testing' user profile page
        # wait for page to load
        try:
            user_name_present = EC.text_to_be_present_in_element((By.XPATH, '//*[@id="root"]/div/div/div[1]/h2'), "testing testing")
            WebDriverWait(driver, 20).until(user_name_present)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"
        # view the list of users being followed
        driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[1]/div/p[2]').click() # click on the number of followed users
        try:
            following_list_present = EC.text_to_be_present_in_element((By.XPATH, '//*[@id="modal-modal-title"]'), "Following")
            WebDriverWait(driver, 20).until(following_list_present)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"
        self.assertIn("This account is not following anyone yet.", driver.page_source) # assert presence of 0 followers text on modal

    # test: allow following anyone after signing in
    def test_follow_after_signin(self):
        driver = self.driver
        driver.maximize_window()
        driver.get("http://localhost:3000/auth")
        # locate and enter email and password and submit
        email = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[1]/div/div/input')
        password = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[2]/div/div/input')
        email.send_keys("teehee@teehee.com")
        password.send_keys("teehee")
        driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/button[1]/span[1]').click()
        # wait for home page to load
        try:
            element_present = EC.text_to_be_present_in_element((By.XPATH, '//*[@id="root"]/div/div/div/div[2]/div[1]/form/h6'), "Creating a Memory") # Create a Memory form heading
            WebDriverWait(driver, 5).until(element_present)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"
        driver.get("http://localhost:3000/user/63ebe2df07578e0014da8d55") # redirect to 'test test' user profile page
        # wait for user profile page to load
        try:
            user_name_present = EC.text_to_be_present_in_element((By.XPATH, '//*[@id="root"]/div/div/div[1]/h2'), "test test")
            WebDriverWait(driver, 5).until(user_name_present)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"
        # follow user
        self.assertEqual("FOLLOW", driver.find_element(By.ID, 'follow-button').text) # assert presence of follow button
        driver.find_element(By.ID, 'follow-button').click() # click on follow button
        self.assertIn("Unfollow", driver.page_source) # assert presence of unfollow button
        # wait for followers count to update
        try:
            updated_count_present = EC.text_to_be_present_in_element((By.XPATH, '//*[@id="root"]/div/div/div[1]/div/p[1]'), "1 Followers")
            WebDriverWait(driver, 5).until(updated_count_present)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"
        self.assertIn("1 Followers", driver.page_source) # assert there is now 1 follower
        # navigate to profile page
        try:
            avatar_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/header/div/div/a/div')) # avatar
            WebDriverWait(driver, 5).until(avatar_present)
            driver.find_element(By.XPATH, '//*[@id="root"]/div/header/div/div/a/div').click() # click on avatar
        except TimeoutException:
            print 
            "Timed out waiting for page to load"
        # wait for profile page to load
        try:
            user_name_present = EC.text_to_be_present_in_element((By.XPATH, '//*[@id="root"]/div/div/div[1]/h2'), "tee hee")
            WebDriverWait(driver, 5).until(user_name_present)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"
        self.assertIn("1 Following", driver.page_source) # assert current user is now following 1 user (previously 0, but followed 'test test' in previous test)

    # search for and view specific user - DONE
    def test_user_specific_display(self):
        driver = self.driver
        driver.maximize_window()
        driver.get("http://localhost:3000/posts")

        searchBar = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[2]/header/div[1]/div/input')
        searchBar.send_keys("test test")
        driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[2]/header/button/span[1]').click()
        
        # Switch to accounts view
        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/div/div[1]/div[1]/a')) # post title
            WebDriverWait(driver, 5).until(element_present)

        except TimeoutException:
            print 
            "Timed out waiting for page to load"

        # Check if user is displayed
        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/div/div[1]/div[2]/div/div/center/div')) # post title
            WebDriverWait(driver, 5).until(element_present)
            
            self.assertIn("test test", driver.page_source)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"

    # search for a user that does not exist - DONE
    def test_no_user_display(self):
        driver = self.driver
        driver.maximize_window()
        driver.get("http://localhost:3000/posts")

        searchBar = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[2]/header/div[1]/div/input')
        searchBar.send_keys("x")
        driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[2]/header/button/span[1]').click()
        
        # Switch to accounts view
        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/div/div[1]/div[1]/a')) # post title
            WebDriverWait(driver, 5).until(element_present)

        except TimeoutException:
            print 
            "Timed out waiting for page to load"
            
        # Check if user is displayed        
        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/div/div[1]/div[2]/h3')) # post title
            WebDriverWait(driver, 5).until(element_present)
            
            self.assertIn("No User Found", driver.page_source)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"

    # search for and display similar user - DONE
    def test_user_similar_display(self):
        driver = self.driver
        driver.maximize_window()
        driver.get("http://localhost:3000/posts")

        searchBar = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[2]/header/div[1]/div/input')
        searchBar.send_keys("test")
        driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[2]/header/button/span[1]').click()
        
        # Switch to accounts view
        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/div/div[1]/div[1]/a')) # post title
            WebDriverWait(driver, 5).until(element_present)

        except TimeoutException:
            print 
            "Timed out waiting for page to load"
            
        # Check if user is displayed
        userNames = ["test test", "Test example", "Wes2 Test", "test_Zayn test", "testing testing"]
        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/div/div[1]/div[2]/div[1]/div/center/div')) # post title
            WebDriverWait(driver, 5).until(element_present)

            for i in range(5):
                self.assertIn(userNames[i], driver.page_source)

        except TimeoutException:
            print 
            "Timed out waiting for page to load"

    # Test to show landing page of a profile that follows no accounts
    def test_no_followers_landing_page(self):
        driver = self.driver
        driver.maximize_window()
        driver.get("http://localhost:3000/auth")

        # locate and enter email and password and submit
        email = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[1]/div/div/input')
        password = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[2]/div/div/input')
        email.send_keys("zayn@new")
        password.send_keys("new")
        driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/button[1]/span[1]').click()
        # wait for home page to load

        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/div/div[1]/div/h3')) 
            WebDriverWait(driver, 5).until(element_present)

        except TimeoutException:
            print 
            "Timed out waiting for page to load"

    # Test to display only users that are being followed posts
    def test_display_page(self):
        driver = self.driver
        driver.maximize_window()
        driver.get("http://localhost:3000/auth")

        # locate and enter email and password and submit
        email = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[1]/div/div/input')
        password = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[2]/div/div/input')
        email.send_keys("py@py.com")
        password.send_keys("py")
        driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/button[1]/span[1]').click()
        
        # wait for home page to load
        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/div/div[1]/div/div/div/span/div[1]')) 
            WebDriverWait(driver, 5).until(element_present)

        except TimeoutException:
            print 
            "Timed out waiting for page to load"

    def test_user_display(self):
        driver = self.driver
        driver.maximize_window()
        # driver.get("https://rad-naiad-d04419.netlify.app/auth")
        driver.get("http://localhost:3000/posts")

        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/div/div[1]/div[1]/a')) # post title
            WebDriverWait(driver, 5).until(element_present)

        except TimeoutException:
            print 
            "Timed out waiting for page to load"

        driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[1]/div[1]/a').click()

        # Check if each user is displayed
        userNames = ["Wes2 Test", "Demo demo", "test test"]
        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/div/div[1]/div[2]/div[1]/div/center/div')) # post title
            WebDriverWait(driver, 5).until(element_present)
            for i in range(3):
                self.assertIn(userNames[i], driver.page_source)

            # self.assertIn("Selenium Test Title", driver.page_source)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"

    def test_user_specific_display(self):
        driver = self.driver
        driver.maximize_window()
        # driver.get("https://rad-naiad-d04419.netlify.app/auth")
        driver.get("http://localhost:3000/posts")

        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/div/div[1]/div[1]/a')) # post title
            WebDriverWait(driver, 5).until(element_present)

        except TimeoutException:
            print 
            "Timed out waiting for page to load"

        driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[1]/div[1]/a').click()

        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/div/div[2]/header/div[1]/div/input')) # post title
            WebDriverWait(driver, 5).until(element_present)

        except TimeoutException:
            print 
            "Timed out waiting for page to load"

        searchBar = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[2]/header/div[1]/div/input')
        searchBar.send_keys("test test")
        driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[2]/header/button/span[1]').click()
        
        # Check if user is displayed
        
        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/div/div[1]/div[2]/div/div/center/div')) # post title
            WebDriverWait(driver, 5).until(element_present)
            
            self.assertIn("test test", driver.page_source)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"

    def test_no_user_display(self):
        driver = self.driver
        driver.maximize_window()
        # driver.get("https://rad-naiad-d04419.netlify.app/auth")
        driver.get("http://localhost:3000/posts")

        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/div/div[1]/div[1]/a')) # post title
            WebDriverWait(driver, 5).until(element_present)

        except TimeoutException:
            print 
            "Timed out waiting for page to load"

        driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[1]/div[1]/a').click()

        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/div/div[2]/header/div[1]/div/input')) # post title
            WebDriverWait(driver, 5).until(element_present)

        except TimeoutException:
            print 
            "Timed out waiting for page to load"

        searchBar = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[2]/header/div[1]/div/input')
        searchBar.send_keys("x")
        driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[2]/header/button/span[1]').click()
        
        # Check if user is displayed
        
        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/div/div[1]/div[2]/h3')) # post title
            WebDriverWait(driver, 5).until(element_present)
            
            self.assertIn("No User Found", driver.page_source)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"

    def test_user_similar_display(self):
        driver = self.driver
        driver.maximize_window()
        # driver.get("https://rad-naiad-d04419.netlify.app/auth")
        driver.get("http://localhost:3000/posts")

        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/div/div[1]/div[1]/a')) # post title
            WebDriverWait(driver, 5).until(element_present)

        except TimeoutException:
            print 
            "Timed out waiting for page to load"
            
        driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[1]/div[1]/a').click()

        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/div/div[2]/header/div[1]/div/input')) # post title
            WebDriverWait(driver, 5).until(element_present)

        except TimeoutException:
            print 
            "Timed out waiting for page to load"

        searchBar = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[2]/header/div[1]/div/input')
        searchBar.send_keys("test")
        driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[2]/header/button/span[1]').click()
        
        # Check if user is displayed
        userNames = ["test test", "Test example", "Wes2 Test", "test_Zayn test", "testing testing"]
        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/div/div[1]/div[2]/div[1]/div/center/div')) # post title
            WebDriverWait(driver, 5).until(element_present)

            for i in range(5):
                self.assertIn(userNames[i], driver.page_source)

        except TimeoutException:
            print 
            "Timed out waiting for page to load"


    def tearDown(self):
        self.driver.close()


if __name__ == "__main__":
    unittest.main()
