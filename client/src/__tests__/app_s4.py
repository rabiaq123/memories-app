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

    # incorrect email and password
    # incorrect email and correct password
    # correct email and incorrect password
    # correct email and correct password before invalid attempts
    # correct email and correct password after invalid attempts

    def setUp(self):
        self.driver = webdriver.Chrome()

    # def test_signin_invalid_email(self):
    #     driver = self.driver
    #     driver.maximize_window()
    #     driver.get("http://localhost:3000/auth")
    #     try:
    #         element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/main/div/h1')) # Sign in form title
    #         WebDriverWait(driver, 5).until(element_present)
    #     except TimeoutException:
    #         print 
    #         "Timed out waiting for page to load"
    #     email = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[1]/div/div/input')
    #     password = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[2]/div/div/input')
    #     email.send_keys("rabiatest@test.com")
    #     password.send_keys("rabia123")
    #     driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/button[1]').click()
    #     try:
    #         element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/header/div/div/button')) # Logout button
    #         WebDriverWait(driver, 5).until(element_present)
    #         self.assertIn("Logout", driver.page_source)
    #     except TimeoutException:
    #         print 
    #         "Timed out waiting for page to load"


    def tearDown(self):
        self.driver.close()


if __name__ == "__main__":
    unittest.main()
