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
    # IDs were retrieved from inspect tool on site

    def setUp(self):
        self.driver = webdriver.Chrome()

    def test_prevent_posting_without_signin(self):
        driver = self.driver
        driver.maximize_window()
        driver.get("https://rad-naiad-d04419.netlify.app/posts")
        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/div/div[2]/div[1]/h6')) # Sign in card
            WebDriverWait(driver, 5).until(element_present)
            self.assertIn("Please Sign In to create your own memories and like other's memories.", driver.page_source)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"

    def test_signin(self):
        driver = self.driver
        driver.maximize_window()
        driver.get("https://rad-naiad-d04419.netlify.app/posts")
        # locate Sign In button
        signin_button = driver.find_element(By.XPATH, '//*[@id="root"]/div/header/div/a/span[1]')
        signin_button.click()
        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/main/div/h1')) # Sign in form title
            WebDriverWait(driver, 5).until(element_present)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"
        email = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[1]/div/div/input')
        password = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[2]/div/div/input')
        email.send_keys("rabiatest@test.com")
        password.send_keys("rabia123")
        driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/button[1]').click()
        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/header/div/div/button')) # Logout button
            WebDriverWait(driver, 5).until(element_present)
            self.assertIn("Logout", driver.page_source)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"

    def test_create_post(self):
        driver = self.driver
        driver.maximize_window()
        driver.get("https://rad-naiad-d04419.netlify.app/auth")
        # locate and enter email and password and submit
        email = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[1]/div/div/input')
        password = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[2]/div/div/input')
        email.send_keys("rabiatest@test.com")
        password.send_keys("rabia123")
        driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/button[1]').click()
        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/div/div[2]/div[1]/form/h6')) # Create a Memory form heading
            WebDriverWait(driver, 5).until(element_present)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"
        # locate and enter title, message, tags, and file
        title = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[2]/div[1]/form/div[1]/div/input')
        message = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[2]/div[1]/form/div[2]/div/textarea')
        tags = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[2]/div[1]/form/div[3]/div/div/div/input')
        # file = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[2]/div[1]/form/div[4]/input')
        title.send_keys("Selenium Test Title")
        message.send_keys("Selenium Test Message")
        tags.send_keys("Selenium Test Tag", Keys.ENTER)
        driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[2]/div[1]/form/button[1]').click() # Create Post button
        # check if post is created (should be redirected to /posts/[id])
        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/div/div[1]/h2[1]')) # post title
            WebDriverWait(driver, 5).until(element_present)
            self.assertIn("Selenium Test Title", driver.page_source)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"
    

    def tearDown(self):
        self.driver.close()


if __name__ == "__main__":
    unittest.main()
