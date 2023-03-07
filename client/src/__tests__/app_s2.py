import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class PythonOrgSearch(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()

    # US3
    def test_profile_page(self):
        driver = self.driver
        driver.maximize_window()
        driver.get("http://localhost:3000/posts")

        signin_button = driver.find_element(By.XPATH, '//*[@id="root"]/div/header/div/a/span[1]')
        signin_button.click()
            
        email = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[1]/div/div/input')
        password = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[2]/div/div/input')
        email.send_keys("fe-tests@test.com")
        password.send_keys("fe-tests")
        driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/button[1]').click() # hit submit
        try:
            avatar_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/header/div/div/a/div')) # avatar
            WebDriverWait(driver, 5).until(avatar_present)
            driver.find_element(By.XPATH, '//*[@id="root"]/div/header/div/div/a/div').click() # click on avatar
            # asserting that username is present
            username_present = EC.text_to_be_present_in_element((By.XPATH, '//*[@id="root"]/div/div/h2'), "Frontend Tests2")
            WebDriverWait(driver, 10).until(username_present)
            self.assertIn("Frontend Tests2", driver.page_source)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"

    # US4 : test case 1 : Signed in user accesses their edit profile screen
    def test_edit_profile_TC1(self):
        driver = self.driver
        driver.maximize_window()
        driver.get("http://localhost:3000/posts")

        signin_button = driver.find_element(By.XPATH, '//*[@id="root"]/div/header/div/a/span[1]')
        signin_button.click()
            
        email = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[1]/div/div/input')
        password = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[2]/div/div/input')
        email.send_keys("fe-tests@test.com")
        password.send_keys("fe-tests")
        driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/button[1]').click() # hit submit

        try:
            avatar_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/header/div/div/a/div')) # avatar
            WebDriverWait(driver, 5).until(avatar_present)
            driver.find_element(By.XPATH, '//*[@id="root"]/div/header/div/div/a/div').click() # click on avatar
        except TimeoutException:
            print 
            "Timed out waiting for page to load"

        driver.find_element(By.XPATH, '//*[@id="root"]/div/div/a/span[1]').click()# click on edit button
        
        self.assertIn("Edit Profile", driver.page_source)# asserting that the edit profile page is present

    # US4 : test case 2 : Signed in user cannot edit another users profile
    def test_edit_profile_TC2(self):
        driver = self.driver
        driver.maximize_window()
        driver.get("http://localhost:3000/posts")

        #wait for post to load
        try:
            post_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/div/div[1]/div/div[1]/div/span'))
            WebDriverWait(driver, 60).until(post_present)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"

        driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[1]/div/div[1]/div/span').click()#click on post

        #waits for creator to load
        try:
            creator_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/div/div[1]/h6/a'))
            WebDriverWait(driver, 20).until(creator_present) #wait for post to load
        except TimeoutException:
            print 
            "Timed out waiting for page to load"

        driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[1]/h6/a').click()#click on creator
        self.assertNotIn("Edit Profile", driver.page_source)# asserting that the edit profile button isn't present

    #US4 : test case 3 : User successfully updates their profile name and email
    def test_edit_profile_TC3(self):
        driver = self.driver
        driver.maximize_window()
        driver.get("http://localhost:3000/posts")

        signin_button = driver.find_element(By.XPATH, '//*[@id="root"]/div/header/div/a/span[1]')
        signin_button.click()
            
        email = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[1]/div/div/input')
        password = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[2]/div/div/input')
        email.send_keys("teehee@teehee.com")
        password.send_keys("teehee")
        driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/button[1]').click() # hit submit

        try:
            avatar_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/header/div/div/a/div')) # avatar
            WebDriverWait(driver, 5).until(avatar_present)
            driver.find_element(By.XPATH, '//*[@id="root"]/div/header/div/div/a/div').click() # click on avatar
        except TimeoutException:
            print 
            "Timed out waiting for page to load"

        #NEWLY ADDED STUFF
        try:
            avatar_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/a/span[1]')) # avatar
            WebDriverWait(driver, 5).until(avatar_present)
            driver.find_element(By.XPATH, '//*[@id="root"]/div/div/a/span[1]').click() # click on avatar
        except TimeoutException:
            print 
            "Timed out waiting for page to load"

        # driver.find_element(By.XPATH, '//*[@id="root"]/div/div/a/span[1]').click()# click on edit button
        
        #fills out the form with new name and email information
        name = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div/div[1]/div/div/input')
        email = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div/div[2]/div/div/input')
        name.send_keys("teehee1")
        email.send_keys("teehee@teehee.com")

        driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div/div[2]/div/div/input').click()#clicks on the update button

        try:
            # asserting that updated username is present
            username_present = EC.text_to_be_present_in_element((By.XPATH, '//*[@id="root"]/div/div/h2'), "teehee1")
            WebDriverWait(driver, 10).until(username_present)
            self.assertIn("teehee1", driver.page_source)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"


    # US5
    def test_search_users(self):
        driver = self.driver
        driver.maximize_window()
        driver.get("http://localhost:3000/posts")

        signin_button = driver.find_element(By.XPATH, '//*[@id="root"]/div/header/div/a/span[1]')
        signin_button.click()
        
        # on signin page
        email = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[1]/div/div/input')
        password = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[2]/div/div/input')
        email.send_keys("fe-tests@test.com")
        password.send_keys("fe-tests")
        driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/button[1]').click() # hit submit
        
        # on homepage, waiting for the "search by user" checkbox to show up
        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/div/div[2]/header/div[2]/label/span[1]/span[1]/input'))
            WebDriverWait(driver, 20).until(element_present)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"
        
        # search for user by name
        driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[2]/header/div[2]/label/span[1]/span[1]/input').click() #hit search by users
        username  = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[2]/header/div[1]/div/input') 
        username.send_keys("Frontend Tests2")
        driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[2]/header/button').click() #hit search

        try:
            # asserting that username is present on the homepage/feed
            username_present = EC.text_to_be_present_in_element((By.XPATH, '//*[@id="root"]/div/div/div/div[1]/div/div[1]/div/span/div[2]/h6'), "Frontend Tests2")
            WebDriverWait(driver, 10).until(username_present)
            self.assertIn("Frontend Tests2", driver.page_source)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"

    def tearDown(self):
        self.driver.close()


if __name__ == "__main__":
    unittest.main()