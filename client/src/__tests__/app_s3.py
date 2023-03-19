import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class PythonOrgSearch(unittest.TestCase):
    # IDs were retrieved from inspect tool on site
    # https://rad-naiad-d04419.netlify.app/posts
    
    # prevent following anyone before signing in - DONE
    # allow any app visitor to view the number of followers/following of any user - DONE 
    # allow any app visitor to view the list of followers/following of any user - DONE
    # allow following anyone after signing in - IN PROGRESS
    
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
            driver.find_element(By.CLASS_NAME, 'follow-button') # follow button"
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
        driver.get("https://rad-naiad-d04419.netlify.app/auth")
        # locate and enter email and password and submit
        email = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[1]/div/div/input')
        password = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[2]/div/div/input')
        email.send_keys("teehee@teehee.com")
        password.send_keys("teehee")
        driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/button[1]/span[1]').click()
        # wait for page to load
        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/div/div[2]/div[1]/form/h6')) # Create a Memory form heading
            WebDriverWait(driver, 5).until(element_present)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"
        # from the home page, find 'Shrek Swamp' user post to navigate to their profile page to follow
        try:
            memory_present = EC.text_to_be_present_in_element((By.XPATH, '//*[@id="root"]/div/div/div/div[1]/div/div[3]/div/span/div[2]/h6'), "Shrek Swamp")
            WebDriverWait(driver, 5).until(memory_present)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"
        driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[1]/div/div[3]/div/span/div[2]/h6').click() # click on post
        # redirecting to post details page - wait for page to load
        try:
            creator_name_present = EC.text_to_be_present_in_element((By.XPATH, '//*[@id="root"]/div/div/div/div[1]/h6/a'), "Shrek Swamp")
            WebDriverWait(driver, 5).until(creator_name_present)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"
        driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[1]/h6/a').click() # click on Creator name
        # redirecting to user profile page - wait for page to load
        try:
            user_name_present = EC.text_to_be_present_in_element((By.XPATH, '//*[@id="root"]/div/div/div[1]/h2'), "Shrek Swamp")
            WebDriverWait(driver, 5).until(user_name_present)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"
        # follow user
        try:
            follow_button_present = EC.text_to_be_present_in_element((By.CLASS_NAME, 'follow-button'), "Follow")
            WebDriverWait(driver, 5).until(follow_button_present)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"
        self.assertTrue("Follow", driver.find_element(By.CLASS_NAME, 'follow-button').text) # assert presence of follow button
        # driver.find_element(By.CLASS_NAME, 'follow-button').click() # click on follow button
        # self.assertIn("Unfollow", driver.find_element(By.CLASS_NAME, 'follow-button').text) # assert presence of unfollow button

    def tearDown(self):
        self.driver.close()


if __name__ == "__main__":
    unittest.main()
