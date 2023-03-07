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

    # UC3
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

    # UC4
    # def test_edit_profile(self):

    # UC5
    def test_search_users(self):
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
        
        #waiting for the search by user checkbox shows up
        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/div/div[2]/header/div[2]/label/span[1]/span[1]/input'))
            WebDriverWait(driver, 10).until(element_present)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"
        
        #search for user by name
        driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[2]/header/div[2]/label/span[1]/span[1]/input').click() #hit search by users
        username  = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[2]/header/div[1]/div/input') 
        username.send_keys("Frontend Tests2")
        driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[2]/header/button').click() #hit search

        try:
            # asserting that username is present
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