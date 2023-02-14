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

    # def test_navigate_to_home(self):
    #     driver = self.driver
    #     driver.maximize_window()
    #     driver.get("https://rad-naiad-d04419.netlify.app/posts")
    #     self.assertIn("Please Sign In to create your own memories and like other's memories.", driver.page_source)
    #     # locate main menu item to hover and sub menu item to click
    #     signin_button = driver.find_element(By.XPATH, '//*[@id="root"]/div/header/div/a/span[1]')
    #     signin_button.click()
    #     email = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[1]/div/div/input')
    #     password = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[2]/div/div/input')
    #     email.send_keys("rabiatest@test.com")
    #     password.send_keys("rabia123")
    #     driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/button[1]').click()

    # def test_signin(self):
    #     driver = self.driver
    #     driver.maximize_window()
    #     driver.get("https://rad-naiad-d04419.netlify.app/auth")
    #     # locate main menu item to hover and sub menu item to click
    #     email = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[1]/div/div/input')
    #     password = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[2]/div/div/input')
    #     email.send_keys("rabiatest@test.com")
    #     password.send_keys("rabia123")
    #     driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/button[1]').click() # Sign In button
    #     try:
    #         element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/div/div[2]/div[1]/form/h6'))
    #         WebDriverWait(driver, 5).until(element_present)
    #         self.assertIn("Logout", driver.page_source)
    #     except TimeoutException:
    #         print 
    #         "Timed out waiting for page to load"
 

    def test_create_post(self):
        driver = self.driver
        driver.maximize_window()
        driver.get("https://rad-naiad-d04419.netlify.app/auth")
        # locate main menu item to hover and sub menu item to click
        email = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[1]/div/div/input')
        password = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[2]/div/div/input')
        email.send_keys("rabiatest@test.com")
        password.send_keys("rabia123")
        driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/button[1]').click()
        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/div/div[2]/div[1]/form/div[1]/div')) # Title
            WebDriverWait(driver, 5).until(element_present)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"
        title = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[2]/div[1]/form/div[1]/div/input')
        message = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[2]/div[1]/form/div[2]/div/textarea')
        tags = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[2]/div[1]/form/div[3]/div/div/div/input')
        # file = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[2]/div[1]/form/div[4]/input')
        title.send_keys("Selenium Test Title")
        message.send_keys("Selenium Test Message")
        tags.send_keys("Selenium Test Tag", Keys.ENTER)
        try:
            driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div[2]/div[1]/form/button[1]').click() # Create Post button
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/div/div[1]/h2[1]')) # post title
            WebDriverWait(driver, 5).until(element_present)
            self.assertIn("Selenium Test Title", driver.page_source) # was Logout
        except TimeoutException:
            print 
            "Timed out waiting for page to load"


    # def test_navigate_to_home(self):
    #     driver = self.driver
    #     driver.maximize_window()
    #     driver.get("https://rad-naiad-d04419.netlify.app/posts")
    #     # locate main menu item to hover and sub menu item to click
    #     signin_button = driver.find_element(By.XPATH, '//*[@id="root"]/div/header/div/a/span[1]')
    #     signin_button.click()
    #     email = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[1]/div/div/input')
    #     password = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[2]/div/div/input')
    #     email.send_keys("rabiatest@test.com")
    #     password.send_keys("rabia123")
    #     signin_button = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/button[1]')
    #     signin_button.click()
    #     self.assertIn("Logout", driver.page_source)

    # def test_navigate_to_allorders(self):
    #     driver = self.driver
    #     driver.maximize_window()
    #     driver.get("https://hellomeal.com/menu/")
    #     # locate main menu item to hover and sub menu item to click
    #     main_menu_elem = driver.find_element(By.ID, "menu-item-472")
    #     sub_menu_elem = driver.find_element(By.ID, "menu-item-6066")
    #     # chain actions and perform
    #     actions = ActionChains(driver)
    #     actions.move_to_element(main_menu_elem)
    #     actions.click(sub_menu_elem)
    #     actions.perform()
    #     self.assertIn("Login", driver.page_source)

    def tearDown(self):
        self.driver.close()


if __name__ == "__main__":
    unittest.main()
